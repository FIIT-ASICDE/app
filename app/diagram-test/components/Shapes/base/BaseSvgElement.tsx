// src/components/Shapes/base/BaseElement.tsx
import { shapes } from "@joint/core";

export const BaseSvgElement = shapes.standard.Path.define('custom.MyCustomAnd',{
    attrs: {
        body: {

            refD: 'M 32 40 L 0 40 L 0 0 L 32 0 C 42 13 42 26 32 40',
        }
        }
});
