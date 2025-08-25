# Релиз

Предусловия:
- ветка `master` не содержит `changeset`

Шаги:

1. Влить pull request, содержащий `changeset`, в ветку `master` [(пример)](https://github.com/hextion/core-components/pull/28)
2. Дождаться окончания работы action `release` [(пример)](https://github.com/hextion/core-components/actions/runs/14856550776). В результате работы должен появиться автообновляемый pull request под названием `Version packages` [(пример)](https://github.com/hextion/core-components/pull/29)
3. Повторить предущие шаги необходимое для релиза количество раз
4. Заморозить ветку `master` (проинформировать команду и тп)
5. Влить pull request под названием `Version packages` (результат работы шаг №2).
6. Дождаться окончания работы action `release` [(пример)](https://github.com/hextion/core-components/actions/runs/14857192076). В результате работы action `release` должны:
    - произойти публикация npm пакетов в реестр
    - в ветке `master` появиться тэги, соответствующие версиям пакетов
    - в разделе `Releases` появиться релизы, соответствующие версиям пакетов

# Snapshot релиз

Предусловия:
- ветка, с которой будет произведен `snapshot` релиз, содержит `changeset`

Шаги:
1. Запустить action `snapshot-release` на соответствующей ветке. В результате работы action `snapshot-release` должны:
    - произойти публикация npm пакетов в реестр
    - в pull-request с текущей веткой появится соответствуюший [комментарий](https://github.com/hextion/core-components/pull/7#issuecomment-2790023580) об успешном релизе npm пакетов

# Релиз мажорной версии

Преусловия:
- ветка `master` содержит/не содержит `changeset`

Шаги:

1. От ветки `master` переключиться на новую ветку `next`. В рамках создания ветки необходимо:
    - войти в [пререлиз](https://changesets-docs.vercel.app/en/prereleases) режим::
        ```sh
        yarn changeset pre enter next
        ```
    - [заменить `baseBranch` в конфигурации `changeset` на `next`](https://github.com/hextion/core-components/blob/5d9641ded14d44d1d6d73ed4c989589ffba239e9/.changeset/config.json#L8)
2. Залить необходимые для мажорного релиза pull request в ветку `next`. В результате обновлений ветки `next` будет сформирован автообновляемый pull request под названием [`Version packages (next)`](https://github.com/hextion/core-components/pull/38), его можно вливать по мере необходимости
3. Заморозить ветки `master` и `next` (проинформировать команду и тп)
4. При необходимости залить изменения из ветки `master` в `next`
5. На ветке `next` необходимо [(пример)](https://github.com/hextion/core-components/pull/39):
    - выйти из пререлиз режима:
    ```sh
    yarn changeset pre exit
    ```
    - заменить `baseBranch` в конфигурации `changeset` на `master`
6. Влить pull request под названием `Version packages` в ветку `next` [(пример)](https://github.com/hextion/core-components/pull/40)
7. Запушить ветку `master` под другим названием для поддержки предыдущей версии (например `version/48`)
8. Влить ветку `next` в `master` (мердж коммитом - для сохранения тэгов) [(пример)](https://github.com/hextion/core-components/pull/41)
