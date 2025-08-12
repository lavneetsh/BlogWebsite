import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

// Add `rules` to the props
export default function RTE({ name, control, label, defaultValue = "", rules = {} }) {
  const apiKey = String(import.meta.env.VITE_TINYMCE_API_KEY);

  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        // Pass the validation rules to the Controller
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={apiKey}
            initialValue={defaultValue}
            init={{ /* ... your init settings ... */ }}
            onEditorChange={onChange}
            // The `value` prop helps keep the editor in sync
            value={value}
          />
        )}
      />
    </div>
  )
}