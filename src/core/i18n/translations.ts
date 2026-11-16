export const supportedLocales = ['en', 'fr', 'es'] as const

export type Locale = (typeof supportedLocales)[number]

export type Messages = {
  app: {
    brandName: string
    brandTagline: string
    brandAlt: string
    primaryNavAria: string
    navHome: string
    navA6ToA4: string
    footerNote: string
  }
  language: {
    label: string
    names: Record<Locale, string>
  }
  home: {
    eyebrow: string
    title: string
    intro: string
    openFirstTool: string
    viewRoadmap: string
    cards: {
      webOnlyTitle: string
      webOnlyText: string
      mobileTitle: string
      mobileText: string
      expandTitle: string
      expandText: string
    }
    firstTool: {
      eyebrow: string
      name: string
      description: string
      launch: string
    }
    soonCard: {
      eyebrow: string
      title: string
      text: string
    }
  }
  toolA6ToA4: {
    eyebrow: string
    title: string
    intro: string
    summaryAria: string
    summary: {
      outputLabel: string
      outputPortrait: string
      outputLandscape: string
      copiesLabel: string
      copiesSingle: string
      copiesPlural: string
      marginLabel: string
      compressionLabel: string
    }
    sourceImage: {
      legend: string
      choose: string
      noneSelected: string
      note: string
    }
    layout: {
      legend: string
      countLabel: string
      countHint: string
      orientationLabel: string
      orientationHint: string
      portrait: string
      landscape: string
      marginLabel: string
      marginHint: string
      compressionLabel: string
    }
    compressionOptions: {
      high: { label: string; description: string }
      balanced: { label: string; description: string }
      small: { label: string; description: string }
    }
    actions: {
      generate: string
      generating: string
      reset: string
    }
    status: {
      preparing: string
    }
    preview: {
      title: string
      text: string
      empty: string
      pageSizeLabel: string
      slotSizeLabel: string
      gridLabel: string
    }
    output: {
      title: string
      placementLabel: string
      placementGrid: string
      backgroundLabel: string
      backgroundValue: string
      fitLabel: string
      fitValue: string
      handlingLabel: string
      handlingValue: string
      note: string
    }
    errors: {
      chooseImage: string
      invalidImageType: string
      prepareFailed: string
      pdfFailed: string
    }
  }
}

export const translations: Record<Locale, Messages> = {
  en: {
    app: {
      brandName: 'Planchette',
      brandTagline: 'Web tools for getting things done',
      brandAlt: 'Planchette logo',
      primaryNavAria: 'Primary',
      navHome: 'Home',
      navA6ToA4: 'A6 to A4 PDF',
      footerNote: 'Static, browser-only utilities for print and file tasks.',
    },
    language: {
      label: 'Language',
      names: {
        en: 'English',
        fr: 'Francais',
        es: 'Espanol',
      },
    },
    home: {
      eyebrow: 'Planchette',
      title: 'Useful web tools, built to work properly on a phone.',
      intro:
        'Start with print prep. The first tool turns one image into a clean A4 PDF with four repeated placements and mobile-friendly controls.',
      openFirstTool: 'Open the first tool',
      viewRoadmap: 'View roadmap',
      cards: {
        webOnlyTitle: 'Web only',
        webOnlyText: 'No uploads to a server. Processing stays in your browser.',
        mobileTitle: 'Mobile first',
        mobileText:
          'Big controls, readable layout, and no desktop-only workflow assumptions.',
        expandTitle: 'Built to expand',
        expandText:
          'Planchette starts with print prep and is structured for more small utilities later.',
      },
      firstTool: {
        eyebrow: 'Print utility',
        name: 'A6 to A4 PDF',
        description:
          'Duplicate one photo four times, tune margins in millimeters, and export a compressed A4 PDF directly in the browser.',
        launch: 'Launch tool',
      },
      soonCard: {
        eyebrow: 'Soon',
        title: 'More quick utilities',
        text: 'PDF rearranging, sheet optimization, simple converters, and other small browser tools can plug into the same shell.',
      },
    },
    toolA6ToA4: {
      eyebrow: 'A6 to A4 PDF',
      title: 'Build a printable A4 sheet from one image.',
      intro:
        'Upload one photo, choose how many copies fit on the sheet and the page orientation, adjust margins in millimeters, and download a browser-generated PDF.',
      summaryAria: 'Tool summary',
      summary: {
        outputLabel: 'Output',
        outputPortrait: 'A4 portrait PDF',
        outputLandscape: 'A4 landscape PDF',
        copiesLabel: 'Copies',
        copiesSingle: '1 image',
        copiesPlural: '{count} repeated images',
        marginLabel: 'Margin',
        compressionLabel: 'Compression',
      },
      sourceImage: {
        legend: 'Source image',
        choose: 'Choose a photo',
        noneSelected: 'No file selected',
        note: 'The image stays in your browser. Nothing is uploaded to a server.',
      },
      layout: {
        legend: 'Layout',
        countLabel: 'Elements per page',
        countHint: 'Any number from 1 up. The grid is guessed automatically.',
        orientationLabel: 'Page orientation',
        orientationHint: 'Every element stays in the same orientation for easy cutting.',
        portrait: 'Portrait',
        landscape: 'Landscape',
        marginLabel: 'Margin and spacing',
        marginHint:
          'The same value is used for the outer page margin and the gap between copies.',
        compressionLabel: 'Compression preset',
      },
      compressionOptions: {
        high: {
          label: 'High quality',
          description: 'Sharper output with a larger file size.',
        },
        balanced: {
          label: 'Balanced',
          description: 'Good print detail while keeping the PDF lighter.',
        },
        small: {
          label: 'Small file',
          description: 'Smaller exports for quick sharing.',
        },
      },
      actions: {
        generate: 'Generate PDF',
        generating: 'Generating PDF...',
        reset: 'Reset',
      },
      status: {
        preparing: 'Preparing the image for preview and export...',
      },
      preview: {
        title: 'Live sheet preview',
        text: 'The preview reflects the current grid, orientation, margin layout, and processed source image.',
        empty: 'Add an image to preview the A4 sheet.',
        pageSizeLabel: 'Page size',
        slotSizeLabel: 'Slot size',
        gridLabel: 'Grid',
      },
      output: {
        title: 'What this export does',
        placementLabel: 'Placement',
        placementGrid: '{cols} x {rows} grid on one page',
        backgroundLabel: 'Background',
        backgroundValue: 'White PDF page',
        fitLabel: 'Fit mode',
        fitValue: 'Keep aspect ratio',
        handlingLabel: 'Source handling',
        handlingValue: 'JPEG re-encode in browser',
        note: 'Large phone photos are resized before PDF embedding so the export remains practical to download and share.',
      },
      errors: {
        chooseImage: 'Select an image before generating the PDF.',
        invalidImageType: 'Use an image file such as JPG, PNG, or WebP.',
        prepareFailed: 'The image could not be prepared.',
        pdfFailed: 'The PDF could not be generated.',
      },
    },
  },
  fr: {
    app: {
      brandName: 'Planchette',
      brandTagline: 'Des outils web pour aller droit au but',
      brandAlt: 'Logo Planchette',
      primaryNavAria: 'Navigation principale',
      navHome: 'Accueil',
      navA6ToA4: 'PDF A6 vers A4',
      footerNote: 'Utilitaires statiques, 100% navigateur, pour impression et fichiers.',
    },
    language: {
      label: 'Langue',
      names: {
        en: 'Anglais',
        fr: 'Francais',
        es: 'Espagnol',
      },
    },
    home: {
      eyebrow: 'Planchette',
      title: 'Des outils web utiles, concus pour bien marcher sur mobile.',
      intro:
        'Commencez par la preparation d impression. Le premier outil transforme une image en PDF A4 propre avec quatre copies et des controles simples sur telephone.',
      openFirstTool: 'Ouvrir le premier outil',
      viewRoadmap: 'Voir la roadmap',
      cards: {
        webOnlyTitle: 'Web uniquement',
        webOnlyText: 'Aucun envoi vers un serveur. Le traitement reste dans votre navigateur.',
        mobileTitle: 'Mobile en premier',
        mobileText:
          'Gros controles, lisibilite soignee et aucune dependance a un usage desktop.',
        expandTitle: 'Pret a evoluer',
        expandText:
          'Planchette demarre avec l impression puis peut accueillir d autres petits utilitaires.',
      },
      firstTool: {
        eyebrow: 'Utilitaire impression',
        name: 'PDF A6 vers A4',
        description:
          'Dupliquez une photo en quatre exemplaires, ajustez les marges en millimetres, puis exportez un PDF A4 compresse directement dans le navigateur.',
        launch: 'Lancer l outil',
      },
      soonCard: {
        eyebrow: 'Bientot',
        title: 'Plus d utilitaires rapides',
        text: 'Reorganisation de PDF, optimisation de planches, convertisseurs simples et autres outils legers.',
      },
    },
    toolA6ToA4: {
      eyebrow: 'PDF A6 vers A4',
      title: 'Creez une planche A4 imprimable a partir d une image.',
      intro:
        'Importez une photo, choisissez le nombre d elements par page et l orientation, reglez la marge en millimetres, puis telechargez le PDF.',
      summaryAria: 'Resume de l outil',
      summary: {
        outputLabel: 'Sortie',
        outputPortrait: 'PDF A4 portrait',
        outputLandscape: 'PDF A4 paysage',
        copiesLabel: 'Copies',
        copiesSingle: '1 image',
        copiesPlural: '{count} images repetees',
        marginLabel: 'Marge',
        compressionLabel: 'Compression',
      },
      sourceImage: {
        legend: 'Image source',
        choose: 'Choisir une photo',
        noneSelected: 'Aucun fichier selectionne',
        note: 'L image reste dans votre navigateur. Rien n est envoye vers un serveur.',
      },
      layout: {
        legend: 'Mise en page',
        countLabel: 'Elements par page',
        countHint: 'N importe quel nombre a partir de 1. La grille est deduite automatiquement.',
        orientationLabel: 'Orientation de page',
        orientationHint: 'Chaque element garde la meme orientation pour decouper facilement.',
        portrait: 'Portrait',
        landscape: 'Paysage',
        marginLabel: 'Marge et espacement',
        marginHint:
          'La meme valeur est utilisee pour la marge externe et l espace entre copies.',
        compressionLabel: 'Preset de compression',
      },
      compressionOptions: {
        high: {
          label: 'Haute qualite',
          description: 'Rendu plus net avec un fichier plus lourd.',
        },
        balanced: {
          label: 'Equilibre',
          description: 'Bon niveau de detail avec un PDF plus leger.',
        },
        small: {
          label: 'Fichier leger',
          description: 'Export plus compact pour un partage rapide.',
        },
      },
      actions: {
        generate: 'Generer le PDF',
        generating: 'Generation du PDF...',
        reset: 'Reinitialiser',
      },
      status: {
        preparing: 'Preparation de l image pour l apercu et l export...',
      },
      preview: {
        title: 'Apercu en direct',
        text: 'L apercu suit la grille, l orientation, la marge et l image preparee.',
        empty: 'Ajoutez une image pour voir la planche A4.',
        pageSizeLabel: 'Taille page',
        slotSizeLabel: 'Taille case',
        gridLabel: 'Grille',
      },
      output: {
        title: 'Ce que fait cet export',
        placementLabel: 'Placement',
        placementGrid: 'Grille {cols} x {rows} sur une page',
        backgroundLabel: 'Fond',
        backgroundValue: 'Page PDF blanche',
        fitLabel: 'Ajustement',
        fitValue: 'Respect du ratio',
        handlingLabel: 'Traitement source',
        handlingValue: 'Re-encodage JPEG dans le navigateur',
        note: 'Les grandes photos sont redimensionnees avant insertion dans le PDF pour garder un export pratique.',
      },
      errors: {
        chooseImage: 'Selectionnez une image avant de generer le PDF.',
        invalidImageType: 'Utilisez une image JPG, PNG ou WebP.',
        prepareFailed: 'L image n a pas pu etre preparee.',
        pdfFailed: 'Le PDF n a pas pu etre genere.',
      },
    },
  },
  es: {
    app: {
      brandName: 'Planchette',
      brandTagline: 'Herramientas web para hacer las cosas rapido',
      brandAlt: 'Logo de Planchette',
      primaryNavAria: 'Navegacion principal',
      navHome: 'Inicio',
      navA6ToA4: 'PDF A6 a A4',
      footerNote: 'Utilidades estaticas en navegador para tareas de impresion y archivos.',
    },
    language: {
      label: 'Idioma',
      names: {
        en: 'Ingles',
        fr: 'Frances',
        es: 'Espanol',
      },
    },
    home: {
      eyebrow: 'Planchette',
      title: 'Herramientas web utiles, pensadas para funcionar bien en movil.',
      intro:
        'Empieza con preparacion de impresion. La primera herramienta convierte una imagen en un PDF A4 limpio con cuatro copias y controles simples para telefono.',
      openFirstTool: 'Abrir la primera herramienta',
      viewRoadmap: 'Ver hoja de ruta',
      cards: {
        webOnlyTitle: 'Solo web',
        webOnlyText: 'Sin subidas a servidor. El proceso ocurre en tu navegador.',
        mobileTitle: 'Primero movil',
        mobileText: 'Controles grandes, lectura clara y sin flujo dependiente de escritorio.',
        expandTitle: 'Listo para crecer',
        expandText:
          'Planchette empieza con impresion y esta estructurado para sumar mas utilidades.',
      },
      firstTool: {
        eyebrow: 'Utilidad de impresion',
        name: 'PDF A6 a A4',
        description:
          'Duplica una foto cuatro veces, ajusta margenes en milimetros y exporta un PDF A4 comprimido directamente en el navegador.',
        launch: 'Abrir herramienta',
      },
      soonCard: {
        eyebrow: 'Pronto',
        title: 'Mas utilidades rapidas',
        text: 'Reordenar PDF, optimizacion de planchas, convertidores simples y mas herramientas ligeras.',
      },
    },
    toolA6ToA4: {
      eyebrow: 'PDF A6 a A4',
      title: 'Crea una hoja A4 imprimible desde una imagen.',
      intro:
        'Sube una foto, elige cuantos elementos van por pagina y la orientacion, ajusta el margen en milimetros y descarga el PDF.',
      summaryAria: 'Resumen de la herramienta',
      summary: {
        outputLabel: 'Salida',
        outputPortrait: 'PDF A4 vertical',
        outputLandscape: 'PDF A4 horizontal',
        copiesLabel: 'Copias',
        copiesSingle: '1 imagen',
        copiesPlural: '{count} imagenes repetidas',
        marginLabel: 'Margen',
        compressionLabel: 'Compresion',
      },
      sourceImage: {
        legend: 'Imagen origen',
        choose: 'Elegir foto',
        noneSelected: 'Ningun archivo seleccionado',
        note: 'La imagen se procesa en tu navegador. No se sube a servidor.',
      },
      layout: {
        legend: 'Diseno',
        countLabel: 'Elementos por pagina',
        countHint: 'Cualquier numero desde 1. La cuadricula se calcula automaticamente.',
        orientationLabel: 'Orientacion de pagina',
        orientationHint: 'Cada elemento mantiene la misma orientacion para cortar facil.',
        portrait: 'Vertical',
        landscape: 'Horizontal',
        marginLabel: 'Margen y espacio',
        marginHint:
          'El mismo valor se usa para el margen exterior y el espacio entre copias.',
        compressionLabel: 'Preset de compresion',
      },
      compressionOptions: {
        high: {
          label: 'Alta calidad',
          description: 'Mas detalle con archivo mas grande.',
        },
        balanced: {
          label: 'Equilibrado',
          description: 'Buen detalle de impresion con PDF mas ligero.',
        },
        small: {
          label: 'Archivo pequeno',
          description: 'Exportacion mas liviana para compartir rapido.',
        },
      },
      actions: {
        generate: 'Generar PDF',
        generating: 'Generando PDF...',
        reset: 'Reiniciar',
      },
      status: {
        preparing: 'Preparando imagen para vista previa y exportacion...',
      },
      preview: {
        title: 'Vista previa en vivo',
        text: 'La vista refleja la cuadricula, la orientacion, el margen y la imagen procesada.',
        empty: 'Agrega una imagen para ver la hoja A4.',
        pageSizeLabel: 'Tamano de pagina',
        slotSizeLabel: 'Tamano de bloque',
        gridLabel: 'Cuadricula',
      },
      output: {
        title: 'Que hace esta exportacion',
        placementLabel: 'Distribucion',
        placementGrid: 'Cuadricula {cols} x {rows} en una pagina',
        backgroundLabel: 'Fondo',
        backgroundValue: 'Pagina PDF blanca',
        fitLabel: 'Ajuste',
        fitValue: 'Mantener proporcion',
        handlingLabel: 'Tratamiento origen',
        handlingValue: 'Re-codificacion JPEG en navegador',
        note: 'Las fotos grandes se redimensionan antes de insertar en el PDF para mantener un archivo practico.',
      },
      errors: {
        chooseImage: 'Selecciona una imagen antes de generar el PDF.',
        invalidImageType: 'Usa un archivo de imagen como JPG, PNG o WebP.',
        prepareFailed: 'No se pudo preparar la imagen.',
        pdfFailed: 'No se pudo generar el PDF.',
      },
    },
  },
}

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale)
}