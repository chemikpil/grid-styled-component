# 🏗 Grid Styled Component

Abstraction for CSS Grid Module with more friendly API. Grid Styled Component use emotion.js under the hood

### 👨‍💻 Exemples

#### Horizontal

```HTML
<Grid.Horizontal itemSize={50} justifyContent="space-between" debug>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
</Grid.Horizontal>
```

[Demo](https://kh26n.csb.app/horizontal)

#### Vertical

```HTML
<Grid.Vertical debug gap={20}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
</Grid.Vertical>
```

[Demo](https://kh26n.csb.app/vertical)

#### Complex layout 2x2

```HTML
<Grid.Layout columns={3} rows={2} debug gap={20}>
    <Grid.Item>Item 1</Grid.Item>
    <Grid.Item>Item 2</Grid.Item>
    <Grid.Item>Item 3</Grid.Item>
    <Grid.Item>Item 4</Grid.Item>
    <Grid.Item>Item 5</Grid.Item>
    <Grid.Item>Item 6</Grid.Item>
</Grid.Layout>
```

[Demo](https://kh26n.csb.app/complex)

#### Responsive break

```HTML
<Grid.Horizontal
    gap={30}
    breakAt={800}
    minCols={2}
    maxCols={4}
    debug
>
    <Grid.Item centerContent>Item 1</Grid.Item>
    <Grid.Item>Item 2</Grid.Item>
    <Grid.Item>Item 3</Grid.Item>
    <Grid.Item>Item 4</Grid.Item>
</Grid.Horizontal>
```

[Demo](https://kh26n.csb.app/responsive)

#### Multigap (API will change)

```HTML
<Grid.Vertical
    debug
    template="
        [top-start] auto [top-end]
        50px
        [center-start] auto [center-end]
        120px
        [bottom-start] auto [bottom-end]
    "
>
    <Grid.Item row="top-start / top-end">top</Grid.Item>
    <Grid.Item row="center-start / center-end">center</Grid.Item>
    <Grid.Item row="bottom-start / bottom-end">bottom</Grid.Item>
</Grid.Vertical>
```

[Demo](https://kh26n.csb.app/multigap)

### 🛠 API

tdb...

### ✅ TO DO

-   Add missing api to Grid and Child component (e.g. grid area)
-   Add `min`, `max` and `clamp` to Grid component
-   Try to implement multi-gap with better and simpler API

---

Made with ❤️ by [@chemikpil](https://twitter.com/chemikpil)
