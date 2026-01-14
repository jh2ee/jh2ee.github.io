---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUCYALQP%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQCXrXZFFgRVDiZhVdvOHxrwb4GMuXgOaDApv8DTdMocdwIhAKYq1YNrEBA9AhVb5gySoX26T5n%2B9W4jb50zulnGnuYmKv8DCCAQABoMNjM3NDIzMTgzODA1IgyXd0o1PxOt14TL9%2FEq3AMZTyq5i5uMODCDYlKJo2G3%2BpLtK5QymNG2mpM0TZaqZDkidAFNyEsZp3Yg6pF%2FKs%2F76C3z7nqw4qhuK3hTSXtkGUDr%2BiYj40TcbpOPk%2B0riFlG9H6T%2BBbUc1JmgM%2B7PjENsOgD48iyp03ZLuWWoui3OkEw7s9A%2FXPEMw%2BJeW9MPNLKY8lngcfNPj%2FZ6Ctq56O7l4nooZAt%2BrDCTmUue%2F5dLZ785ZXB%2FtZEtJGqXa%2Bzooz4pIOmZ72Ml%2FzlcIqeAmq3LD37%2FznTN4QJL5w21jYs9tZzyxbwsFtAue7tG7KPMamnFGP00TZ%2BtckTQIdKjMgFCCTPqXWd7vXUrgQSt74yLyU2EPqVT%2F88%2FzGibriixLMHVJHAYj1aqUOkxf91tVkvsSyzCxqqzTqZDdI5gM%2BFdNO4xg0Q95rDbpIkP%2BGwQr9i%2FsRDvXlQVT0YJijq66vkExcsnHOP9cn3ao6mIaMIoDy5WGv%2BC1EzUpawPR5kZcZg60ctpRVixEOvHVUckA2fMz9WwJ6SoOwrBM8gEF8L1YCLOT02wbnevbLq8cn1uIHnmN74vf64HLtehIxbA%2BnGZ2o20JKpTgKkGlBQoZizSKUKxEtTYtqAQ7OsziZI7QWscS5yIoSeXbqpqTCf3J7LBjqkAU2tpcAPc5h2D7ldFnlO%2BCb7XtALJl9xX81ifIBXAE%2F1MXSa6nnBw2HNQ%2BLrsLCFc22QQDqSu7J1rn0EaS2x3TcxHzvRETT7rTgF1Pnv989TPe0yCfwM7KTLGX%2Ffh5gQbRTJZ0EmxGXNbiAF%2FuL9dpJkxo%2BNrvd6DJyuqHX18Rwe68VMg5Q23rc8wlN6sRaY4xrMpsJEfSkWidls6F4PDdYgFVSw&X-Amz-Signature=bf0ce31e17ade59f32f5152a00c8d3bea3011b6d44a8579de4692d88a850b9cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUCYALQP%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQCXrXZFFgRVDiZhVdvOHxrwb4GMuXgOaDApv8DTdMocdwIhAKYq1YNrEBA9AhVb5gySoX26T5n%2B9W4jb50zulnGnuYmKv8DCCAQABoMNjM3NDIzMTgzODA1IgyXd0o1PxOt14TL9%2FEq3AMZTyq5i5uMODCDYlKJo2G3%2BpLtK5QymNG2mpM0TZaqZDkidAFNyEsZp3Yg6pF%2FKs%2F76C3z7nqw4qhuK3hTSXtkGUDr%2BiYj40TcbpOPk%2B0riFlG9H6T%2BBbUc1JmgM%2B7PjENsOgD48iyp03ZLuWWoui3OkEw7s9A%2FXPEMw%2BJeW9MPNLKY8lngcfNPj%2FZ6Ctq56O7l4nooZAt%2BrDCTmUue%2F5dLZ785ZXB%2FtZEtJGqXa%2Bzooz4pIOmZ72Ml%2FzlcIqeAmq3LD37%2FznTN4QJL5w21jYs9tZzyxbwsFtAue7tG7KPMamnFGP00TZ%2BtckTQIdKjMgFCCTPqXWd7vXUrgQSt74yLyU2EPqVT%2F88%2FzGibriixLMHVJHAYj1aqUOkxf91tVkvsSyzCxqqzTqZDdI5gM%2BFdNO4xg0Q95rDbpIkP%2BGwQr9i%2FsRDvXlQVT0YJijq66vkExcsnHOP9cn3ao6mIaMIoDy5WGv%2BC1EzUpawPR5kZcZg60ctpRVixEOvHVUckA2fMz9WwJ6SoOwrBM8gEF8L1YCLOT02wbnevbLq8cn1uIHnmN74vf64HLtehIxbA%2BnGZ2o20JKpTgKkGlBQoZizSKUKxEtTYtqAQ7OsziZI7QWscS5yIoSeXbqpqTCf3J7LBjqkAU2tpcAPc5h2D7ldFnlO%2BCb7XtALJl9xX81ifIBXAE%2F1MXSa6nnBw2HNQ%2BLrsLCFc22QQDqSu7J1rn0EaS2x3TcxHzvRETT7rTgF1Pnv989TPe0yCfwM7KTLGX%2Ffh5gQbRTJZ0EmxGXNbiAF%2FuL9dpJkxo%2BNrvd6DJyuqHX18Rwe68VMg5Q23rc8wlN6sRaY4xrMpsJEfSkWidls6F4PDdYgFVSw&X-Amz-Signature=bf0ce31e17ade59f32f5152a00c8d3bea3011b6d44a8579de4692d88a850b9cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVD7RNI7%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDn5RFSQ3bl2Lui0NEUVe19cAIj8uvs6rTE%2FsuKtwU6BwIgE39kcrr%2FFy666eB7mo82B%2FRb8PITdZLMNxk4sclpq5Uq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDBZr%2BBRP9EVp%2F7B%2BVSrcA0eqPGd64tuqbNRZ8R9zbp1viD1FVHLwQ8RkSCmS2EzgUGiXDjVM7f%2Fk8W84Pi1kNh0fn0rMcP6fwJ9clDCjamUcNA5Jt7UoekFFnf3rTgEjeJRRm%2FRdxLvwWV05Haog1SWIsdDo4JXeOwxHmn6Sc8NeKSn3eY%2BprIRBZKHmRsWA4R%2BO0uqwhRxnD%2FHL37uFa%2B4Dbw84EJi3Ohmjar8t7s6kESWpiWnq2oyTtagvK%2FEPf2aAUbmj7kQwIMf7VPpz4b8gsh69M71sWdUOguGJA4wHdwLFlBtTrr3gQR5ZdOZCqME8Vny%2FJtzk%2Fs9KLzZL1E9oLrCy7eT7robLoNA%2BPaTohnIk7bAzSumSemdBe5xpu3kJVDheonPlTF180Jg4wOmEhn7dTzBCarA54m09Q06%2B9tuW8GITaMsORDHc69zC3i9kU4JGVt0fw3Q%2BPWT91Y6dr98bdapDpmSzMITw2flEPzscZAe7hz9jnNWufMRMXXBRfPIxOeTjTbbjglnfA%2Bspj2vzds70M3aJmoa7WjodsMXjuBSxT4s4Wi6kUeXlInck3HEggxwkR1JHzFCvYGkHqPZJHv3H4VZNvEUPtUvU7kUXyrycJsUo4WJrCWBEHwdqBtBJthVdF6%2F4MNzdnssGOqUBrGX0438DUPMxkalNQpO%2FDU2ZROp2A8rTu2nuUSkBk9RKucyuIaaX0h9wZd0lNRIspVC4co%2F4y1peexSXF7avQhfmmn2obVfTaXDfKUKP0dU3dLB%2BnsVaTNkx81QbyU7jzc5h%2FFaJY2tkpDaeLDnmU4JLJgD2wssME9cqlNo4DIMoiNbynxvwFamWxTQTj91gdxEqxHwchth9v7mzEaGq6U6l3AeE&X-Amz-Signature=a42a5329326c2f799c1b930d884c6e2206409e67166c9db5792065999d40e5fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFC5OHMA%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDwVD4Y21TqhaUQgxqCsKR0X2TD5HkHo9MQaNYDEEzJ2AIgF81o7KwQiPrUC33iohXGy%2Bmjyv8HtRPLMT97nLmRqQIq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDDqedqusSzqWonW%2F5SrcAz8PtJ5Llnd5p%2BgBLRfMGT2VMfBwcEA2rxP2J1mKzLHcn%2F8TMcaZW8yLB2WNTziWwmPPAZWS6VIugrtCpzx4W0vjIXObT0S3U77v4wTj7QTEJJg5GdWy0ZMisjI3jElClaZARfzFR8oy8NUOfQD8wWinqCLp%2BomLX%2Bhi1fnGA5PHYDfuDFh%2BqZZkM7uJHlWhog0qWK5xiudKBN%2B%2FQT%2BbiWZQ2uyPDm7jh2amRfKYs%2FWmE5k1%2FmOhcj1CGoKCAauBuLZFDJIdPdQvXiVQv6aA1Y5HcZrho470c13XKGlOg0Pe3NhkEnMzbV4eniXeRtmy4rpYSqyTKHOQ1G%2B5VfZiHpqGiO29777XEh75%2BPg2gJPnWsbrFWN%2BfvEiR7oRPOdcuZ5u%2BY4PIdktjEsMONcxVHT4TiPCiy5uLOSiMsCzKdDdiB6xtdJumXeRRVfHkqoG%2FMxu5xAjp2jqTbuE4PPzlUd1mdMxAFANuLRHifI4PqCQVSkhths2MgiS4AnmdtGb3d9qIYhEYE9RCPt1mh09pg4dlOTBymz6HccH5JXFRCs1%2BcY%2BtN0aNZL1NJRioDDUgZdrxFM%2BSZExCpN3PQ%2BCK1qXSZpCaWojpBO1bsJWE9sAIGND1Cmw5nusQv39ML3cnssGOqUBA5c5EcQocys4MwfmnHBN%2BcHIx0LLZ7rM%2FLJdkOEAKG4a%2BUtrsxuN41T4aAYTvDJ%2BB0qcw1s4HJ12KAHnPwnwjdW9N3PkKAqDizSCUjqZFcZfWvS81oUkHQPFS5I1VxTfEf04imcAiwgrPat9%2FmC%2FAuGrFm7G8esI1NW%2BaE5MOVoXVo7xyDKOHhZZTqQ9KKADagQvIAJTwOslOIAuQ0yPTazZSV3T&X-Amz-Signature=2cd820ed2522cd036210e8898e1b1faa021b62c2759f7bfa5824882f1c3bf8d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFC5OHMA%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDwVD4Y21TqhaUQgxqCsKR0X2TD5HkHo9MQaNYDEEzJ2AIgF81o7KwQiPrUC33iohXGy%2Bmjyv8HtRPLMT97nLmRqQIq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDDqedqusSzqWonW%2F5SrcAz8PtJ5Llnd5p%2BgBLRfMGT2VMfBwcEA2rxP2J1mKzLHcn%2F8TMcaZW8yLB2WNTziWwmPPAZWS6VIugrtCpzx4W0vjIXObT0S3U77v4wTj7QTEJJg5GdWy0ZMisjI3jElClaZARfzFR8oy8NUOfQD8wWinqCLp%2BomLX%2Bhi1fnGA5PHYDfuDFh%2BqZZkM7uJHlWhog0qWK5xiudKBN%2B%2FQT%2BbiWZQ2uyPDm7jh2amRfKYs%2FWmE5k1%2FmOhcj1CGoKCAauBuLZFDJIdPdQvXiVQv6aA1Y5HcZrho470c13XKGlOg0Pe3NhkEnMzbV4eniXeRtmy4rpYSqyTKHOQ1G%2B5VfZiHpqGiO29777XEh75%2BPg2gJPnWsbrFWN%2BfvEiR7oRPOdcuZ5u%2BY4PIdktjEsMONcxVHT4TiPCiy5uLOSiMsCzKdDdiB6xtdJumXeRRVfHkqoG%2FMxu5xAjp2jqTbuE4PPzlUd1mdMxAFANuLRHifI4PqCQVSkhths2MgiS4AnmdtGb3d9qIYhEYE9RCPt1mh09pg4dlOTBymz6HccH5JXFRCs1%2BcY%2BtN0aNZL1NJRioDDUgZdrxFM%2BSZExCpN3PQ%2BCK1qXSZpCaWojpBO1bsJWE9sAIGND1Cmw5nusQv39ML3cnssGOqUBA5c5EcQocys4MwfmnHBN%2BcHIx0LLZ7rM%2FLJdkOEAKG4a%2BUtrsxuN41T4aAYTvDJ%2BB0qcw1s4HJ12KAHnPwnwjdW9N3PkKAqDizSCUjqZFcZfWvS81oUkHQPFS5I1VxTfEf04imcAiwgrPat9%2FmC%2FAuGrFm7G8esI1NW%2BaE5MOVoXVo7xyDKOHhZZTqQ9KKADagQvIAJTwOslOIAuQ0yPTazZSV3T&X-Amz-Signature=006516e38bfaf86e7d5e6a34ac8a393d11125c273c8609c3d4fa5422137e42d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YAGZYPWI%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIBEd9wdve2k8iS46sIOJDKX4HECW%2F51KFDOS1T3DjsEVAiEA7Mm9OCtc2Lzjfjuua0t9snhhBgxzooMV40NVMUdLJTkq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDGZbwu3Ei0faIDNyJSrcAxGIiql53vj0DFMRqvBBcY1X85w6%2BfEyKMHFb8bZfkzFPRpoZxcTP1eSs%2BCqoLtQJYaLqmWrAZqw6SJgAEsWApv88QmYcERlxdwcdTrOLbP45zTizKkpNo4Vh1F4gaFR28P930d5ZG307uswVOs51Yks%2F21i5H0jCmnyVx%2BLgNhFngNPN2Et1KXaT6jMMz3%2Fb50xeywTorBe%2BfbmEnWvb0cOyLWYO00tCq5Zq68Ay5Fr6%2BqaWtnAbpiC3BOsY%2FV7VG%2FM8FGiJP94KlLi8Mpc9snZhNVOdnxHKRaT6H46Fm9PuRResSMEGLoLcn15NWbr12VFPYqKceiASTP2uhNf%2BFaykH8kBogypZQ%2BVr5%2Bin5GHVBJ9wAk8DahyvmujOPVZcxhMphHGPwDbJI7qglbE3iH7NU7u4gkTd836CQ0gqe9Sj0FeT%2BxoWZRawoC33xhCZRR12jTUhwkUzd03jXLUi9OpAlYXZ8aIgMsAj5916mwZzoNsgbPciZ%2B2CaNbbm2sP7Vg%2FGLpiQuGpC6Gx4TIlRFOmiTR3tMJJfnRlMFQ4We7vptFn8E0cLSs5FOGq0YlL6GRusxnvS1d2TbiDfnFa1nccx3qGiOgCyohYxuxsod%2BFBrIvNshS7%2FjNE0MKjdnssGOqUBiS3hi9mJKiTnHrmVibh7ucab48cGev0SU9tSQ1kMF%2FwZ18OVJ8wQQmFLPkR3rg%2FYlMEXrlIo5ab1u11kcFUXh6TK3%2Bdz70LXWf9zMYPJwA0AV0kEmaVagzCuXVfSgsZr39Gyyd5YIZlIPLX6NXN6SV1eMcYlf96UzOR7etZ3NX%2FbKZCIdgQHOA5lSv7lvnmRN0O%2BsRQOgv6YJjvQPdegT8ErFiaM&X-Amz-Signature=0499b6ee60bd230000cb338ca5f58365cc8529e67a8e7b6647db681f939f278d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Q2ESMQJ%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQCCQkYo6PkHilGXd3AT%2B9Bo40HaAK4MhFWEBg%2BN%2B3LxkwIhAPPf5L%2B9HdjoVgeRBUDw1CLoE6sCMNhNb4OgS6Sg61URKv8DCCAQABoMNjM3NDIzMTgzODA1IgyKWoSgtteNBOn%2BFtcq3APISC8Oie2lJNUIZOBrYrXE9HLNYXLmPM4vYNnI83ENHvtLleJgpwZkkFtgBanXFsGxLQ5rcZTg9axbMqSQ3WlOnR%2F0mvQ5G4zQVeizgiFAXjNyI1EqxhiVVqWEBShTFQzgcYLiV1Luz9v7uHkKur9JsvRCzwuhBX22sGiSQWqZxNy6tm3CjPSllSjevIgHSsf2dY2h9bancUhFulyIhWDjeRtITj5%2B9mFWXEf6gowY2%2FUHQ%2Bd7FT3ys%2FAWmWn40uPm2efPv9t%2Bklo%2BNxocsc5i8aod2Zls1ujg3sodbRHAiRVX%2BkK%2BIuYCq%2FGwT2BHZ%2B6Z%2FE28ZzCzbH7Ah123nQaOiuY1TsZjmhKijHUe8HMQ9KUno41T%2FqDlHcyhBk4CWkdB01MjOdHKkAj9ucOFjw%2Fa8GNcqoOToen0C024entwlQ2U4DN1e7SDMLYoVkk%2FmmTkrMknUGp%2BzZ%2Fkz42EcNhnnggBGIkdvp3CwkHiS4X4mW%2Fg%2BfWp2qY4ilv3xK%2BsiybaF38e8iTYHNQA%2FfEM8wPiPZnXLO6R0LJeSQ06H%2FpkEvEkuBN%2FMg6ny1jE4h4dDt%2BlQniKlFv6MkVtrWegX3QH7rUNrcHRvVKcCTn7Ti0xVtU1O4I4oHDUcaNwQTDG3J7LBjqkAfLXIYBcDl4LlPC2RGHqvw2XvwkgeQ7ioVAso1bBT43T01WZVWjIHJsIFxAFAaGkZOujGlEwQ9hezK4PGRHptElB0tNeAmMXceu1ujpT04pRIGVhsOCsJylj4zZ7UycX6GX07TR8aqtQGFwWSCMqokm%2FgiL8WL1hUZc7rJqJdJP7DSfuu0w6f9SBIjzLHiIMLk6IgKajxbnw8VQB6LFVfNjR8fiD&X-Amz-Signature=166e4b6553269ba4948cf684676796f0320fc3933b2c34b737aa9ab8d5db2725&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YWGAE5I%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQCkI6SOmIrS8poY3cb4TffUMiF%2BpjjWKacWgJJzRSj7%2BwIgb%2BK%2F%2FsSROgs%2Fyehapz2fVGn9w42rnC3pL%2F3H10Ac2mYq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDELNTRlFaqF3vpnkFSrcA1qSVb8%2F9l%2BmE0YT3ctvhU%2BvyTHcfHrs06hSTJJ7pc5%2B5MRg897fWUeUcKzOLLeITv8Rnz9xzyJxocBL%2B7i0Q6eUK9fE8W0eFE%2BnhNwJpOFnuzpF5BaMnhbN2KYeghxLkFzUKKuHh6XadYgqCX6smc2o2IwuaawTImmHendo7kqzCuSiksRWzipl%2BCSJbokal2qBCmErPkTDq8gVRSB0Voo7aL%2BZYy6jch4ucYYvJB6V3uhUDFjBIMR5N1bfRjDdpfiSWNZ%2Fd%2FMjOgmASwmLq3%2BHZLBktdsDZgJzxGkquPQZxMaQu7EtSj93Clc0lS6LWPua%2BRUzDSGY7VpPFXKePLA0initBALtgF%2BsWNsjOA%2BbpcfeFw2Y0otCQMMo14KvtIZi9Z4IJd8fboeFVOCF%2Bfs1%2FJYaeTA69T83ZioODC2PDIA15DhXXovRmqfmZnW0NhpsGMxH59pNO5I0fEFYUInA3XsrDQIKW5d9GxToKXbVktq9Soq7RMwmcGAmRX6WPWEBumqoB3Qsf4weJ7c2o9P26vhcZ1mewisGVvdhkABvwlOUJNUmpowdgp6yIapkCr%2F0R2O5t2GVxFGYY8Mywsfgw86U1jf68F6Zi%2FjqDCNUISmIZQ307unLHL5PMJHenssGOqUBMelM0xG9H%2FCRVrU0KkxWXDfIsdl0VwTuB54km9LD7dQsMpRIpg0bi%2Fr21WDACHoQkx%2FfwstFSphDfV1Ki71m8v3jbY9RjKIpII4dSwc0eRKkzajX7tOW7eNJeZl8ylS4q%2Ff%2BI8n1Y0pOBtj1Row7AGPwpObpixRUQ6hykp%2FRP4MpLxa4t%2BPv0y%2B0FAITMqhCfPwHM1vWP0DnQTpbd6ItHsuagTQ2&X-Amz-Signature=f611ba17e70bbc05f7160b0c8494ec391f11cab0b9fed6aa234539d0fba73673&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4IFSV3P%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCICiR0tvrtJq1fs2Y72jd0lQsUlsOhjZbHrKLsN4rjAdhAiAD%2FEhk6BnE1%2BzaakQowJsZaReBYmWYhL810REr3TXxRyr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMqHA5YPNII9wfIyTYKtwDgS6IBW1G6REo4Yu6yfC1qAOjXkSL5BZORlQo6KZNDQCsS0y3nzDcx52dVbiPl5OfjVWwAxSTuJIYUQPYVTn1MAGlJuCQ5U9xmttgIn4UK3NQcUfIJusMbECajdByWyX2hSN15DxUslRMjYGwAG1K9rYiA%2FhjnQP4HLzynjDuRXHPaKd%2FFDX%2FY8gOSU0X2RI8vzxcKtrBEMD5nGKGfDbOqtKKO263DDFeqx3sRamNem1R0VQGyTh%2FyvWPx42CPckqMElwOzy%2BVh0%2BzKS48NX3OkTub3vcfp3VuiWrO%2BRWSUxD1v1heYyWGLoEmsmZD1zDs2nGurPe%2FJboYUr1%2B%2Bhwuxod0AtmQn84y5VWcsFiBu8sk2uoOQrp5eRvzEkIs7iHNB9lakFXs%2FcaKF%2FkI5AKur%2FOl5Yk5F4orOUNXOgBzBvdGwJNwo%2FKDm6Vp%2FTxDYM1U2tidIxgd4ZWYlbW9XIrnc%2FtmSzLWICRHEI82aFx1CKbNgy8%2FriY6UsyjLIdqPuPUWzHTQ5SugkWB9W9v9bZZOLTLbmqTiXqdI23XLersmNIBCr%2BovlVYCRSk3wkg9CGYUi7qQK0qREN%2F%2FzNLAlmHg9ecry2mYHB7hBTI0HHXC51lFR7cxcjoUFHPr4wyNyeywY6pgG4C8BuwAN3LX9SyKi%2F%2FnXNDsFr1LpjGlIU3LiSgJcHxuzIDqRDlxdjpEJltg0y%2B5X%2F2Gia8K%2BuMBgOxHUK3MJhYubDZN5m434ZbE1gexRNk2WfHRjpfiOr4Kdzv8f6npqacdTao6MtpfUEHCg%2Fl%2BAusjrMwGFpmOMAIabKn%2FhAU2uAzWEiL9G8ZRo0WvkDXdsoVHwyhddwZ%2F5PFLWTSrZGga1IqjDQ&X-Amz-Signature=2d253146f14a941ca9db8a626fc21870b6a7efe7fba34a6d4dba8753ab365951&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4IFSV3P%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCICiR0tvrtJq1fs2Y72jd0lQsUlsOhjZbHrKLsN4rjAdhAiAD%2FEhk6BnE1%2BzaakQowJsZaReBYmWYhL810REr3TXxRyr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMqHA5YPNII9wfIyTYKtwDgS6IBW1G6REo4Yu6yfC1qAOjXkSL5BZORlQo6KZNDQCsS0y3nzDcx52dVbiPl5OfjVWwAxSTuJIYUQPYVTn1MAGlJuCQ5U9xmttgIn4UK3NQcUfIJusMbECajdByWyX2hSN15DxUslRMjYGwAG1K9rYiA%2FhjnQP4HLzynjDuRXHPaKd%2FFDX%2FY8gOSU0X2RI8vzxcKtrBEMD5nGKGfDbOqtKKO263DDFeqx3sRamNem1R0VQGyTh%2FyvWPx42CPckqMElwOzy%2BVh0%2BzKS48NX3OkTub3vcfp3VuiWrO%2BRWSUxD1v1heYyWGLoEmsmZD1zDs2nGurPe%2FJboYUr1%2B%2Bhwuxod0AtmQn84y5VWcsFiBu8sk2uoOQrp5eRvzEkIs7iHNB9lakFXs%2FcaKF%2FkI5AKur%2FOl5Yk5F4orOUNXOgBzBvdGwJNwo%2FKDm6Vp%2FTxDYM1U2tidIxgd4ZWYlbW9XIrnc%2FtmSzLWICRHEI82aFx1CKbNgy8%2FriY6UsyjLIdqPuPUWzHTQ5SugkWB9W9v9bZZOLTLbmqTiXqdI23XLersmNIBCr%2BovlVYCRSk3wkg9CGYUi7qQK0qREN%2F%2FzNLAlmHg9ecry2mYHB7hBTI0HHXC51lFR7cxcjoUFHPr4wyNyeywY6pgG4C8BuwAN3LX9SyKi%2F%2FnXNDsFr1LpjGlIU3LiSgJcHxuzIDqRDlxdjpEJltg0y%2B5X%2F2Gia8K%2BuMBgOxHUK3MJhYubDZN5m434ZbE1gexRNk2WfHRjpfiOr4Kdzv8f6npqacdTao6MtpfUEHCg%2Fl%2BAusjrMwGFpmOMAIabKn%2FhAU2uAzWEiL9G8ZRo0WvkDXdsoVHwyhddwZ%2F5PFLWTSrZGga1IqjDQ&X-Amz-Signature=59831512e662f733225082a5259062f53494089afc60a9cd825992b25f04bd08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4TMHC7M%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDOONglc6y%2Ba9vsSp4Wr8lecKcO8eOhDTpIv4wqQguM4gIgV3xglzjEF8epLW7VzQOf9Lu1OUD83OpDP8smEz4pp2oq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDASUporrVSsFA2FmsCrcAzBelMTYPrPoRy5flAzd2WQPY1NDEdDQmqSz1cS0wvkoi2qjNjvNn4G6f4uDElEDnH1DTbOu%2Br%2BQpZTWwRSfWE%2B%2FuWsi8t6VoCALP4LesAEt3N83byd%2BZ0mEBJDzbY7pCHzeRYT1w9EmQHpg14OcJo9A9iqZ96qkUyDUs%2BROJGECdSjgUDhgC3oOOE%2FShOdAR24QLGB4UYPcuzIF1zoQXlYzwF1%2Fi%2BBsanUskx6whY1drYkWU75ppsbJ%2FxBj0ibGAiE3GLJO%2B%2B0xrLtpvxv8mE1nCOjMOIhhlMqcnPNmUQhboQvFNZPJTWiBwaESvBIBBRnKJjZ0DzGrbIfYEkQdF3ybi%2By6w89C%2FMX5%2FPBq7Hb8l%2F%2BWF3ARXrEZnwg5Zf8S5X54uad52Doxpv%2BfkdEju4EkBxXshIQufc0ODCHIeJaGGmz48phE5cX0UQ5HDSDPVOLkKggAvSG7Ugi%2FnS1%2FIGKUPuQPTwmoXAdtxjXmdotFc6HX1iSqVmjxa9zEqRpIvo%2BAzpMc1D46bVSS%2FwSLv6GRpv5znw9AIW4tdAiQgTCV0rYa8TPsJax%2F9JNLlNjFw%2FMFIeytfneWuEtgtc09NxvLCHZ8z3onNyjnl6lyMfuARdb7NLpZyfTzeLyCMLrdnssGOqUB8g0f5ITNZruOQWAteCI1S%2Bo3U8VY4FbckhUhWK6wgS5dzeDzDSEOMXLfSkw%2FnBGCZvBt5pnM%2FhWgVPosBfTggzg8uj%2FzI0fqAiYm4BxsOMQ5obYiRT3oZADbhZaXX%2BNRLyKXOlTqyFW2zpZY5JZJJxp2pB6MZ7geF1btWbN8bM4ANKRnbsZpI43a1u0e3kLTqUfxEkSGpyCrIf7lzNledfo9%2BLCF&X-Amz-Signature=242ad02cd4d71a9915753b637bd6c482a671f1c59c1a77c6c1b7bbed2af66ace&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAG6QDSN%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIB7xKmTxxz3x1W1limJN9Te9JBAurSVm1eyd4wBwP4D%2BAiEAzTqnRIXh5m%2B4HBPuis0w03qoeSKbsHu6Fd8bcSd1stIq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDNMVx733fv1qjxkcsyrcAyCTxyRsZB6fulsmpWafdzXshOSulltpkmNyhT2o%2FWIV2L9BHukPMctcqVzAQdyAjqGZ9rHgJimABS9kLF59sgN6jH4bnf4eZKJgf%2FrS1dbRz7lbfH9D3A2TZ6WeSbB8yH%2BwgAoxL3hKOfHph19pI%2Bw9%2BLxf5W8jN1XWUyFkDSphYAVqGIuERLHtRT%2Boo5wuOxyhIbU3NzpVEcwfUdio4gcjNmfW0tJR8cGuypkQqW56x%2BgqjxF9sfi29IIhWYlA%2BnXfoGFiymzBMrl1Y83gNMkjozO1I0hPM7uP6nioaG1Ftb7C5gxbDJyD2rhbNoORyneEYcXzJsVjfSdD7HXG2kJaYhi4qmu1Z1IrWEmYc88ejSrXm%2BmDBFnNp1kqoMV0RO38UsbK2HQf0rSSrWiXZ3AZ2bcNARSWPFK%2FCDMVZtCZ%2BGhA9KxBFnfc4BKMKfYvoklN3MtbIfuf9HeU6w7vL%2BTwuwJnpbW2r%2B485OSu%2FvjH6NtmR1lczoNcu1XyZeE7lylwye9i885swwdEqRgv%2BflKG2T0T%2FueBpd3C0xG5a2xL0XTfLcq34PfVlNhDU4vPkRzYmfyIECr9MclB2cK8Nufu5%2F0NqfoQ8c3UdHZdX1djamm%2Bu2fbZGIOQpNMKzdnssGOqUB%2FJv780voMhTes0rBpwqPoda%2F0iwUrlA4xR5RAmeBFlvzH97b9ngVqGj0rsidMF7sNCm1qjfTCJEnKWwpTst0zBSCH%2FSpFcFq%2F4H6DttvN4eFfDKrorNoEIys%2BYTy2MWY1lhQHlMrTDMQXwDkDTi5OjG6esJqE3tfyCFF7MEl9h%2B9xlOgWYLfM%2FBKfzylp7Jz7j4Jx7tuhnrbPXs4NXDhDSor%2FFW8&X-Amz-Signature=3d7a9be9d149c02b719357cfd3447321e437d0353ad38c87dd8b87719f7bffeb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAG6QDSN%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIB7xKmTxxz3x1W1limJN9Te9JBAurSVm1eyd4wBwP4D%2BAiEAzTqnRIXh5m%2B4HBPuis0w03qoeSKbsHu6Fd8bcSd1stIq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDNMVx733fv1qjxkcsyrcAyCTxyRsZB6fulsmpWafdzXshOSulltpkmNyhT2o%2FWIV2L9BHukPMctcqVzAQdyAjqGZ9rHgJimABS9kLF59sgN6jH4bnf4eZKJgf%2FrS1dbRz7lbfH9D3A2TZ6WeSbB8yH%2BwgAoxL3hKOfHph19pI%2Bw9%2BLxf5W8jN1XWUyFkDSphYAVqGIuERLHtRT%2Boo5wuOxyhIbU3NzpVEcwfUdio4gcjNmfW0tJR8cGuypkQqW56x%2BgqjxF9sfi29IIhWYlA%2BnXfoGFiymzBMrl1Y83gNMkjozO1I0hPM7uP6nioaG1Ftb7C5gxbDJyD2rhbNoORyneEYcXzJsVjfSdD7HXG2kJaYhi4qmu1Z1IrWEmYc88ejSrXm%2BmDBFnNp1kqoMV0RO38UsbK2HQf0rSSrWiXZ3AZ2bcNARSWPFK%2FCDMVZtCZ%2BGhA9KxBFnfc4BKMKfYvoklN3MtbIfuf9HeU6w7vL%2BTwuwJnpbW2r%2B485OSu%2FvjH6NtmR1lczoNcu1XyZeE7lylwye9i885swwdEqRgv%2BflKG2T0T%2FueBpd3C0xG5a2xL0XTfLcq34PfVlNhDU4vPkRzYmfyIECr9MclB2cK8Nufu5%2F0NqfoQ8c3UdHZdX1djamm%2Bu2fbZGIOQpNMKzdnssGOqUB%2FJv780voMhTes0rBpwqPoda%2F0iwUrlA4xR5RAmeBFlvzH97b9ngVqGj0rsidMF7sNCm1qjfTCJEnKWwpTst0zBSCH%2FSpFcFq%2F4H6DttvN4eFfDKrorNoEIys%2BYTy2MWY1lhQHlMrTDMQXwDkDTi5OjG6esJqE3tfyCFF7MEl9h%2B9xlOgWYLfM%2FBKfzylp7Jz7j4Jx7tuhnrbPXs4NXDhDSor%2FFW8&X-Amz-Signature=3d7a9be9d149c02b719357cfd3447321e437d0353ad38c87dd8b87719f7bffeb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RQ2SUQ5%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T151404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQDAFQBYCowbPJWvucz7JPB0qYd0KGGcsc%2FCtjWrJ41HYQIhAPiU9hWZe7xKWtPByu6SlWGevCGqL2Fopcmp7NBVS%2FZLKv8DCCAQABoMNjM3NDIzMTgzODA1Igyp5UQpxpvYZv3TmM4q3AOChb4LjWbZVUnZg6di6UuriheY5pMSUfgcant%2Bak7nhXfLgZMFXcc4%2FF8lQrO40rmaCRnCbf%2FppQtEbwmpS4YK9yJAWHws63Q9E6r8xmvGcVBZnl60J1NWIGoyXHtVK3RbsgW1NIR29HJGfg1IORKA8%2BPepAd%2BUx7KHDWstuFsBZbHFt5aDiyA8oA3Tbapi4OqirWfkHNkewIX0j6FjiZloGyc5dQAybSY4ao1h2cHFV8f0AO9330%2FRPeTr8S4FDMwb4SmMaU4%2B%2BNCDpslE0m%2BscaSuB5L0ij6v5LSwb8pX2pxL1E4g0o5J45AZWkJiIfmtVuyvoTK6TTojLDWBtpaEFjvNIVcoTT%2BlAKJhE1LMbIUJncUuxGOyUemRXqUhbRlTc7vBb1dmS5Lf%2FOmM6onTq4Ci0Nji0%2BlArj%2FsMOE4AFu76hOo5ZnEuFMwNp4x%2FuxCc9nxt1bjdrpoJBih2BHqKN%2FMNz5CNCPLtGtnOUV0BdOArIEQdte64OOm9pDDi6e%2Fo9aIniTCrarUnVNWzsSMIfTtcRaGEOvR8vS66CSmG6624HmISh2Va2JEaKTbHLs9a4y9mA2qSBcNjWKRFdFPVxx%2BWhKJ9%2BwWB3cadbJeSLhTn8mKmSrzgWJsTDk3Z7LBjqkAQlujJP7GJ%2BHR%2FEvtxGslGo7s9cn6rpmAn%2FttxD0F3GPaJzALxlVGNX%2BhhTCKeM6cXTBfXUiv%2Bw%2FsELRhUnJGs9g6BSCNYwqOQag9N9obDkn8w5NUuT6x%2BVZrmEBAXRsxN8TAepHp2mkONBW5v3qV1kP5P75jkRZ1JnzOIzMhjIC0nLDChGtCVDlfrJ7foe%2Bdyn8MMM6Nbmigf7dAdhP32jpq0Gl&X-Amz-Signature=e1c67e417803ebd73d93f9073cad8b8ae566c2ff16f53efef8e9e3ecccb03fac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

