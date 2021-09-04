import React from 'react';
import styled from '@emotion/styled';

export type PlacementItems = 'start' | 'end' | 'center' | 'stretch';

export type PlacementContent =
    | PlacementItems
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

export type Children = React.ReactNode | React.ReactNode;

export interface GridProps {
    units?: string;
    itemSize?: string | number;
    items?: number;
    gap?: string | number;
    gaps?: (string | number)[];
    inline?: boolean;
    template?: string;
    fullWidth?: boolean;
    fullHeight?: boolean;

    justifyItems?: PlacementItems;
    alignItems?: PlacementItems;
    centerItems?: boolean;
    justifyContent?: PlacementContent;
    alignContent?: PlacementContent;

    breakAt?: string | number;
    minCols?: number;
    maxCols?: number;

    debug?: boolean;
    as?: string;
}

export interface GridLayoutProps extends GridProps {
    columns?: number;
    rows?: number;
    columnSize?: number;
    rowSize?: number;
}

export type Template = {
    items: number;
    size: number | string;
    units: string;
};

export type Unit = {
    value: number | string;
    units: string;
};

export interface GridItemProps {
    column?: string;
    row?: string;
    justifySelf?: PlacementItems;
    alignSelf?: PlacementItems;
    centerSelf?: boolean;
    centerContent?: boolean;
}

const getValueWithUnits = ({ value = 0, units = 'px' }: Unit) =>
    typeof value === 'number' ? `${value}${units}` : value;

const templateUtil = ({ items, size, units }: Template) => {
    return `repeat(${items}, ${getValueWithUnits({
        value: size,
        units,
    })})`;
};

const getChildCount = (children: Children) =>
    Array.isArray(children) ? children.length : 1;

const getCommonProps = ({ units = 'px', gap, ...props }: GridProps) => ({
    display: props.inline ? 'inline-grid' : 'grid',
    ...(props.fullWidth && { minWidth: '100%' }),
    ...(props.fullHeight && { minHeight: '100%' }),
    ...(props.debug && {
        outline: '1px solid red',
        '& > *': { outline: '1px dotted green' },
    }),
    ...(gap && {
        gridGap: getValueWithUnits({ value: gap, units }),
    }),
    ...(props.justifyItems && { justifyItems: props.justifyItems }),
    ...(props.alignItems && { alignItems: props.alignItems }),
    ...(props.centerItems && {
        justifyItems: 'center',
        alignItems: 'center',
    }),
    ...(props.justifyContent && { justifyContent: props.justifyContent }),
    ...(props.alignContent && { alignContent: props.alignContent }),
});

const getVerticalProps = ({
    itemSize = '1fr',
    units = 'px',
    children,
    ...props
}: GridProps & { children: Children }) => {
    const items = props.items || getChildCount(children);

    return {
        ...getCommonProps(props),
        ...(items && {
            gridTemplateRows: templateUtil({ items, size: itemSize, units }),
        }),
        ...(props.template && { gridTemplateRows: props.template }),
        gridAutoFlow: 'row',
    };
};

const getHorizontalProps = ({
    itemSize = '1fr',
    minCols = 2,
    maxCols = 4,
    children,
    ...props
}: GridProps & { children: Children }) => {
    const items = props.items || getChildCount(children);
    const gap = getValueWithUnits({
        value: props.gap,
        units: props.units,
    });

    return {
        ...getCommonProps(props),
        ...(items &&
            !props.breakAt && {
                gridTemplateColumns: templateUtil({
                    items,
                    size: itemSize,
                    units: props.units,
                }),
            }),
        ...(props.template && { gridTemplateColumns: props.template }),
        gridAutoFlow: 'column',
        ...(props.breakAt && {
            gridAutoFlow: 'dense',
            gridTemplateColumns: `repeat(
                    auto-fill,
                    minmax(
                        clamp(
                            100% / ${maxCols} - ${gap},
                            (${getValueWithUnits({
                                value: props.breakAt,
                                units: props.units,
                            })} - 100%) * 999,
                            100% / ${minCols} - ${gap}
                        ),
                        1fr
                    )
                )`,
        }),
    };
};

const getLayoutProps = ({
    itemSize = '1fr',
    units = 'px',
    ...props
}: GridLayoutProps) => {
    const columnSize = props.columnSize || itemSize;
    const rowSize = props.rowSize || itemSize;

    return {
        ...getCommonProps(props),
        ...(props.columns && {
            gridTemplateColumns: templateUtil({
                items: props.columns,
                size: columnSize,
                units,
            }),
        }),
        ...(props.rows && {
            gridTemplateRows: templateUtil({
                items: props.rows,
                size: rowSize,
                units,
            }),
        }),
        ...(props.template && { gridTemplate: props.template }),
    };
};

const getItemProps = ({ ...props }: GridItemProps) => ({
    ...(props.column && { gridColumn: props.column }),
    ...(props.row && { gridRow: props.row }),
    ...(props.justifySelf && { justifySelf: props.justifySelf }),
    ...(props.alignSelf && { alignSelf: props.alignSelf }),
    ...(props.centerSelf && { placeSelf: 'center' }),
    ...(props.centerContent && {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
});

const Grid = () => styled.div<GridLayoutProps>(getLayoutProps);

Grid.Horizontal = styled.div<GridProps & { children: Children }>(
    getHorizontalProps
);
Grid.Vertical = styled.div<GridProps & { children: Children }>(
    getVerticalProps
);
Grid.Item = styled.div<GridItemProps>(getItemProps);

export { Grid };
