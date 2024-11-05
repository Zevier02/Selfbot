Un code de selfbot en javascript qui
utilise Node.js et
utilise les modules "discord.js" et "discord-selfbot.js".
Pour les installer, taper dans la console :
```
npm i discord.js
```
et
```
npm i discord.js-selfbot-v13-fixed4
```

⛔ **Utiliser un selfbot sur votre compte discord est interdit et peut mener à la fermeture de votre compte. Je ne suis pas responsable de l'utilisation que vous en ferez.** ⛔

# Configuration :
Pour utiliser le bot, il faut modifier le fichier `config.json` dans le même dossier que `index.js`, normalement, son contenu est :
```
{
    "token": "",
    "autorized users id": [],
    "prefix": ">!",
    "senddeletedmessageCustom": false,
    "senddeletedmessageChannel": "",
    "senddeletedmessage": false
}  
```
`token` est le token de l'utilisateur sur lequel le bot doit se connecter.

`autorised users id` est la liste des id des utilisateurs pouvant utiliser le bot en dehors du compte sur lequel le bot est connecté. Il se remplit comme ceci : `["id utilisateur 1", "id utilisateur 2", "id utilisateur 3"]`.

`prefix` est le prefixe utilisé par le bot pour utiliser les commandes.

`senddeletedmessageCustom` permet d'activer (`true`) le message logger ou pas (`false`).

`senddeletedmessageChannel` est l'id du salon dans lequel le message logger enverra les messages.

`senddeletedmessage` permet d'activer (`true`) l'auto-renvoi des messages ou pas (`false`). **Je vous déconseille de l'utiliser car il permet de renvoyer TOUS les messages supprimés dans les salons dans lesquelles ils ont étés envoyés, causant des bans des servers publics.**


Pour lancer le bot, seul `token` est à remplir, les autres paramètres ayant une valeur par défaut donnée ci-dessus.
# Commandes :

  ## Config

  
  Config : Permet de temporairement (jusqu'a redémarrage) de changer ou de regarder (si le champ [valeur] est laissé vide) les paramètres actuels de configuration du bot (sauf le token).

  Utilisation : `prefixe + config [paramètre à changer] [valeur]`

  Exemples : 
  
  `!config SDC true`
  Permet de changer la valeur de `senddeletedmessageCustom` à ici, true.

  `!config SDCC set`
  Permet de changer le salon d'envoie des messages supprimés au salon de la commande.

   `!config SDM false`
  Permet de changer la valeur de `senddeletedmessage` à ici, false. **Encore une fois, il s'agit d'un paramètre très dangereux**.

  `!config users add/remove [id de l'utilisateur]`
  Permet d'autoriser ou de retirer l'autorisation d'une personne à utiliser le bot.
  

  ## Spam
  
  
  Spam : Permet de spam des messages.
  
  Utilisation : `prefixe + spam, [nombre de messages], [message]`
  
  Exemple : `!spam, 10, Bonjour`
  
    
  ## Ccreate

    
  Ccreate : Permet de créer un salon (spammable avec Spam).
  
  Permission : Créer des salons.
  
  Utilisation : `prefixe + ccreate [nom du salon]`
  
  Exemple : `!ccreate general`
  
    
  ## Calcul
  
  
  Calcul : Permet de faire une opération (spammable avec Spam).
  
  Utilisation : `prefix + calcul [nombre 1] [opération] [nombre 2]`
  
  Exemple : `!calcul 2 + 2`
  
    
  ##  Ghostmsg
  
  Ghostmsg : Permet d'envoyer un message et de le supprimer juste après (spammable avec Spam).
  
  Utilisation : `prefixe + ghostmsg [message]`

  Exemple : `!ghostmsg Salut`
