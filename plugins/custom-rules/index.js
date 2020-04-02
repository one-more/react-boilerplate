module.exports.rules = {
    'enforce-data-attributes': context => {
        return {
            JSXElement(node) {
                const elementName = node.openingElement.name.name;
                if (!elementName || elementName[0] === elementName[0].toUpperCase()) {
                    // This is a Component, not  a DOM node, so exit.
                    return;
                }
                const hasDataAttributes = (node.openingElement.attributes || []).some(
                    attr => attr.name.name && attr.name.name.includes('data-'),
                );
                if (!hasDataAttributes) {
                    context.report({
                        node,
                        message: `${elementName} should have data attribute`,
                    });
                }
            },
        };
    },
};
