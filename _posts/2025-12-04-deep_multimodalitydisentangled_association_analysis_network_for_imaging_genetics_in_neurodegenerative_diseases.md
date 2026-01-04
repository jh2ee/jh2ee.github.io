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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SKE36FZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDgb%2BZpJMmhWoMsaNaMLMnYJrsrFjMzRN086mK13YG3VgIgOBTeP0qhc%2BKsTFt1vDdvoXHbVr1FssW%2B8XY4G27Uk%2Fwq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDE0jeAYCAPK2jEgtNircA0gJIYqlfGtS2W4SvyAwPk05pTMg2A3Fsd4LXIedrdCe3QBWa7MDaWjRUSrMm00tzQRThIOdrtU3LeHAcKLzlxoFE3YAIEcP0IQqWKoqcWw3OHQwad4ajZpNCjWq%2Bs3KufQXKiYeLmjeIDjbbbCMi85Qxou0cuGsNk%2FRokYcMY8XqNHi8qZ0WeAm3w3JvnEmB4tQ4VAzGbTrgT8Tx7j6VGeMMIpDqhMrP5s%2FEIjyhMQ3I%2F%2FrIDr3fSoEER2OlIIGWpkPXSFWJa0FiKndFo%2FGG9lXUQOBiq7xtSpH7VnVqvv0Tu%2Fgiy5BpLN9rmr75FLZwX7X%2F6IodAWU5TDg4Xvi5NeVACHt4lz7qKQP38MrE%2BSzbkgs3xljeARSc%2BJFZpHwI72Wfb37AcSohArKXAfCVNbszc%2F54BXWQSGoYLTK5OG6BWfVdC3mFhXnTIYoS8xulIyO%2BWhlKgT4jyDg%2FcEOTQnG15Ijgt7M7i8g8l43gxAg7j%2BC1oh4nEsYzeaGE%2FSsDU1cXCcy8Iwp%2BB364QLWIwqLSdTQPvxXoh0aWn6x9pjuKGMJUBf73a8zdQSDjWnTE%2FINs3Y2nafkQ9NNbqmOq6uj2DtS731GEwD%2BKmjeD3L9xhTJ9lcG0SkBxURMMKKI68oGOqUBeAeLqoEgUHfJJPQfE0EUHmJSuKjweFilnDN1YP5xoXq0uDxXW6K82xd0IC0SE3Zu0Fe0ypSFK5QXJwsuzBekurwJZIe%2F5n7vPG3%2Fg3zc7dtE9Kknhen3T1%2Bvwdfte3bTdJmF9qqUWYGKtfPr2gA8eRdmeB0qcfnzk8JQciC5BunNVD1sj3a3VyPIDXY7Y2mktLIFZUcjS%2FLODxRMVzdX3LqLjuk7&X-Amz-Signature=afaa236454cb4b7a7885393e7317925286fa38cbbc3c05faaa29bdbe7831d8a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SKE36FZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDgb%2BZpJMmhWoMsaNaMLMnYJrsrFjMzRN086mK13YG3VgIgOBTeP0qhc%2BKsTFt1vDdvoXHbVr1FssW%2B8XY4G27Uk%2Fwq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDE0jeAYCAPK2jEgtNircA0gJIYqlfGtS2W4SvyAwPk05pTMg2A3Fsd4LXIedrdCe3QBWa7MDaWjRUSrMm00tzQRThIOdrtU3LeHAcKLzlxoFE3YAIEcP0IQqWKoqcWw3OHQwad4ajZpNCjWq%2Bs3KufQXKiYeLmjeIDjbbbCMi85Qxou0cuGsNk%2FRokYcMY8XqNHi8qZ0WeAm3w3JvnEmB4tQ4VAzGbTrgT8Tx7j6VGeMMIpDqhMrP5s%2FEIjyhMQ3I%2F%2FrIDr3fSoEER2OlIIGWpkPXSFWJa0FiKndFo%2FGG9lXUQOBiq7xtSpH7VnVqvv0Tu%2Fgiy5BpLN9rmr75FLZwX7X%2F6IodAWU5TDg4Xvi5NeVACHt4lz7qKQP38MrE%2BSzbkgs3xljeARSc%2BJFZpHwI72Wfb37AcSohArKXAfCVNbszc%2F54BXWQSGoYLTK5OG6BWfVdC3mFhXnTIYoS8xulIyO%2BWhlKgT4jyDg%2FcEOTQnG15Ijgt7M7i8g8l43gxAg7j%2BC1oh4nEsYzeaGE%2FSsDU1cXCcy8Iwp%2BB364QLWIwqLSdTQPvxXoh0aWn6x9pjuKGMJUBf73a8zdQSDjWnTE%2FINs3Y2nafkQ9NNbqmOq6uj2DtS731GEwD%2BKmjeD3L9xhTJ9lcG0SkBxURMMKKI68oGOqUBeAeLqoEgUHfJJPQfE0EUHmJSuKjweFilnDN1YP5xoXq0uDxXW6K82xd0IC0SE3Zu0Fe0ypSFK5QXJwsuzBekurwJZIe%2F5n7vPG3%2Fg3zc7dtE9Kknhen3T1%2Bvwdfte3bTdJmF9qqUWYGKtfPr2gA8eRdmeB0qcfnzk8JQciC5BunNVD1sj3a3VyPIDXY7Y2mktLIFZUcjS%2FLODxRMVzdX3LqLjuk7&X-Amz-Signature=afaa236454cb4b7a7885393e7317925286fa38cbbc3c05faaa29bdbe7831d8a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SM52Y3UX%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDzRujWzpNhAG0Bdf%2B5Xr0V1sDK9Opitxzk4KXrns6sywIhAImr2UUSybOVPNmfjIP3s%2FuxBU4Obk9qtXWoUEEy%2FHsrKv8DCDYQABoMNjM3NDIzMTgzODA1Igza9OOe2%2FkbGL39Oawq3AMsMfZnmRqt24SWy4YJICIEBbuz4HK8UBZ8augw7nY78GlGgCcYA7yw7xC4dyYu29aqK%2Fu7LL4Y7JKr47sNHFRcWk7W1%2BGwjyCTAldfcQFBWR2CRSbeSlyAYpdQsQqzcykao9PFmQbluB05uh1rQ%2BPWM4WwDY1eLftX9w5FNom8KzotKPDj2lQl1nQXyEC4A6ahLiAgYi167TsLmTdrEBnaCN9xt%2F3ARGgyy0CRs%2BGrz7hJssLRXd3S5R40BIXYcELl1a3eyc32%2BnfNZwUhmNYZa5fpOSc71QQppEfJ9Xhg%2FEpaWEQylel6T5RnkzdVQotJJ3m2%2B9SVpu7gowe%2Bu7N6j7SYw6LpV%2BbHe%2BDLWPaz5uaYEY8o9vizfrxR9w6GsMBw%2B0MTFvh39DHeGae7xf7ubcVt3piwH9nnykbnFoUtrKuU5EiaXfPlgOKH9MyVN5997qYh77J%2BEQiTYaU%2BANwxVOCOaWrUox5g5Fwc6zBRK0Itl0k3t68O3WZ6Q%2FAvKVUJl9BvXby0WGvN%2BRsvVYdADxHo9jJQdrKtF2cP7mCuciWy3I%2BWhHUXCwvFsBdC1O%2BmcEQwYqQkA6v084I%2BjjvCHSagbbu49B8D%2F0IwjGpyCpXN9HTkGS27jRqokTDDmevKBjqkAbgVLGx%2F2p5f%2Bi25oNkBs4n3C6dMeFUDPggZSmvgC%2F9xAiqoKwMp4trvosxBDQ3dFNjBcDELO8Nul%2Fki5yWE7yVI2xQoAf2qiK7dJcKA9fopG1xEEc2t2rscFVjC7MGbayx%2BSqBLu7Krw4aj%2FUw59q6onhf9nKrq%2BVEKNWlPlh8ns%2BIeDzEZLYZu%2BZyBZKtakm4sxxdAf5uQ%2FMoGy1MLFZbx8wWB&X-Amz-Signature=f125d5e2e25904729c6ac9de3c546f3790071468f3fbcf8662d32fb3705b43c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJZOWK5Y%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQD6L5r1pP6t8kYAfQab0HoHhQk342GzaYgkSxhnorHGUAIgBKKT9IBF8uvZXUQAAv4g0Zz4tFzOeapyUoSDhrzmGBwq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDG%2Fc54QNE85aQJ57OircA2jFyE8cIVOegU%2BAGyeU4mQUpw5Ya2zdFTznI5RwkWzpymv4PFn1meArcbZZlxjjRx0G65TNiUphgTrJYNVvO97I5T5Q7dA3VgZWRMMtf%2FUu0MFHQpXIRSlTLAxK4vjUhTQuRZUB3B4pYEikwUZuFPehbfdNnGXt05hN%2BOnkAkJg9ZbVfLe0jmKGqMxuLOr4QDM%2FxpOiea%2B2eQpedepbTgWJNikDJnNTYbxaQmPbhED5Sp76gtilWLbIcpENOjUAIIjB5bXOtG9naRRSSdgr6sNcuwOmuQTM0xqBx9p9HhnQ2Jfp8j%2FxVfqTMyetQU4l0e4%2B5Wer98u2ShMMyFV2APGqHTYktRRMZKpuAoz3I1wI3I5oC7e1u7lG%2FpxchknWHoYYjO5B9OUbsUyPI1LdyXvPMDYhIEY2BtVjHwKvKijGbnLK7AUuQpplV%2FQ9oYQ95s18raLPOvuXzLQcFIWoYX%2Fq95I6K%2BJv7pGNuEpjlRYh75%2B3NuAlxbVyLzGwKYZg5Io7D%2FMxV72VqLSMTi%2BBmsgBBhxoQdwIo5ljC7drRAHRfOAUFgyZ%2F6JexOfuHlSmUfDfCJvky1odJWDMAPxK72t%2FAawfB%2FqCn0NiCNJQGuFUQgdWvcKW1lrMoxKnMLSO68oGOqUB%2F7JxtHp6Fb8vGgwCNEpIHGMTQivH4tHAFfJoAduturNWIKXMz2qczIoZrCzUml35plMoKdZKjBhUEt8Le9YZ391M7hbeDCmX7Ekd1KcvT4gBMGopxa1ENaaYoyoNutvrnRnO5Pa%2FJzWnlmKjfIOYLK9BE3JhiwOJRNWOhy7u16yhq0M3XI4UTVaAkgD2d8xUj4cRLM86x%2BbzYczsoC1%2FYcaKkMC1&X-Amz-Signature=865968f3bfa5c8e545871281d34fffb6719f0300eec3cf89f7aeb3de124cf62e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJZOWK5Y%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQD6L5r1pP6t8kYAfQab0HoHhQk342GzaYgkSxhnorHGUAIgBKKT9IBF8uvZXUQAAv4g0Zz4tFzOeapyUoSDhrzmGBwq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDG%2Fc54QNE85aQJ57OircA2jFyE8cIVOegU%2BAGyeU4mQUpw5Ya2zdFTznI5RwkWzpymv4PFn1meArcbZZlxjjRx0G65TNiUphgTrJYNVvO97I5T5Q7dA3VgZWRMMtf%2FUu0MFHQpXIRSlTLAxK4vjUhTQuRZUB3B4pYEikwUZuFPehbfdNnGXt05hN%2BOnkAkJg9ZbVfLe0jmKGqMxuLOr4QDM%2FxpOiea%2B2eQpedepbTgWJNikDJnNTYbxaQmPbhED5Sp76gtilWLbIcpENOjUAIIjB5bXOtG9naRRSSdgr6sNcuwOmuQTM0xqBx9p9HhnQ2Jfp8j%2FxVfqTMyetQU4l0e4%2B5Wer98u2ShMMyFV2APGqHTYktRRMZKpuAoz3I1wI3I5oC7e1u7lG%2FpxchknWHoYYjO5B9OUbsUyPI1LdyXvPMDYhIEY2BtVjHwKvKijGbnLK7AUuQpplV%2FQ9oYQ95s18raLPOvuXzLQcFIWoYX%2Fq95I6K%2BJv7pGNuEpjlRYh75%2B3NuAlxbVyLzGwKYZg5Io7D%2FMxV72VqLSMTi%2BBmsgBBhxoQdwIo5ljC7drRAHRfOAUFgyZ%2F6JexOfuHlSmUfDfCJvky1odJWDMAPxK72t%2FAawfB%2FqCn0NiCNJQGuFUQgdWvcKW1lrMoxKnMLSO68oGOqUB%2F7JxtHp6Fb8vGgwCNEpIHGMTQivH4tHAFfJoAduturNWIKXMz2qczIoZrCzUml35plMoKdZKjBhUEt8Le9YZ391M7hbeDCmX7Ekd1KcvT4gBMGopxa1ENaaYoyoNutvrnRnO5Pa%2FJzWnlmKjfIOYLK9BE3JhiwOJRNWOhy7u16yhq0M3XI4UTVaAkgD2d8xUj4cRLM86x%2BbzYczsoC1%2FYcaKkMC1&X-Amz-Signature=78e2b608e723440228f71f512c64c4283253fab04ed22d67323a9747918d772c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657P24VVO%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCb3sudfq4HE418zqPAfi6RpxpBkw%2BLonNtmhjgrsusBgIgU9jC20%2BOBdMuwNmxFCwAQH7vWB4mBMRwOwOvqqDlP9gq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDCxgYo2HWKoqS0tPrircA50G1mSLObzC9%2FKxG3B%2F3rzcHpHWGemEN3W%2FycEgUa%2FGUO6trErm3UJH2eTDBtRil7A5PEHim2gfjY0gJDqiVswv1CzwPXYjPt2pfusMyOMD2cZqx%2B2vdmCymd13De2ymNjUnn6kCF2ssfnrHRCvWETYzyKKNGVLmN50mky%2FpgJt0QxQXyFoBmaeBWguerdTTYG98EFT4DrxBrycvZV%2Foei1ILInPvDaZpryMYlcKNhrfpxAoPKOy2mArzBK3hkcoCNf%2FZLSSe6%2Bu604WKeAaUqXECtum1MfTgVmp3MhmjQjs5CEAe4B5dyFvZUSjwmDslWKF0WncEpp17kpLcr4bBpBaLLr%2BPrS591b4XG25yZ%2FAzUP02m7qKYWFBTp4d0HNLaysyX0blwW97OPTXYCms9kMPigF6h7y0uO3M7CdtJHd6b0DhWWG5aXjm7MMGy9rdiUSorE0kxHqKDtOrr%2B3h%2BTtR%2FQLfrWGGg29s0R0Mt718TBIDnIzoemfR6I5dStelu02TGDRnx8KjM8qraiCGcW9kLsyT67nnkVQrUJdLt3W%2FLy7k8AaHFOWRQZMBlhjRVvqIm5zbNzIaw9wXUfLTeKtna3Vzs9qYg%2Fule4L0XUBSC2Ea31V6nvHvHhMION68oGOqUBovljtyISP1BBrjtWBQMoRiYjXA9fa5SaCx8pmlw%2FqJ0RlaEdQslFWR1CnFvXXDBYNqwwenLzPU4h1VIuH0WoPPBAoanvgvkUvjAS5nOq2Lv6NTx9fWx7ixB1tcc%2F5o9n8FhbfZDNLexHdmLaFzAch664qZeuuzO8ZsCXKOXSM7CxhHAyZp74yogEgbpC7oxJihokyCejuoBA8W8JeRwdmGtXWPoK&X-Amz-Signature=9a2154815d1e9d27be78eeb6ab84193e3e4b1ab50306681ceae5ecb01d7898d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644X2PBNR%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIB5oiRuIDAoiYC6NcdnnVPCmtgCw4AR41FgPFmDEGn1aAiEA8TkJXZigujUjJuqI%2BfQ3unRDSCEYw%2FBUp%2FldAYgpgkMq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDFSUlkiL8qNv1YMTgyrcA7plCJKFsd6ASssC1hfXCrrvKNVNl3YJbv4dJfy8eD%2FP23jVt1SkhjOKzs2UI6k5HOl4S5qLLsps7lpaHJcTLHX%2FvYsRzweX3UYrBJuJuM0vSDyneWI9AnoHuwwuEy4TeUdK12VltQLfPP4%2FfTR%2BvQ0AwjeBEU2oHpR0qQIQldzwz0jTluFpfzXHVBzK2KYxt08sAs2xZpHML9CzsUt%2B1YnqZwofkqn9hk9QNfwVQITbOs4BXOrjcmZDuWzmiCsV8Pw6CVP18D4tTAHaM%2FpojBr79Ze8MT35zyIN9UC2QswXnPpM6cWZ%2BP7LIxyxxLcz7zQxi9OfYVqfz3In8Yw1m4B%2BLlFfcbHlCuEAB9pkREW14zGESCD2w3lU%2BVRd%2F85t385vFKDiHQhokLmcpPKaBTP0LArnFOOQNyOrvqOiOqHqX%2BvXBUA1J5mbXVINTDwJ7U2JmkhomsA2scIOPF8jcBUigEbNMJzHLxxdxWGK6ha%2FGQi5ce1CLLCxrHiiPT7ShgMg58B%2FvGTNzRdyiF3YPpk770bNvMc7lfG%2BEJv2CBl%2FCrRdo%2Ff%2BjtOwJgkYZYyZDX5qEQcosLaqrvqAWsVWY2p0waxg0fiy8VIP2OMKpfqX9%2FjEuKt8dRmDy88tMJqN68oGOqUBxKXGTXEpgEw3o7lB6svl3yFOMMXlbLFoT073i3v4aQjllerjCEENi0%2B5Eaf9q8x0TY8k5%2F5Kw%2F7FjkvZNjIpigZQlbIwLLlLjJpzW%2BNc9JmrUvf%2Fg9Kt1TeBOZ2WiYFVbizGUjfZaB4XnllW2DqqXS7d65vp5pjYWEaGY9CpDz4KL%2BE6hmbPXUFeVe%2FWgb8PbJcdo%2F3ZWNEhhuVcK3ZcR2wBuxwo&X-Amz-Signature=be8f962e84c0ecb5f74e32416d32550a418de9d4a4975ac5b6ddd792a263907d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VS7BKDU%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQC6Y2fvbO%2B11Zvp0f0NtLOA77eswrXLT0lYSyG6yPG9BwIhAN3eQbUryDvlaLySYAS37rZjaFK2FxaxOmEpMtlbblADKv8DCDYQABoMNjM3NDIzMTgzODA1Igx2FHAY4yXZJ6uGSL4q3APH0i3RkgSMikiowxfL%2B0DO2qgCYZJZTCARnAdQctFXCN8bs9Bd5TVLjncHmgIze4JHYWle1RTy7C%2Fs611B9IdibtpgBKPN8%2BXNjs5WaR9M6hRAd%2FKkADLiZueglvN8U4abowhwv2DuJTYQ%2F5OwV8wX8FZe6sB7bz2x0l39YUHhLRRzeOyL4%2Ft9SuH9Mq6UPx2Uu3EuwYON0YQDPK5nLjeAmXBPyVjzg8I7ZgGsR8L5t0RT088E8qd6zUBiFm70j%2FOLxr3poG1d%2B%2BuOpEWrGOkf5SQMVhXeNzoeJ2JQXXB9%2BcOT6TfRBir8okfJ43wvUSr%2F66RTYWH7kuJ0vqQN79Egjonyhzn4aARjT9DdfeDq4LhECxAUUSOxERowsNdx2nzghM7cbvMMWWyYp%2BF4o0g5UWm3cHxMCRkcNG%2FP5t3818GouLzAW7eL5jLVk64SuM1m3QifuOXiRTh13J8W9quu8Nzz5%2ByBF3Nbe%2BL3%2FuKvbHg9cGJFl43xsdd7PXmj3IQvxXYq5wKl2L3ZeCgYsV22Hz5IQd6eRcSf2TxSkyBq6wl5%2FS9yOQLUd3By51G7xbA41NysRF%2Bxnh3P1gs6WKTCNEereSTUwmtP8OpNKOC%2BpvZZqSDvflUdatpsvTDDmevKBjqkAaFtHuaMXfBUibd3zUxYT9Asfc%2F3X8V2%2Bk3P%2FWZDPlYl5uFAM6oCpu7ut5LmVMaoGk8nwONXG3AHwQOlpazEFUELAfWpZBBSyL%2BAMLl08Jg7PsMn2cJS7XGCU1cnLwNranI2TIH8PRSvtY%2FbXcqD3j4dDlP8ulSGR4BpxaOwdpdmq5tlHHrvTNJONt0ueq4XMyV72trSesRA62cGTnX1biOfiaZn&X-Amz-Signature=2aac409468249416535b26d970e4100baad8d3d2f75b2906149bcc5ea5ced0c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQ7H6IJN%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCUG2ETzJPOqPP0X85R1vzg4egKzYgIIMYdDU6JJt%2BN6QIhANjNku62qYStMNL4%2BiAPmQMVrw3HKjIfqO79KPDF9ep4Kv8DCDUQABoMNjM3NDIzMTgzODA1Igx235uNawFdvNZhVMgq3AMODWJo7deAE7NitpWZkzZJl%2BHCS%2BNHiqo%2FQP5lB7Z3Msbnjg0N71N0ZgSHxGwujOVF9TNZAkfsAx%2FxqX5p%2FMHGrT7tCNNt3ggiM%2Bz7VoJdk3NCLy13WsbAW3qYQAgwXxK0yGy8KHgXI0WndDF7crT80oAGFWONsoAo%2F7HLlNZ7u3VhojUUS5%2FQnEz7x%2BkH%2BhayuBPXOIEty7siy%2F3bb9d%2FUCGqjsnA7m0uEBHbhDp89AHaeL85RbPHlE2oI1RPRrfRB39smYSB8jIXGKbm2fQFvHXfvyUEiEgv9kKWzPfhAgaTwUhk9c9kPZCVSbiWsPeep6JWpXo2q9UOMr464ThYUl%2BhFhruIx92NNcfaosyKj5CIx%2F7OsNZ49R5j%2FAytvxdReZh0V%2FMsNrjzxOtsEFYzUgCnP5D%2BAtAmnwbFAjy2Jf9UIuJuPtitknBl8spEb4LBje1Cx81QHGjMwtNoZlf9QGbYQ7spEhVPvupjSFFVjgahTiY2bY1GBzK0KhIMl0EKmzn1CO2MXi%2F59zcmfK8Hw4C6Giqv9%2BixKkI8G8t2pPp3xRFMeLaOgVf9HFAdPc5G7g2bH%2FLHN0Emrnnj2yC1jChAErPd1uAvaVqJ3yWePBxbGb92rHYLQqqOjCYk%2BvKBjqkAYrJ7QcNUOMjuJTWlGgVl4UCTff%2Fsu24Zuf5N946dHMA4GewwPCtfWtRZZZhb6TIgTjspv5E4V1TYGUM%2FbT7GgscIlBuyTV9uivPtLukN%2B7%2FkatdyFSvhX5p4KMLlrA%2BEjhq94S2nTnnjq33I2b1ZFM2LXkKoNPSu1fy3w%2B1lGQBybFOvKsZBhrLyHHUH%2Bicclv75OkMAkY8d%2FrFgd5g1bhdMxzG&X-Amz-Signature=43e85dd06bfc3eec7806dbfb5ab8ce2e6f64aa3eda5ada751129f3fe92951a0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQ7H6IJN%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCUG2ETzJPOqPP0X85R1vzg4egKzYgIIMYdDU6JJt%2BN6QIhANjNku62qYStMNL4%2BiAPmQMVrw3HKjIfqO79KPDF9ep4Kv8DCDUQABoMNjM3NDIzMTgzODA1Igx235uNawFdvNZhVMgq3AMODWJo7deAE7NitpWZkzZJl%2BHCS%2BNHiqo%2FQP5lB7Z3Msbnjg0N71N0ZgSHxGwujOVF9TNZAkfsAx%2FxqX5p%2FMHGrT7tCNNt3ggiM%2Bz7VoJdk3NCLy13WsbAW3qYQAgwXxK0yGy8KHgXI0WndDF7crT80oAGFWONsoAo%2F7HLlNZ7u3VhojUUS5%2FQnEz7x%2BkH%2BhayuBPXOIEty7siy%2F3bb9d%2FUCGqjsnA7m0uEBHbhDp89AHaeL85RbPHlE2oI1RPRrfRB39smYSB8jIXGKbm2fQFvHXfvyUEiEgv9kKWzPfhAgaTwUhk9c9kPZCVSbiWsPeep6JWpXo2q9UOMr464ThYUl%2BhFhruIx92NNcfaosyKj5CIx%2F7OsNZ49R5j%2FAytvxdReZh0V%2FMsNrjzxOtsEFYzUgCnP5D%2BAtAmnwbFAjy2Jf9UIuJuPtitknBl8spEb4LBje1Cx81QHGjMwtNoZlf9QGbYQ7spEhVPvupjSFFVjgahTiY2bY1GBzK0KhIMl0EKmzn1CO2MXi%2F59zcmfK8Hw4C6Giqv9%2BixKkI8G8t2pPp3xRFMeLaOgVf9HFAdPc5G7g2bH%2FLHN0Emrnnj2yC1jChAErPd1uAvaVqJ3yWePBxbGb92rHYLQqqOjCYk%2BvKBjqkAYrJ7QcNUOMjuJTWlGgVl4UCTff%2Fsu24Zuf5N946dHMA4GewwPCtfWtRZZZhb6TIgTjspv5E4V1TYGUM%2FbT7GgscIlBuyTV9uivPtLukN%2B7%2FkatdyFSvhX5p4KMLlrA%2BEjhq94S2nTnnjq33I2b1ZFM2LXkKoNPSu1fy3w%2B1lGQBybFOvKsZBhrLyHHUH%2Bicclv75OkMAkY8d%2FrFgd5g1bhdMxzG&X-Amz-Signature=5e824c1f340c897566be9237d8760a46ceb5e7725c3e307bad9ed55780c361f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TE7FXEBB%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDA88Q0a%2FKFtU508BcRBqfjH6NeLsbgljffyqicOCq%2FSAIgRM1ES%2BmyDtwGAzbXOSamZjRMibajbZ93FriERhzpH3cq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDCFR4YqfA9vNil%2B2OSrcA%2BE%2BTcY4Hy%2FKzaCrp%2BHcyEMJr%2FnOsQDveIZuVyhhF%2B9eHYT8BywlAB%2BRyJ7zbvg2PFCS4Pm3UUFXgajO68md6qpa3buFF9Y666286np%2FX0qFLRaHsu9w7%2BMffZOlcePfeb5jfeaqy046QKh8BWUmlFwwfpHyMq5j47hfxEHvRcpn7As1NkCIc8zQFv%2FbhS03ma0ai7EjWzfNkcCWXjgWDe%2Fyi04%2BrNtMKw9UUqO1ts8A7YFBN9wTwJUk7GA0is4L0bmvislLkwuwPrJCY54lEAxcQDLfsIXNhoBjuspdunfWYAy0a8D0CjZZXWa0QbTzqjv5F3m3BTA5uP40g%2FPYb5NEJL5vxtS7Fw1pUnVmJ9o1%2F0U4oocZrR0KfOHGzU5lO8SCk09sgDl%2FCSHdQsbhnEzANTSbt9LXWCetSWmf%2BSdV7uNgrHo6pRBbK7BzRSS2Oeq3bp5N4VeXGx0ZdU5YdYN0xbYwflI0gqJ46ngf5Ztv%2B1pekCZP149uppf%2Fp4ATApkL1M9%2BMu3nv5nR06pmXK%2B95E3k%2FgQIkluwgAK%2BYy3G8fc9lGANWnJZ1Wf7rXOC2otZIjxC2xIcheUu%2FwssCNSucYOFYH%2B4h%2BtVlVyY65CGwE%2FLO7X2bWh14RC2MJuA68oGOqUBc%2BE2TNPdFIcjV4U4RLNKhbavro5hXwtomtqiXZMGi41hKHrqSLKVZygClPICWHIHle8a%2FL424IfSbey6cz5iVk6G3tOGGJ7glrBxX5Qma8Hf9E2zVOC6JsNLGHrzuBgRn1b5jLTObukg6e5JCLq%2F%2FaGJBRNrp1qrJfD%2ByDgJ%2BvYvvvAkNB6qf3kfzU%2BQF6qVL4NzkwbbKK%2FobAEN7ElxewGWY%2FNp&X-Amz-Signature=e65caee719415ebfe5496ae449ba5b63806f10928446e997e5544d23f3784ab5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GVR4UHZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQC3EcfnRypt65scYo3cUpZ9WKfTavzza68ZpBRylXBcPAIgCAuv4sDbWk0iS9UWJfYAu5ohgwYc3IvToOietTLT1PAq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDLd4ub4aBpaEdDdE9CrcAxt2m9Gu3izAzj1bRRaD5sADljbBKXg5JgAPTBl89Rko3dBqjoj3LStogsuEWwIfLLJWYOU1yKd3mlePF21DoWOeHh5zkIBfRZUOzENpESBZAUEofpCqM3BSvGcH7VxpdqVUB5r7krCXev6Kzs7fO9cb5ee17rWuRMpkxin7kd8laf1a%2BPpidHwl79bafdxFlWNLueS4ODcvHV%2BQrPdgWWiZVeXHDuBAA5H8u7SnPRV2M8gZhZUxVmMcuzR9njPBuBG17xepIyZZDH%2FGjBkZL50XgYgpExa3rSw4Ha6YZiNadW1O3qefExg4WLbdp6dC4AfdzG9rcp2AOK%2F1ZeuHmQorGzuBqYdC5JfckVAqC6at4Ws%2Fj2ntZUsTYX2BUoMPwwhsvoV%2BRvVSgZWrfqTIbm5zXJ0nGP8l%2Bjh0SiAT%2FEpfz377ORTpMn6rME1K2LL5Gy101%2Bw2HITwylCT7mKk4%2B37Vk1NuknCu2Bn28FCB3N8UI92%2B2JgPEBovFkFz6RjIZgN81qAYqGxFHLPuH1puEmnbIhKkOYZZEwA4%2FTJCG6qge6wZ2uYql5bhYoWyY6%2FcHf9v2P4hnt6VrSzpH01UKbpNtKgolHNGr9greUp2E86wNER4a9T5FbXzamJMIGN68oGOqUB6UvUOiCRNlFx0iDeMtVdqNvKGrD3qTTLjoFsQrW46lmvTDjEIaT5QUA78p9CdajOB0S71Stp3O1du91KORJ6j0PCbjWBuMXJsjy%2BiWLZEaGdIguh7G%2F7d9h%2Fo3f9mQw%2B0Ls0fxKr4YtSiJ26rypJZf039%2FSGX7FCeKgyEDFaxYugsC091JmeIDsYHFqdvP0btkbuZSXsu16BK%2Bc9BbSz%2Fnd0q6Lr&X-Amz-Signature=3b19454dc43ee91cece0d2de5a966508fb3e8f1eec1cc6e3ed569104e648f119&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GVR4UHZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQC3EcfnRypt65scYo3cUpZ9WKfTavzza68ZpBRylXBcPAIgCAuv4sDbWk0iS9UWJfYAu5ohgwYc3IvToOietTLT1PAq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDLd4ub4aBpaEdDdE9CrcAxt2m9Gu3izAzj1bRRaD5sADljbBKXg5JgAPTBl89Rko3dBqjoj3LStogsuEWwIfLLJWYOU1yKd3mlePF21DoWOeHh5zkIBfRZUOzENpESBZAUEofpCqM3BSvGcH7VxpdqVUB5r7krCXev6Kzs7fO9cb5ee17rWuRMpkxin7kd8laf1a%2BPpidHwl79bafdxFlWNLueS4ODcvHV%2BQrPdgWWiZVeXHDuBAA5H8u7SnPRV2M8gZhZUxVmMcuzR9njPBuBG17xepIyZZDH%2FGjBkZL50XgYgpExa3rSw4Ha6YZiNadW1O3qefExg4WLbdp6dC4AfdzG9rcp2AOK%2F1ZeuHmQorGzuBqYdC5JfckVAqC6at4Ws%2Fj2ntZUsTYX2BUoMPwwhsvoV%2BRvVSgZWrfqTIbm5zXJ0nGP8l%2Bjh0SiAT%2FEpfz377ORTpMn6rME1K2LL5Gy101%2Bw2HITwylCT7mKk4%2B37Vk1NuknCu2Bn28FCB3N8UI92%2B2JgPEBovFkFz6RjIZgN81qAYqGxFHLPuH1puEmnbIhKkOYZZEwA4%2FTJCG6qge6wZ2uYql5bhYoWyY6%2FcHf9v2P4hnt6VrSzpH01UKbpNtKgolHNGr9greUp2E86wNER4a9T5FbXzamJMIGN68oGOqUB6UvUOiCRNlFx0iDeMtVdqNvKGrD3qTTLjoFsQrW46lmvTDjEIaT5QUA78p9CdajOB0S71Stp3O1du91KORJ6j0PCbjWBuMXJsjy%2BiWLZEaGdIguh7G%2F7d9h%2Fo3f9mQw%2B0Ls0fxKr4YtSiJ26rypJZf039%2FSGX7FCeKgyEDFaxYugsC091JmeIDsYHFqdvP0btkbuZSXsu16BK%2Bc9BbSz%2Fnd0q6Lr&X-Amz-Signature=3b19454dc43ee91cece0d2de5a966508fb3e8f1eec1cc6e3ed569104e648f119&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLHTVAL4%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T220120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIH4kubOIxYQ3XHw%2FO3TP3g8CaGWw9%2F5Yi8Hnzb33UL7dAiBuKNO6LWPUcBUCyTvzFXxWik%2FDpY72Ux%2F0AYOPGQU2PCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMyJN%2BQgR%2B6wF1JUWGKtwDv8zZwDO9QbqrmW1ozroI8kAshhjZrnMPdYwQGHzPDM5Te0spDkxWCtHI1r9THG%2BByJ9O8jyAhFb%2Bo%2FVvbjAVhyi9lFUHtNsIEXg0oa6U4LBUjq1SuIChokdWPNqIa3PnFPHpdWgTW4BHPdwws%2FvNzkxIkF5uxmEYFjcgALDO9aVOk1SmqOlSBBjQZeuVumzSqzaEhlyXUAnSTYv6cfi9%2Fbt%2FoCG9uJYHqNvUbAi8KrxDmuMeXT0Z%2Fj4TksrzjM6u0%2Fu%2B622c677lN07Jr5l82z081UqguwoJCVDY81NvsaLn6nh7ILEoeCRhnQR8iKCbCNjtVOSPsyJhgn9FSdex2tvBuwASVNp%2BveNnFPXi9KEiOjbhInDZkJOOTbvLLAgkzG07YfeRJNMFrqGCtKo0zHvlCFyP1qwMZAXHG1gHebb60WmULwH1NtQwUbF2MG2J%2Bx22vK9lSYhzEtOlcx9VY4xjUCix64UbDRAVAGUHRfl7gYDwplpHJ81A%2FtebAxMPskcbdOLKRemJe1tBOTI6k0NdUlEJ1iFzLm2TUXCNWNt0gx7zrQ5Sxo305LjH26wQMBIeVf75aodN1E64yvr7zClBnrO6kITeXa5ULHlqLlRkEajkTP8DGt6wKt0ww5nrygY6pgHYP0WtVfTAhlLK%2BisHMjig3v11rGni2WROQiLSHPHIuZRNf6iwVq9e1IZ129Sz0zzuVL6kmWpnfl18ag%2BDUYgUJv1b4DPSYF9emUcqbvRnbolsxvT7PvhOB%2B0QgyrcXmPIVgmdZWhtl%2B1B0bL%2FEcS75n94ls3Hohg6FajN%2BBdmbmlrJa6JnMmbLYVEzv8oo3mYSeqXQrvyupcCuHorwzJ5xLjE1fL6&X-Amz-Signature=70e04c6af3a340267053157c7a1c650089da607177dc3a9a068fb7871d8dd6ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

