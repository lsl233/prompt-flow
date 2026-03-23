"use client";

import type { TextareaHTMLAttributes } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import type { CommunityPrompt, PromptVariable } from "@/types/prompt";

function replaceVariables(content: string, values: Record<string, string>) {
  return content.replace(/\{\{(.*?)\}\}/g, (match, rawName) => {
    const name = String(rawName).trim();
    const value = values[name];

    return value && value.trim().length > 0 ? value : match;
  });
}

function buildInitialValues(variables: PromptVariable[]) {
  return Object.fromEntries(
    variables.map((variable) => [variable.name, variable.example ?? ""])
  );
}

function renderPromptPreview(content: string, values: Record<string, string>) {
  const parts = content.split(/(\{\{.*?\}\})/g);

  return parts.map((part, index) => {
    const matched = part.match(/^\{\{(.*?)\}\}$/);
    if (!matched) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    const variableName = matched[1].trim();
    const value = values[variableName]?.trim();

    if (!value) {
      return (
        <span
          key={`${part}-${index}`}
          className="rounded-md border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-secondary)] px-1.5 py-0.5 text-[var(--color-accent-primary)]"
        >
          {part}
        </span>
      );
    }

    return (
      <span
        key={`${part}-${index}`}
        className="rounded-md bg-[var(--color-accent-primary)]/12 px-1.5 py-0.5 text-[var(--color-text-primary)] shadow-[inset_0_0_0_1px_rgba(0,212,170,0.18)]"
      >
        {value}
      </span>
    );
  });
}

export function PromptWorkbench({
  prompt,
  labels,
}: {
  prompt: CommunityPrompt;
  labels: {
    promptTitle: string;
    variablesTitle: string;
    copyTemplate: string;
    copyFilled: string;
    copied: string;
    reset: string;
    variableHint: string;
    required: string;
  };
}) {
  const [values, setValues] = useState<Record<string, string>>(
    buildInitialValues(prompt.variables)
  );

  const hasVariables = prompt.variables.length > 0;
  const filledPrompt = replaceVariables(prompt.content, values);

  function handleReset() {
    setValues(buildInitialValues(prompt.variables));
  }

  return (
    <div
      className={`grid gap-6 ${
        hasVariables ? "xl:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]" : ""
      }`}
    >
      <div className="overflow-hidden rounded-[2rem] border border-[var(--color-border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] shadow-[0_28px_90px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-4 border-b border-[var(--color-border-subtle)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent-primary)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{labels.promptTitle}</span>
            </div>
            <p className="mt-3 text-sm text-[var(--color-text-tertiary)]">{prompt.language}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CopyButton
              value={prompt.content}
              label={labels.copyTemplate}
              successLabel={labels.copied}
              className="border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)]/40"
            />
            <CopyButton
              value={filledPrompt}
              label={labels.copyFilled}
              successLabel={labels.copied}
              className="border-[var(--color-accent-primary)]/20 bg-[var(--color-accent-primary)]/10 text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)]/50"
            />
          </div>
        </div>

        <div className="relative px-4 py-4 sm:px-6 sm:py-6">
          <div className="pointer-events-none absolute inset-y-6 left-4 w-px bg-gradient-to-b from-transparent via-[var(--color-accent-primary)]/45 to-transparent sm:left-6" />
          <pre className="max-h-[46rem] overflow-auto whitespace-pre-wrap rounded-[1.5rem] bg-[var(--color-bg-primary)] px-5 py-6 text-[15px] leading-8 text-[var(--color-text-primary)] sm:px-7">
            {renderPromptPreview(prompt.content, values)}
          </pre>
        </div>
      </div>

      {hasVariables ? (
        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-5 flex items-end justify-between gap-3 border-b border-[var(--color-border-subtle)] pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                  {labels.variablesTitle}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                  {labels.variableHint}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{labels.reset}</span>
              </button>
            </div>

            <div className="grid gap-4">
              {prompt.variables.map((variable) => (
                <label
                  key={variable.name}
                  className="block rounded-[1.5rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm text-[var(--color-accent-primary)]">{`{{${variable.name}}}`}</span>
                    {variable.required ? (
                      <span className="rounded-full bg-[var(--color-accent-primary)]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-primary)]">
                        {labels.required}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                    {variable.description}
                  </p>
                  <AutoResizeTextarea
                    value={values[variable.name] ?? ""}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [variable.name]: event.target.value,
                      }))
                    }
                    placeholder={variable.example ?? variable.name}
                    className="mt-4 w-full resize-none overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] px-4 py-3 text-sm leading-7 text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent-primary)]/40"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AutoResizeTextarea({
  className,
  value,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    node.style.height = "0px";
    node.style.height = `${node.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      className={className}
      {...props}
    />
  );
}
