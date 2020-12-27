module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.tsx?$/,
        use: [{
                loader: require.resolve('babel-loader', { paths: ['node_modules/react-scripts'] }),
                options: {
                    presets: [require.resolve("babel-preset-react-app")]
                }
            },
            {
                loader: require.resolve("react-docgen-typescript-loader"),
                options: {
                    shouldExtractLiteralValuesFromEnum: true,
                    propFilter: (prop) => {
                        if (prop.parent) {
                            return !prop.parent.fileName.includes('node_modules')
                        }
                        return true
                    }
                }
            }
        ]
    });

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
};