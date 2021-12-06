module.exports = {
  transformer: {
    getTransformOptions: async () => ({
       transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
       },
     }),
   },
    /** include this below (remove this comment too)*/
 resolver: {                              
   sourceExts: ['jsx', 'js', 'ts', 'tsx'],
 },
};