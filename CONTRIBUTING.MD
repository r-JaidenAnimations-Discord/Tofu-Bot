# Contributing
Make sure when pushing or pull requesting changes, to push them to the [development](https://github.com/MaxTechnics/Tofu-Bot/tree/development) branch. Pushing to master will likely break version bumps and will be overwritten. The master branch is only intended for releases.

### Formatting requirements
- Make use of the provided `.eslintrc.json`
- Final newline at end of files is required
- Spacing should be tabbed with tab size of 4
The following vscode settings.json items can help you:
```json
{
    "editor.formatOnSave": true,
    //"editor.formatOnType": true, // Optional
    "[json]": {
        "editor.quickSuggestions": {
            "strings": true
        },
        "editor.suggest.insertMode": "replace",
        "editor.formatOnSave": false
    },
    "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
    "typescript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
    "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
    "files.insertFinalNewline": true,
}
```
