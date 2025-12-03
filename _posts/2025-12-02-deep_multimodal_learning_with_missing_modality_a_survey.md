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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URBXOB3C%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T110104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIEXOeTFDEMW383RBfKyqj1cjEicfbZ8iAO1X9YVIZinfAiAMXNVMQPLiouLNnR6q1ijlhuIteyfJHDrFx%2F6%2Byl9etSr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMFGousF3otsl37ll3KtwDAjB3Mqh9N20IQBq4AGpHrGtUMaxLiISKYzp7kGXv367xq6UWBChnBRwZ6vK7J4dLLb%2BDtzJuHNVtY2%2FTdas9QH8aQn6O%2FOLls1YpxQMZzWzKTdTfpiD0SsV4FIb1WiIN9kAlcj2nwXmhkyFO%2Fi1w%2Bjn5GjiI93bQMdFD3yPE3hafoAmY1lrh1TRpsaab9yp4c1bPB6qzOzmHRm1KXiyJNaBAijWtiL%2FgPYftFLWIRPins0b5W0eb3vfIA9BPvVSKbdvCkO%2F0vf9kDn%2F8hJM6%2Bnn2J5%2FUdJKnEfOAlW7xOYUZhN6IwFzxUUcVK%2FrHo%2FjkiKpfe2X5w3KAzIg5UyB32P3XsEVGU2kNUmuwcs%2FdoC4kKc017dytquK%2FWz3Mt7mx4Mkky6Rz36P6mb2bd3Z7fxOvJHQVcZSJDNfBfc389cCV6%2B3VjE0r2whDh4iRUCdivYvR3Of7Y1SrrB302LB8RR8aV6wnHb6NMmyWWI91kiQrlH4alwzsBarSOpyknp30uboB5hcUuz2NGIDgKK3oB2oQCpXISC8h2SFavEXuMAO0SQI73gXCh9Grf5KKy5Vhl%2FEXHw5OqAUW2J03arQqEvDBhVOly0YFQ%2Be9bs5Pmn9TxfRqv4aNM%2Bz%2BCt8w7Z7AyQY6pgEUQy%2B23huvbJ59hs7FLchdh64RKvEb%2B6pLuMOvz1fvHGA%2BjI3F1Ppw6gOjMNjjOseierQYxJJdV2Dzmqw2QOXG365VCJ0fAZ9cYATCc0KJCXinhj8y457NpHukk6isfT286%2FmWqkB1JFwpjADyxcCfuIO%2BIkt0FZp8eBdkVAA6tyWqfThvj3HDPpBVUENExoufjwJWziM8FyK2IXj5dcvRCA1bClWH&X-Amz-Signature=9c3cba3fde1379d5e545754f86f1e486398ebac0622950481acc8bb352e5cfb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URBXOB3C%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T110104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIEXOeTFDEMW383RBfKyqj1cjEicfbZ8iAO1X9YVIZinfAiAMXNVMQPLiouLNnR6q1ijlhuIteyfJHDrFx%2F6%2Byl9etSr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMFGousF3otsl37ll3KtwDAjB3Mqh9N20IQBq4AGpHrGtUMaxLiISKYzp7kGXv367xq6UWBChnBRwZ6vK7J4dLLb%2BDtzJuHNVtY2%2FTdas9QH8aQn6O%2FOLls1YpxQMZzWzKTdTfpiD0SsV4FIb1WiIN9kAlcj2nwXmhkyFO%2Fi1w%2Bjn5GjiI93bQMdFD3yPE3hafoAmY1lrh1TRpsaab9yp4c1bPB6qzOzmHRm1KXiyJNaBAijWtiL%2FgPYftFLWIRPins0b5W0eb3vfIA9BPvVSKbdvCkO%2F0vf9kDn%2F8hJM6%2Bnn2J5%2FUdJKnEfOAlW7xOYUZhN6IwFzxUUcVK%2FrHo%2FjkiKpfe2X5w3KAzIg5UyB32P3XsEVGU2kNUmuwcs%2FdoC4kKc017dytquK%2FWz3Mt7mx4Mkky6Rz36P6mb2bd3Z7fxOvJHQVcZSJDNfBfc389cCV6%2B3VjE0r2whDh4iRUCdivYvR3Of7Y1SrrB302LB8RR8aV6wnHb6NMmyWWI91kiQrlH4alwzsBarSOpyknp30uboB5hcUuz2NGIDgKK3oB2oQCpXISC8h2SFavEXuMAO0SQI73gXCh9Grf5KKy5Vhl%2FEXHw5OqAUW2J03arQqEvDBhVOly0YFQ%2Be9bs5Pmn9TxfRqv4aNM%2Bz%2BCt8w7Z7AyQY6pgEUQy%2B23huvbJ59hs7FLchdh64RKvEb%2B6pLuMOvz1fvHGA%2BjI3F1Ppw6gOjMNjjOseierQYxJJdV2Dzmqw2QOXG365VCJ0fAZ9cYATCc0KJCXinhj8y457NpHukk6isfT286%2FmWqkB1JFwpjADyxcCfuIO%2BIkt0FZp8eBdkVAA6tyWqfThvj3HDPpBVUENExoufjwJWziM8FyK2IXj5dcvRCA1bClWH&X-Amz-Signature=9c3cba3fde1379d5e545754f86f1e486398ebac0622950481acc8bb352e5cfb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBXEAJ3G%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T110105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIAmzik9lWz15HJj3uZaTLG5aYjt8MOH2INWJLPJAxjm7AiEA9r8kIIycv9AudgUcMCLACa4vVwDiQ7l%2BokAH5kJT1q8q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDDHO6jQjHdrNoS2mPSrcA1G3nbODTXzl9FF8HIbIBhJ6aEoIWkmEN%2BVaHbzgDNS%2B7bKoD5iOMX4RdWxi1xVucJYNJW2HzS6v3pnG%2Fx2eKE57prRlXlmZ%2BVfuDnY0njSUkW4wSWvImPCsGqS654H9Bo%2FgETr%2FAsWo3fUQj5v%2FPMsCGPVkmrQ83v5o%2FUB61NmgU3AWzgEXHRDNiEHsIsGzV6Kw2l9WP2iCC5f%2B%2FXqFLsO77xUDPIGGnEoNQCBXswguuE3KUX6YIfflmtFKhNM%2Bx%2Fupd5xA1yvYNsklfIwMt8zkqA25hcUHCgeHAkD%2FggRLSjVu0314eD691vi7a4hZDzPDO0KUbHJdw7ExTDOHPdZ%2B3%2FJhzA%2BQMkGSyioIZVUSHEFn7UadxcoQXhUhGthb0SN3izkCUYUfaJ0PNbZ0I0DhdPjiB5i8KlcmJGili%2FssnKfeUCBf4T2%2B%2FCzoGhQPa6AI59nB5rm9GLdDY%2FdkKzgjieI1Qkih7HxZiIWci1hbKrjjuVHXnLp4h%2Fxp%2B%2Fje43XonROW2kUeTLIl%2FFMPagLHRwJwWmpyKkE9nPcB0fDaH0EAVWTQOmshAkrnjtQYhcskdazYLhIa2BbvnDIW1E60eVIIGZ4RNefGesOXai1sj6U47HrKff%2F1a05VMIyewMkGOqUBOmStzTgHrUMXyG2sBpYRupm3zaTH2oiCM%2BT7tzy2DMouWec2ucUZEsCST9jNtvetFuWH966ubZCIDyOonnlPHEWfeBKQLzJOAyUAnkZhCPGNyZ%2FmZSsLXpH8fNDbpUnpgeRyN77HMTSCBHmGTeykzKkKinODFtsPPDEcvQJ2ygAxvcJts86pu5i8F9Eyk0m1nJtWhhRM6hEA1TbESGHtUUKFULJ7&X-Amz-Signature=099f786a93a43f4c26ecb30d52e668812f5c821d98b70bef8e7b5462d5a4bae6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBXEAJ3G%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T110105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIAmzik9lWz15HJj3uZaTLG5aYjt8MOH2INWJLPJAxjm7AiEA9r8kIIycv9AudgUcMCLACa4vVwDiQ7l%2BokAH5kJT1q8q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDDHO6jQjHdrNoS2mPSrcA1G3nbODTXzl9FF8HIbIBhJ6aEoIWkmEN%2BVaHbzgDNS%2B7bKoD5iOMX4RdWxi1xVucJYNJW2HzS6v3pnG%2Fx2eKE57prRlXlmZ%2BVfuDnY0njSUkW4wSWvImPCsGqS654H9Bo%2FgETr%2FAsWo3fUQj5v%2FPMsCGPVkmrQ83v5o%2FUB61NmgU3AWzgEXHRDNiEHsIsGzV6Kw2l9WP2iCC5f%2B%2FXqFLsO77xUDPIGGnEoNQCBXswguuE3KUX6YIfflmtFKhNM%2Bx%2Fupd5xA1yvYNsklfIwMt8zkqA25hcUHCgeHAkD%2FggRLSjVu0314eD691vi7a4hZDzPDO0KUbHJdw7ExTDOHPdZ%2B3%2FJhzA%2BQMkGSyioIZVUSHEFn7UadxcoQXhUhGthb0SN3izkCUYUfaJ0PNbZ0I0DhdPjiB5i8KlcmJGili%2FssnKfeUCBf4T2%2B%2FCzoGhQPa6AI59nB5rm9GLdDY%2FdkKzgjieI1Qkih7HxZiIWci1hbKrjjuVHXnLp4h%2Fxp%2B%2Fje43XonROW2kUeTLIl%2FFMPagLHRwJwWmpyKkE9nPcB0fDaH0EAVWTQOmshAkrnjtQYhcskdazYLhIa2BbvnDIW1E60eVIIGZ4RNefGesOXai1sj6U47HrKff%2F1a05VMIyewMkGOqUBOmStzTgHrUMXyG2sBpYRupm3zaTH2oiCM%2BT7tzy2DMouWec2ucUZEsCST9jNtvetFuWH966ubZCIDyOonnlPHEWfeBKQLzJOAyUAnkZhCPGNyZ%2FmZSsLXpH8fNDbpUnpgeRyN77HMTSCBHmGTeykzKkKinODFtsPPDEcvQJ2ygAxvcJts86pu5i8F9Eyk0m1nJtWhhRM6hEA1TbESGHtUUKFULJ7&X-Amz-Signature=099f786a93a43f4c26ecb30d52e668812f5c821d98b70bef8e7b5462d5a4bae6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YV5VMXVZ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T110100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQD3Y8vO%2BMiCm9S7XQDFzJiwLYK3r%2F%2BzsBzqA%2Baz6xEc9wIgU7ZpaB55pBpuJwqkqKoc12w8pyyWn2oWnp8gZlosHqgq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDGGttg9n9xNp9wnC1ircA0rctIx7Ug6YQNctpol%2BVZP5pauYW45%2Bq6%2F5ETPee3lgwSI4jSOprajW1JwtFE%2BjqEekdunNLSnKNKJPpaFHwL4UAZWubJLG6qLQtoKAhXGla4oNuJVzsVP6Gpu0qMjfG0AkYmgkdrdwxlWj1pavwaSV9buL0KjdaKExVAq90PbqSIqGAECMYq73XQh3tNKCmA4wKpEyDEU6Nqr3P8Ae1JAMi2dVAVJSmyyONIUPJWJjiSGt%2FkmwcUZ%2F7yw2Ldcno02iLGtUvJOewSUJ95Md2N9CwyiRdy7Qw3PVQztNkkrYmL51GkFF1U64WDiGLIuFBmk2gayZpPYuJlGAYV8PqaXCp55LmbjnhEXwMu8N8s53uRZCVsg7%2BaTPicIch8F6EY9W54OjhZFGDdF27xUCQupJbKSblal7GGSSLGr76BihoU0kZzJl9tshRttD1ppQgVsKmaxuY90E5l4GWmM7ulbRw1T%2Fd1ffR9W%2Bi3i8JrI%2FE9IIC7rU5SZhcNeip39eLRvDk%2BCDgXbNHqHL6gzWLMSXxDxFD7l3vf0KgORzm4D0hEXt8I3rLX5GVW8RWyEJONrTdwJO5gpLHhfyPiVUxfXy%2F7y7OeLIin6Z4OBkHlsZTIWRzPQ5H02SuBJQMPKdwMkGOqUB%2FeMZgKluAjzLO%2BRQ6Y4tHCSPDNycchFiLb4veFAWpZkNqwtcp8q6sfbDVdLlki1aUVoadOirGwyAzN8qHx1yucB53IfXcz%2FpMEgdbGlVsep%2BFu6aRc2iZ0UW7LMHmbc99QQ2oaffWqmWPW5f92EXHrv8SXFDKsHhYW18ox55ed15biG0BhG4QkvdbyU8jWuDv5qLSePiVT7H9zkSdxV67r%2FiQRkO&X-Amz-Signature=74df2a2128799d1e498d2ff330a3f49c37c8daa4d590bd513db0058342230636&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGJW7QLW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T110114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIAliw2EyW2GGqrRqB8q%2Bmt%2FytZ7kT9kXfsGRm0iSx4XrAiEAuK8gP%2FbeXqQmTvNV3rIBOHHwz%2Byh0aQbKhM6O5XurNsq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDJ7vLDH6sCVVVPGnGCrcA9%2FPzySkeE%2FbRB%2F27UI%2Fc7FniNQmXG9pIURaIcczJxWsCFn3ThDpjiPvY3EcFEkCT2dLaqi9ldntinnU3ygIMs%2F65T63wtmZaO1AVONian%2Btnlgc5jIKZ1GzVQa2e9MnkIVgK7nhzfHtitC5jkzxnTS%2FY25cAJyrL8iVEb2UDPWhFHlioHTkbhC5chipZfTKIWZPcBlRNUU2sHCzG1SNsGiJoTCFws63vttmXLvzlI7OTEBKDr%2F1tFzt4YmlaOscKxRQjX23%2Bx9BqzXyHDUBzG%2FzmXcTnGE5ZjMLUzBiSMPPLJ%2BOYezOheXh4vupASZZ2qsABmVLPrp3Rr0AM4yAQ5xduX3uP3EBfW2O6vi4E2z8nvRUoZXbS8qFBTjxPPvStQo2Jf%2FJj0lCAWvoOE1oVJ5Fr1rlDzy7hw4%2F0GCcxHAztNwEn8u2xDp6zPgEX0Vn%2B7Pyy8yLR7JYe%2BFptoZ%2FZdwS2hRjKif6ozcGdrmO23825DZ2Xek1O9DVi8NRltIY5aT2nGFF%2BtcPIfjeh3ulYKH4Bk5gNqf3ztId%2B3PSEzJEp0jPcsycY%2BX4F2gVg5ppd4KRGFMFBuL6X07oA3kNby26OJwlFaCa4Vq3uBNmJ4MHwAcoZhIa85hsCuAsMKSewMkGOqUB1KxYz90PUbdJCWed0F1wn7%2FIbXCzgY%2FLvyQT9wL1h7CjbIFXhXmdtP30%2BzyVLU8m%2BJ2bLhAJjz16euRS%2BHo6%2BMnjelFy9rkF4DlETbYMWJLLisImFuy4uCMAGHwNtwxEChfQeP%2FhZOv%2FNlElsdAnpbSlsCc5Tim2mCbff2LcxUYgxbCW64luZbYWK76L5d%2FhEWlnNY1YrbkNiGaS1%2FO4Lz4ydIFo&X-Amz-Signature=6386343d5f4ac3c5adc04a367c2b7cb9a3d4534e388955ec4a388933e1ab38ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGJW7QLW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T110114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIAliw2EyW2GGqrRqB8q%2Bmt%2FytZ7kT9kXfsGRm0iSx4XrAiEAuK8gP%2FbeXqQmTvNV3rIBOHHwz%2Byh0aQbKhM6O5XurNsq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDJ7vLDH6sCVVVPGnGCrcA9%2FPzySkeE%2FbRB%2F27UI%2Fc7FniNQmXG9pIURaIcczJxWsCFn3ThDpjiPvY3EcFEkCT2dLaqi9ldntinnU3ygIMs%2F65T63wtmZaO1AVONian%2Btnlgc5jIKZ1GzVQa2e9MnkIVgK7nhzfHtitC5jkzxnTS%2FY25cAJyrL8iVEb2UDPWhFHlioHTkbhC5chipZfTKIWZPcBlRNUU2sHCzG1SNsGiJoTCFws63vttmXLvzlI7OTEBKDr%2F1tFzt4YmlaOscKxRQjX23%2Bx9BqzXyHDUBzG%2FzmXcTnGE5ZjMLUzBiSMPPLJ%2BOYezOheXh4vupASZZ2qsABmVLPrp3Rr0AM4yAQ5xduX3uP3EBfW2O6vi4E2z8nvRUoZXbS8qFBTjxPPvStQo2Jf%2FJj0lCAWvoOE1oVJ5Fr1rlDzy7hw4%2F0GCcxHAztNwEn8u2xDp6zPgEX0Vn%2B7Pyy8yLR7JYe%2BFptoZ%2FZdwS2hRjKif6ozcGdrmO23825DZ2Xek1O9DVi8NRltIY5aT2nGFF%2BtcPIfjeh3ulYKH4Bk5gNqf3ztId%2B3PSEzJEp0jPcsycY%2BX4F2gVg5ppd4KRGFMFBuL6X07oA3kNby26OJwlFaCa4Vq3uBNmJ4MHwAcoZhIa85hsCuAsMKSewMkGOqUB1KxYz90PUbdJCWed0F1wn7%2FIbXCzgY%2FLvyQT9wL1h7CjbIFXhXmdtP30%2BzyVLU8m%2BJ2bLhAJjz16euRS%2BHo6%2BMnjelFy9rkF4DlETbYMWJLLisImFuy4uCMAGHwNtwxEChfQeP%2FhZOv%2FNlElsdAnpbSlsCc5Tim2mCbff2LcxUYgxbCW64luZbYWK76L5d%2FhEWlnNY1YrbkNiGaS1%2FO4Lz4ydIFo&X-Amz-Signature=6386343d5f4ac3c5adc04a367c2b7cb9a3d4534e388955ec4a388933e1ab38ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

