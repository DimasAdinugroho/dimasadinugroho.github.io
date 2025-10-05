---
title: Complete Markdown Syntax Guide
date: 2024-01-15
excerpt: A comprehensive example showcasing all markdown syntax features including headings, tables, code blocks, formulas, and more.
---

# Complete Markdown Syntax Guide

This post demonstrates all the major markdown syntax features you can use in your blog posts.

## Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

## Text Formatting

**Bold text** and __also bold__

*Italic text* and _also italic_

***Bold and italic*** and ___also bold and italic___

~~Strikethrough text~~

## Lists

### Unordered Lists
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Deep nested item
- Item 3

### Ordered Lists
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item

### Task Lists
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

## Links and Images

[Link to Google](https://google.com)

[Link with title](https://github.com "GitHub Homepage")

![Alt text for image](https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Sample+Image)

## Code

### Inline Code
Use `console.log()` to print output in JavaScript.

### Code Blocks

```javascript
// JavaScript example
function greetUser(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to my blog, ${name}`;
}

const user = "Developer";
greetUser(user);
```

```python
# Python example
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Generate first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {calculate_fibonacci(i)}")
```

```bash
# Bash commands
npm install react-markdown
git add .
git commit -m "Add markdown blog support"
git push origin main
```

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✅ | H1-H6 supported |
| Tables | ✅ | With alignment |
| Code blocks | ✅ | Syntax highlighting |
| Math formulas | ⚠️ | Depends on renderer |
| Images | ✅ | Local and remote |

### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |
| More content | More content | More content |

## Blockquotes

> This is a simple blockquote.

> This is a blockquote with multiple paragraphs.
>
> This is the second paragraph in the blockquote.

> ### Blockquote with heading
> 
> This blockquote contains a heading and other elements.
> 
> - List item in blockquote
> - Another item

## Horizontal Rules

---

***

___

## Math Formulas (if supported)

Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
f(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

## HTML Elements

You can also use HTML directly:

<details>
<summary>Click to expand</summary>

This content is hidden by default and can be expanded by clicking the summary.

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy

<mark>Highlighted text</mark>

## Escape Characters

Use backslash to escape special characters:

\*Not italic\*

\`Not code\`

\# Not a heading

## Line Breaks

This is the first line.  
This is the second line (two spaces at end of previous line).

This is a new paragraph.

## Footnotes

Here's a sentence with a footnote[^1].

Another footnote reference[^note].

[^1]: This is the first footnote.
[^note]: This is another footnote with a custom identifier.

---

This covers most of the standard markdown syntax. Your blog now supports rich content formatting!
