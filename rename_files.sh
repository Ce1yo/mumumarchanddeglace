#!/bin/bash

# Créer un répertoire temporaire pour stocker les fichiers renommés
mkdir -p temp_images

# Copier et renommer les fichiers
find "Elements/Pieces detaché machine a glaces italiennes" -type f | while read -r file; do
    # Générer un nom de fichier simplifié (sans espaces ni caractères spéciaux)
    new_name=$(basename "$file" | \
               tr '[:upper:]' '[:lower:]' | \
               tr ' ' '_' | \
               iconv -f utf8 -t ascii//TRANSLIT | \
               sed 's/[^a-z0-9._-]//g')
    
    # Copier le fichier avec le nouveau nom
    cp "$file" "temp_images/$new_name"
    echo "Copié $file vers temp_images/$new_name"
done

echo "Tous les fichiers ont été copiés et renommés dans le dossier temp_images/"
