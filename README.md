# git-add-commit-push-emoji

集成 git add commit push 的提交工具，并且可选择自动添加 emoji 表情。

## Install

```
npm install -g git-add-commit-push-emoji
```

## 使用

提交代码，直接输入acp，即可提交一条log为emoji表情的记录

```
acp
```

如果需要自定义log，使用

```
acp somelog
```

emoji会加在自定义log之后，生成最终的提交记录


## TODO

### API
#### acp -e --emoji
修改默认emoji表情，默认为smile

#### acp -m --mode
选择模式
> single one emoji   // 使用固定一种emoji
random add one emoji   // 随机使用一种emoji
none   // 不使用emoji

#### acp -h --help
显示帮助信息
