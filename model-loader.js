(function () {
  window.loadGlbModel = function (loader, modelPath, onLoad, onProgress, onError) {
    const embeddedModel = window.EMBEDDED_3D_MODELS?.[modelPath];
    const firstSource = window.location.protocol === 'file:' && embeddedModel
      ? embeddedModel
      : modelPath;

    const handleFailure = (error) => {
      if (firstSource !== embeddedModel && embeddedModel) {
        loader.load(embeddedModel, onLoad, onProgress, reportFailure);
        return;
      }
      reportFailure(error);
    };

    const reportFailure = (error) => {
      console.error(`Unable to load 3D model: ${modelPath}`, error);
      const container = document.getElementById('model-container');
      if (container) {
        const message = document.createElement('p');
        message.className = 'threeD-text';
        message.textContent = 'Model 3D tidak dapat dimuatkan.';
        container.appendChild(message);
      }
      if (onError) onError(error);
    };

    loader.load(firstSource, onLoad, onProgress, handleFailure);
  };
})();
