---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B3GPNOO%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T191022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDp9HAkO1mCPMQCaorlMQiogyyvQGhRH82izqPosg7fhAIgZ1%2FfCZb8M8bwOr7DP1gDVMlnWSTkT4yWfS0qv%2B2IH8sq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDI2Mt36Gu74C%2FoPk0SrcA1vLsJcLS3xHRXvsC9jeNbKsFX%2FPchVIfw374iOVUfvhS%2FJCfH4Bvv0EgjiYAWNPmwRZZjYQwc%2Bbq%2Be8pjtgUAoocQpi6nzr8h3pIg%2FgPu4Wi5XS8afTsuGCUGMBpqy5cEXqH4qMnh7SEdTPcJtcyTPp1aELTAJ%2BXbIAvnQDbviaTnUWeUWRu3z753JdNk8VhtqJ5BAYFtAobrOE5YWRxwsWpQybMjlJZmiBljxel7sQ%2F8xjsWPfJQ56qr2t5hlbIHlp%2FPnzzCFkEeQd5coUK%2FmjeYY%2BKLyYRnZYUrJa4UJlArqbyoLcU9DhOO9WTbYwWf9lAilPhD7LXS0cUcm8LzcVvosXo9RQPldDcX313p7zryGMH17rOc8amIvV5ZsGSoaXDQ8hseDkCzXT1lwOb%2BVNiXhy6JKeFUR%2FSEeIPMRHN8%2FNeaa9afqUs%2BOWxpgkix2IPt6hYy5KYWmJGQiQXi3hlVOcAnzfFFImNBvY9O1eZEVt3p2Q0PfhNny8IvaYogPQdha%2BnE2tOC1o5Z7i3OHWar%2B1rH1bUfMMYLfnup2xp4Sq1RwDmYpIznA9ET6gUBaMlHskySqg9Aw6ZT3rRcFlnEtOBfj%2FzbMzA5hH2TBbsCuOTsI30x%2BY8yWSMKjdvMkGOqUBm3tchQHou4JrJb3rGoT0NLqBNhZVbAixYM3L0POFA8ai2luj1vf84yCeldpU%2F78%2FCWtMA3%2BmYSPRzyo8mP96TA08EUDCMhZFjYJSwPj2rYjlLFE2NoXhlJgrfSzV5JnEAASCZpIqBipANpotBXh8rtsKmEYiiN6%2BCcZ5YbJQUfCnr1ThqUY8uEJcm1eyEm2RR8QxPmB9yEiIVAzryJBLuHUQHb5e&X-Amz-Signature=1c41e4bdbba0f31f29acf67e3255c4e24d3067640e653c52b952c9cad692644f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B3GPNOO%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T191022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDp9HAkO1mCPMQCaorlMQiogyyvQGhRH82izqPosg7fhAIgZ1%2FfCZb8M8bwOr7DP1gDVMlnWSTkT4yWfS0qv%2B2IH8sq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDI2Mt36Gu74C%2FoPk0SrcA1vLsJcLS3xHRXvsC9jeNbKsFX%2FPchVIfw374iOVUfvhS%2FJCfH4Bvv0EgjiYAWNPmwRZZjYQwc%2Bbq%2Be8pjtgUAoocQpi6nzr8h3pIg%2FgPu4Wi5XS8afTsuGCUGMBpqy5cEXqH4qMnh7SEdTPcJtcyTPp1aELTAJ%2BXbIAvnQDbviaTnUWeUWRu3z753JdNk8VhtqJ5BAYFtAobrOE5YWRxwsWpQybMjlJZmiBljxel7sQ%2F8xjsWPfJQ56qr2t5hlbIHlp%2FPnzzCFkEeQd5coUK%2FmjeYY%2BKLyYRnZYUrJa4UJlArqbyoLcU9DhOO9WTbYwWf9lAilPhD7LXS0cUcm8LzcVvosXo9RQPldDcX313p7zryGMH17rOc8amIvV5ZsGSoaXDQ8hseDkCzXT1lwOb%2BVNiXhy6JKeFUR%2FSEeIPMRHN8%2FNeaa9afqUs%2BOWxpgkix2IPt6hYy5KYWmJGQiQXi3hlVOcAnzfFFImNBvY9O1eZEVt3p2Q0PfhNny8IvaYogPQdha%2BnE2tOC1o5Z7i3OHWar%2B1rH1bUfMMYLfnup2xp4Sq1RwDmYpIznA9ET6gUBaMlHskySqg9Aw6ZT3rRcFlnEtOBfj%2FzbMzA5hH2TBbsCuOTsI30x%2BY8yWSMKjdvMkGOqUBm3tchQHou4JrJb3rGoT0NLqBNhZVbAixYM3L0POFA8ai2luj1vf84yCeldpU%2F78%2FCWtMA3%2BmYSPRzyo8mP96TA08EUDCMhZFjYJSwPj2rYjlLFE2NoXhlJgrfSzV5JnEAASCZpIqBipANpotBXh8rtsKmEYiiN6%2BCcZ5YbJQUfCnr1ThqUY8uEJcm1eyEm2RR8QxPmB9yEiIVAzryJBLuHUQHb5e&X-Amz-Signature=1c41e4bdbba0f31f29acf67e3255c4e24d3067640e653c52b952c9cad692644f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IFZJ4DK%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T191023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQC4Y43Katq8yby%2FsgNvM9mNmmyGoffrYWSkaaRNE3BADQIgT%2FwT2xFoXipAn1WhnJNJkHSEYnxrhOZ43oVOMgXIzosq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDAsw9whyXESpA2mhiyrcA9HB%2FJOnEY2CEt7QL77jc9e0a%2FchpU1eTxTgNZaXYGFk%2FyH8avbSdMe5OZVwU8DVW2blqdkwlTNocPe09g2IXE1P93tS9%2FWeeVXvHedkCeI8NwmJTFN5d3To1D1MvOn8qBDxIHy13Fou%2FxaPJOPUgc7MhytTp1JdzeNcnAGLngVsIGO9o%2FN%2FzpTvdbkQ%2B7RWTH%2FNGkXuMW7jEYmYvWZGdB%2BpxXP2eD5JuoLwpX85Ls43Z0RgcPNwEPFuthtO8Nym21X1FHyGbZ2WaYSTtWURcKV145DyHkFmSkWV4roN9co77veV5SL2BIhHKp0LStVpQMp4mMS%2FsA61rwD30ih%2FiYohDvNZ1ylDXCtKCwGnfGPXgKZv0TWBNePQ5edN3Me7mQ3g43B9EyXs1XskFI3uQ8AI1bId0yCzsJRGE6FKDvYVb%2FlJSd%2BgrO6Sh8%2Fcu84ewOSAnTm2FCT9Dkk4FlczkEempTGH15pfkx6Ii0Bk97DmQruytIPB5wH1%2BDldV4eiRQOXEafNEHezEcB3AzPKFRyMuFM5fuWxM%2BKBjUhPJeKxZNCA%2FXsUmB4Nu%2BBMUiTz7O6yhLtW4tr8n2XvUTdZn3%2BFiLj5eUt2i1qUQW91dSjw%2BWXx2s4Do6yTwWMZMLvdvMkGOqUBB38Ies3Mq4VGsg%2BtKK9pzJw%2BprroEu4ot1Hsw%2BXtIviYh5Lo1OvvuT70lTCiV1%2BJVK8vngin3k%2BYHBWTaYFZmsNQS5gv8QpJpH0%2BTPlG2WQzjaEWA3LzfJ%2BEQ5r1oB4QyCgajaqpbawsyQIHXJgcc2b5PNAuf5FWhKMK8uKbdYUfQn2lna7YjxTbhgVtr9b%2BDzxpsH9TUq%2FV7nyXBVEtS8lQ6A8q&X-Amz-Signature=97df5880613e48bad2cb0d0ef1892c6cdba454a5d540670974a4aee107b40e4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IFZJ4DK%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T191023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQC4Y43Katq8yby%2FsgNvM9mNmmyGoffrYWSkaaRNE3BADQIgT%2FwT2xFoXipAn1WhnJNJkHSEYnxrhOZ43oVOMgXIzosq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDAsw9whyXESpA2mhiyrcA9HB%2FJOnEY2CEt7QL77jc9e0a%2FchpU1eTxTgNZaXYGFk%2FyH8avbSdMe5OZVwU8DVW2blqdkwlTNocPe09g2IXE1P93tS9%2FWeeVXvHedkCeI8NwmJTFN5d3To1D1MvOn8qBDxIHy13Fou%2FxaPJOPUgc7MhytTp1JdzeNcnAGLngVsIGO9o%2FN%2FzpTvdbkQ%2B7RWTH%2FNGkXuMW7jEYmYvWZGdB%2BpxXP2eD5JuoLwpX85Ls43Z0RgcPNwEPFuthtO8Nym21X1FHyGbZ2WaYSTtWURcKV145DyHkFmSkWV4roN9co77veV5SL2BIhHKp0LStVpQMp4mMS%2FsA61rwD30ih%2FiYohDvNZ1ylDXCtKCwGnfGPXgKZv0TWBNePQ5edN3Me7mQ3g43B9EyXs1XskFI3uQ8AI1bId0yCzsJRGE6FKDvYVb%2FlJSd%2BgrO6Sh8%2Fcu84ewOSAnTm2FCT9Dkk4FlczkEempTGH15pfkx6Ii0Bk97DmQruytIPB5wH1%2BDldV4eiRQOXEafNEHezEcB3AzPKFRyMuFM5fuWxM%2BKBjUhPJeKxZNCA%2FXsUmB4Nu%2BBMUiTz7O6yhLtW4tr8n2XvUTdZn3%2BFiLj5eUt2i1qUQW91dSjw%2BWXx2s4Do6yTwWMZMLvdvMkGOqUBB38Ies3Mq4VGsg%2BtKK9pzJw%2BprroEu4ot1Hsw%2BXtIviYh5Lo1OvvuT70lTCiV1%2BJVK8vngin3k%2BYHBWTaYFZmsNQS5gv8QpJpH0%2BTPlG2WQzjaEWA3LzfJ%2BEQ5r1oB4QyCgajaqpbawsyQIHXJgcc2b5PNAuf5FWhKMK8uKbdYUfQn2lna7YjxTbhgVtr9b%2BDzxpsH9TUq%2FV7nyXBVEtS8lQ6A8q&X-Amz-Signature=97df5880613e48bad2cb0d0ef1892c6cdba454a5d540670974a4aee107b40e4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKDKULQT%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T191022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCplfT67SNkrx6rX%2FOTnfw2zntkM9qFNGJHM2jgFrylHwIgWXqYyYlHxX%2F9m8LMxq2UdHvJVCwr504kLJevqVr1P9gq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDEpQ7eE1lHEBMkSN7ircA9xEtMoVwrVxY7%2Bm0rFwTlBoUtVJyOlwV8%2FQiKGgYAw1P7SIRzbTj1hanY1XNVXL7hicNHRF6A2YBXsWw5O725SSoPf7RzqUH%2BZE2owud5Hp%2F5aZiCkeFua0xuJSwVH7W4PCZHv37RrNcwHZ82c9x%2BY3QE9g%2FMG%2BqY%2FnHaVxYKIVzeTocCKeb65YIOmeiUbt9olnqiOzTiA2aVHZ77gUuyuekfqCNkuXVdQ46lKUz4e%2F%2Fa0mpWq239StC1bl9gZIYRTHtl3ZbLFxy9w%2FxxAMjPWcg03S0rWumXpeE1ijnJbRN64KjH%2FihtaDIG39Ft%2BBPE0c7%2BAdJo6Ezy51MqmA0ZDsQKy%2BWRPKsTXBVa9MY1H%2BpxKB7Z0XaqbP%2FBs%2F3l7p0NWDoaumHf6E8UBgFZrHZgrY3aXcidk0WUnZtmNDcjX3Z4D6jUlXdfpoOoQpvw9wYZX%2FY8podrdixitTzVXmppyrtRzjdsZl0MLNreJEor1BYEnW9b3%2B4WRz%2FI3HaySWDEJ9vSv5yWSxVEdrGvj%2BiXBrcY1iKAHMwr3vGkfUMLg9FCJvuKwTeID1hcL0R%2FIT6GmpvWkxYvtZF3QE1jg%2FNrgIJKUDy9qL7K3bXGJx4gsUtUygxIxVAmrqVV23MNfdvMkGOqUBZD5b9Eqm4m90MYPS9y3defzA%2BJ779T%2F5zUpG4I8KglYQq56EGgQZH6tQ06r0swXNkXeXMkxoRG8u5GeRF5HkaEOx3DITLA%2Bj%2BcPSY%2BkJHlqf8s%2Fe2%2BI9SzZOj%2Fd%2FyyQMvZ9JnAlxYT85d3IMkxARJzMYFjrbM2UMkmurxgpmTdyf7uEBiAh98zTVqPZgFMPsmMQv%2Foe%2B0w4bDKn8TQAuhemjszbB&X-Amz-Signature=86a97b76273a6297cd58eb28c24c3ba32178e2306c39763ad70222664f4c1934&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCPKRP7O%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T191029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQCJQLyxtStaLWNNfcsvQ%2BL4NkCnec0DCr4i3t7OmSQ6mAIhAPQ2wbRpw0h1VVdiaEWE2rV2rIh4MAycSS6rKGosGGLvKv8DCBwQABoMNjM3NDIzMTgzODA1IgxpwFQZ015tQ1ArIXsq3AOzEjbcHw3rdsZHS34ADzNagIxgYI72DSm8R0OiLLZf5ycxCHL4rEiffik4mUZqXF%2FVrDxMvF7DdP1UM7QTzOD4UVzZSzB0H9prdiTfZ2zjZ%2BH%2FYD0YdDa8f0BzQxCxYS70lumihWC%2FkfViWM7B7IfGHQnWes2k1%2FSlImAdBrG59iGTbtuq46YPizN%2F0yNwPNkFBLBWjRl6fYO5Pv0GHgf71ZlmvJFVtzM9HilDuhIcsJXE9nRsTzffN5y791%2BjC4ruKfNpwm%2FPihjBtxLHM1eKvb1lvbXqpDKSm8ShMcGJfeWGqG1JWHPjM2DCmNolNXBbW7bfYXO5z5%2BTd1P6lPxQkXcvUALkR7goxKOUjmmK%2Fpj9HeZodif2Assuw%2BNlnLJfE%2FD24SPewz0c5GX7GYRgKrHQAvzqhsFwFb9rKdg1U%2BKNBvljjBV3T66y6jGs5H8RqpE8jsa%2Fq4wljGY2YnKWuCy3qwUWK6uRo7cAs02uroLYyqLFkuwXaL8cTvlEpTOOv02NtKFkz2s6ui3p7oEq2MouuqFJgWfgQCPY%2FWLnzdMhf2dgPsEDwuAHfEWHX6IHCs%2BnLyMdNIn2%2Bk30fyW%2FxisGEOrhgHrlA89OVzy6D%2FAGuBdqo%2F3UzMJ2pDDu3bzJBjqkAWKnjKS6ISDcrc%2BFEyJqMmoI0d0RGavKU0%2BY1euPFSyF7AqPD8MzMc1FjQbrNegyPFJh8HckQx0af4ogYKMOldIySmfBbylECSMnzScQdjOx9MhqI3Vm0tPLeILBXhnIjgkt3C3N0As49z6M5Z1KUfNrAMcOjhMwN38J7CYDr3s4oKx9v5fjin1lmfh4OL5LUd9zaiD7MQM7t5P7jC2WKMfmEOcT&X-Amz-Signature=608b4702f6fc9d34aab2d83dce28a8e4ea7064fa84985e6c9091b492834c5bb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCPKRP7O%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T191029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQCJQLyxtStaLWNNfcsvQ%2BL4NkCnec0DCr4i3t7OmSQ6mAIhAPQ2wbRpw0h1VVdiaEWE2rV2rIh4MAycSS6rKGosGGLvKv8DCBwQABoMNjM3NDIzMTgzODA1IgxpwFQZ015tQ1ArIXsq3AOzEjbcHw3rdsZHS34ADzNagIxgYI72DSm8R0OiLLZf5ycxCHL4rEiffik4mUZqXF%2FVrDxMvF7DdP1UM7QTzOD4UVzZSzB0H9prdiTfZ2zjZ%2BH%2FYD0YdDa8f0BzQxCxYS70lumihWC%2FkfViWM7B7IfGHQnWes2k1%2FSlImAdBrG59iGTbtuq46YPizN%2F0yNwPNkFBLBWjRl6fYO5Pv0GHgf71ZlmvJFVtzM9HilDuhIcsJXE9nRsTzffN5y791%2BjC4ruKfNpwm%2FPihjBtxLHM1eKvb1lvbXqpDKSm8ShMcGJfeWGqG1JWHPjM2DCmNolNXBbW7bfYXO5z5%2BTd1P6lPxQkXcvUALkR7goxKOUjmmK%2Fpj9HeZodif2Assuw%2BNlnLJfE%2FD24SPewz0c5GX7GYRgKrHQAvzqhsFwFb9rKdg1U%2BKNBvljjBV3T66y6jGs5H8RqpE8jsa%2Fq4wljGY2YnKWuCy3qwUWK6uRo7cAs02uroLYyqLFkuwXaL8cTvlEpTOOv02NtKFkz2s6ui3p7oEq2MouuqFJgWfgQCPY%2FWLnzdMhf2dgPsEDwuAHfEWHX6IHCs%2BnLyMdNIn2%2Bk30fyW%2FxisGEOrhgHrlA89OVzy6D%2FAGuBdqo%2F3UzMJ2pDDu3bzJBjqkAWKnjKS6ISDcrc%2BFEyJqMmoI0d0RGavKU0%2BY1euPFSyF7AqPD8MzMc1FjQbrNegyPFJh8HckQx0af4ogYKMOldIySmfBbylECSMnzScQdjOx9MhqI3Vm0tPLeILBXhnIjgkt3C3N0As49z6M5Z1KUfNrAMcOjhMwN38J7CYDr3s4oKx9v5fjin1lmfh4OL5LUd9zaiD7MQM7t5P7jC2WKMfmEOcT&X-Amz-Signature=608b4702f6fc9d34aab2d83dce28a8e4ea7064fa84985e6c9091b492834c5bb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

