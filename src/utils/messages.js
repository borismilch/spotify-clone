export default {
  NOT_SAME_PASSWORDS: { type: "error", message: "Ваші паролі не співпадають" },
  USER_SINGED_IN: { type: "success", message: "Ви успішно зарєструвалтсь" },
  "auth/email-already-in-use": { type: "error", message: "Пароль або E-mail" },
  "auth/invalid-email": { type: "error", message: "Невірний E-mail" },
  "auth/wrong-password": { type: "error", message: "Невірний пароль" },
  "profile-changed": { type: "success", message: "Зміни успішно збережено" },
  NO_SONG_SELECTED: { type: "error", message: "Ви не вибрали пісню" },
  USER_LIKED: { type: "success", message: "Додано у вподобайки" },
  USER_DISLIKED: { type: "success", message: "Видалено з вподобайок" },
  PLAYLIST_CREATED: { type: "info", message: "Ви успішно створили плейліст" },
  PLAYLIST_CHANGED: {
    type: "success",
    message: "Ви успішно відредагували плейліст",
  },
  PLAYLIST_DELETED: {
    type: "success",
    message: "Плейліст видалено",
  },
  ADDED_TO_PLAYLIST: {
    type: "info",
    message: "Трек добавлено",
  },
  ALBUM_CREATED: {
    type: "success",
    message: "Альбом створено",
  },
  ALBUM_DELETED: {
    type: "info",
    message: "Альбом видалено",
  },
};
