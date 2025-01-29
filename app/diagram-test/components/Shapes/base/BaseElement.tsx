// src/components/Shapes/base/BaseElement.tsx
import { shapes } from "@joint/core";

export const BaseElement = shapes.standard.Image.define('custom.BaseElement', {
    attrs: {
        image: {
            'xlink:href': '',
            width: 100,
            height: 100,
        }
    }
});
