//Associations.js
import User from "./user.model.js";
import OquvMarkaz from"./uquvMarkaz.model.js";
import Filial from "./filiallar.model.js";
import Resurs from "./resurs.model.js";
import ResursCategory from "./resursCategory.model.js";
import Comment from "./comment.model.js";
import UserLikes from "./userLikes.model.js";
import Reception from "./reception.model.js";
import Yonalish from "./yunalish.model.js";
import Faoliyat from "./faoliyat.model.js"; 

Filial.belongsTo(Faoliyat);
Faoliyat.hasMany(Filial);

// User - O'quv Markazlari Like Many-to-Many
User.belongsToMany(OquvMarkaz, { through: UserLikes });
OquvMarkaz.belongsToMany(User, { through: UserLikes });

// User - Comment (One-to-Many)
User.hasMany(Comment);
Comment.belongsTo(User);

// OquvMarkaz - Comment (One-to-Many)
OquvMarkaz.hasMany(Comment);
Comment.belongsTo(OquvMarkaz);

// ResursCategory - Resurs (One-to-Many)
ResursCategory.hasMany(Resurs);
Resurs.belongsTo(ResursCategory);

// OquvMarkaz - Filial (One-to-Many)
OquvMarkaz.hasMany(Filial);
Filial.belongsTo(OquvMarkaz);

// OquvMarkaz - Yonalish (Many-to-Many)
OquvMarkaz.belongsToMany(Yonalish, { through: "OquvMarkaz_Yonalish" });
Yonalish.belongsToMany(OquvMarkaz, { through: "OquvMarkaz_Yonalish" });

// User - Reception (Many-to-Many)
User.belongsToMany(OquvMarkaz, { through: Reception });
OquvMarkaz.belongsToMany(User, { through: Reception });


// associations.js

import User from "./user.model.js";
import OquvMarkaz from "./uquvMarkaz.model.js";
import Reception from "./reception.model.js";

