git push -d origin $(git tag -l "*dev*" "*alpha*" "*beta*")
git tag -d $(git tag -l "*dev*" "*alpha*" "*beta*")