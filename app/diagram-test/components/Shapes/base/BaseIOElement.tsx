// src/components/Shapes/base/BaseIOElement.tsx
import { PortedElement } from './PortedElement';

export const BaseIOElement = PortedElement.define('custom.BaseIOElement', {
    // Для IO-элементов логика будет простая: либо 1 вход (для OutputElement) либо 1 выход (для InputElement)
});
