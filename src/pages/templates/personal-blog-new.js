import React, { memo } from "react";
import PersonalBlogTemplate from "../../templates/personal-blog/components/PersonalBlogTemplate";

const PersonalBlogPage = memo(() => {
  return <PersonalBlogTemplate />;
});

PersonalBlogPage.displayName = "PersonalBlogPage";

export default PersonalBlogPage;
