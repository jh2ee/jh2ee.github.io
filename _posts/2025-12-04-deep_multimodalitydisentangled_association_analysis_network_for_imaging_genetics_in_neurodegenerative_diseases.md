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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4FSBJGW%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCk9xGBc61RSP1TGceAeW6C4EY6Q%2BWUPyzfpoz2J9TowwIgdr1ASz4KghVmEyxjUL%2F7dIrwPuaceO3ZoiZ4%2F1VvnqQq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDEjPeT8M6rfFWK3GyyrcA2WT5p9BUdFSmc3RPVdbBbcQb%2FVrqseQA%2F4TdFHmcRaEf4ihlJIJtdebZOuirwM7x9grKvOCRW065GFbR%2FpY1Z5tOdLUCiKa3aRqwn5sSjjLX8eC0FONsIks7TVCPX14E%2FcMg%2BbA1cm23s4892OPJbsScZwLlgS2yPf%2FOlU3U3%2FiLynmG6ES6nal%2BcmdDT96UATkzNM4tDwkHoYA8EvESoxTREjw7t0NfD2BbzwKuLmtzzSS8TRqCNrzXlD1Uhm2%2FptDt%2FPB%2B6bLTKlXRJN3AjUqCBY2KKxJVhqF1GUkChJKiLzmtADd7CMeqV1w6jZjTqAwtsKZ108zubzfyQEYfTfTwGZHBflkNaX%2FMi8vtLQeOM2u6EWfO%2Fz%2BhCBVmd4zREn7%2BS2aaiPg%2BdBWdXGE%2FxcAoY012ovNbzhCoBwhQcs4EEOr0QVAM6gX0u%2F8RhkszRIbdQq1KK%2F%2BmTJkWwkJbNyon35qMNOy8MRkYEnMYh6atqntymHu5xgsVo37h88S3QHlvrA7haY%2FPazmGhA1p2oGx6gL2RGPWC%2BFCmIElDOOHxYTMDWNS6LtHsS4qOtqJOCHfDmoMUTb3cxHwU9kPTGQekjr6gT9wUXJ4%2F%2FSO6pIbwSYDpYfipVugg9AMKKt6M4GOqUBnAZB%2F%2FuypbuABi8JVqtJxsUPMZPMaTUTw1NptIrFYJip0kXckreS6A8Gx3y%2B0HvlU3uUQtVxh%2BlXOqxR0dI8LBCHXZt4a%2FyZWh9i104%2BkArtfF3Xg9nKphZ%2BaBO%2B%2F4L9rP7p7FpXOoUnknPAxlTexMluIDc8rr2SQAdMmcOa8G431aJwpAUpwRY4%2F%2FnQY22slnE%2FgC4RaVEKLdWouhQyWerSYZDY&X-Amz-Signature=4c285a96f4991377473662412a24d10c6fe0be31a037052f88425e0361aeb9ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4FSBJGW%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCk9xGBc61RSP1TGceAeW6C4EY6Q%2BWUPyzfpoz2J9TowwIgdr1ASz4KghVmEyxjUL%2F7dIrwPuaceO3ZoiZ4%2F1VvnqQq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDEjPeT8M6rfFWK3GyyrcA2WT5p9BUdFSmc3RPVdbBbcQb%2FVrqseQA%2F4TdFHmcRaEf4ihlJIJtdebZOuirwM7x9grKvOCRW065GFbR%2FpY1Z5tOdLUCiKa3aRqwn5sSjjLX8eC0FONsIks7TVCPX14E%2FcMg%2BbA1cm23s4892OPJbsScZwLlgS2yPf%2FOlU3U3%2FiLynmG6ES6nal%2BcmdDT96UATkzNM4tDwkHoYA8EvESoxTREjw7t0NfD2BbzwKuLmtzzSS8TRqCNrzXlD1Uhm2%2FptDt%2FPB%2B6bLTKlXRJN3AjUqCBY2KKxJVhqF1GUkChJKiLzmtADd7CMeqV1w6jZjTqAwtsKZ108zubzfyQEYfTfTwGZHBflkNaX%2FMi8vtLQeOM2u6EWfO%2Fz%2BhCBVmd4zREn7%2BS2aaiPg%2BdBWdXGE%2FxcAoY012ovNbzhCoBwhQcs4EEOr0QVAM6gX0u%2F8RhkszRIbdQq1KK%2F%2BmTJkWwkJbNyon35qMNOy8MRkYEnMYh6atqntymHu5xgsVo37h88S3QHlvrA7haY%2FPazmGhA1p2oGx6gL2RGPWC%2BFCmIElDOOHxYTMDWNS6LtHsS4qOtqJOCHfDmoMUTb3cxHwU9kPTGQekjr6gT9wUXJ4%2F%2FSO6pIbwSYDpYfipVugg9AMKKt6M4GOqUBnAZB%2F%2FuypbuABi8JVqtJxsUPMZPMaTUTw1NptIrFYJip0kXckreS6A8Gx3y%2B0HvlU3uUQtVxh%2BlXOqxR0dI8LBCHXZt4a%2FyZWh9i104%2BkArtfF3Xg9nKphZ%2BaBO%2B%2F4L9rP7p7FpXOoUnknPAxlTexMluIDc8rr2SQAdMmcOa8G431aJwpAUpwRY4%2F%2FnQY22slnE%2FgC4RaVEKLdWouhQyWerSYZDY&X-Amz-Signature=4c285a96f4991377473662412a24d10c6fe0be31a037052f88425e0361aeb9ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645OMDLLZ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIHmTcxtOdrbynN2%2F6RNh902KfEerqVUD1m45gd0wg13FAiBsU8D1iKqqG%2FH3qGrvvZS6bsNsgdRtkbU9rmDt0UIILyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIML3yAkukL%2B2CzJIFBKtwD4cf%2F8IoGFrehl8QyXj1Yx5EW6irvbTv93qnj8GyS8jnh4h65DBIm51AMXfG1%2BJNXpp3M3YlE0E8OEPSwoJUqBJJ1BqfYfHWVA%2F06zOMJpueb4azxlBDtOOWj8pGijx4TTzUMTZBOXNuZvK0oU7wrPIk4ef6hJLCoMtEG33k1SwHuOnuITb4C%2FrSGQxsFktwZG4clsD3NCWhai%2FNUgfvh2kkqZBMPJTByyIYn%2F7EeRg%2BLLcq0yeVGDE8MN4sh02KGJdIFsbcVKKOQUUKp5hrha%2FxxdwGQ9votCu%2FzhEPRC8WIODTvzRFAMWMfbQrMaQqBAQh6ylwechC7VKI8ec7foXZVikdR3aLs%2Fp%2FvPEwxwpHqlvPaMhtFcvk304piQ47htvGMSVUJUD79o9SYmYdwVuidu%2F3RYrJx%2BGx92spGpxp4w%2BEuaoFA%2B%2BXsB%2FlNc9GYQ1UpSvS5QmC1D5TLywLu%2B0cXqImB7unNbdNLV%2BwmtcqKOhJ1tvvD%2BRNAslEaLR6NOVJQpRBlHGFXR8IzvYsVWlqePz9lJp3e59fTqhneJbyTdDFHvkf0%2FAepBxSywt1w72l4Egl9HGx0V2G6XgkIC32p264u80%2BVApXNM63FOwBj%2BQggWhOnwiJE4sYw2q3ozgY6pgFKW%2FhQF3kG5tvivA0K21jVRve0hHgwWOdNVVRyTXKm5CRqX85TKnS4WolHFH037mjuo9ANHyb3rOLJUIDmgVN2itMsPx%2Fzgt3DESxjfVyRsSM5weN6dfIBNbqe1uKk%2FPtVRgTz66JWU6TWa5PYDIumw4W1NmJgJdOAStv4Bsd4YFANYsl4ukPCVs4RLLJ0znTwhEuCL2Y9mQBnpGt7bf5U%2FB42Svri&X-Amz-Signature=d59d90667b508ca653ec59b88a390f67cc9b521d17e13481dcceaa868b67aaff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GGZY4LW%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIGddArXB9HmtRuH4ZHAxcJf%2B6iwH2CU%2F%2BrvtadyQy6pZAiBcgwfJ7arfnpI03YsfxjxBeROJM71ZHHzqI6S074XAdSr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMNl%2BCFW9N1lYGjd7fKtwDosvjga4c0A3xDUSmHMVJtTMeLf2Xd8QIq%2F%2F0Klpo27zJ41fpp48fB5ZR%2B2TNRdGcXjialtW%2B1us5zSVBzE1CR2IwHXb205c5hH3YDJcOW%2FcYQ6BbSzbkp5V5stUrXU5A64Eyv6qOgdNvbijhXTFJC7YXGlT9UJfL%2BuqQQTzqry3ypJHhF2tSLyyaBktY4O8hFtqgCJYsU%2BewaKeNW4XvyK25SFVxqY9kxDHsgsLlqUL5b6Au3DqwPjyrySjY0%2FQSKiRyJfxs0SPo%2B63Oz%2FPHC0P9oCr64TCWZXdXNegkbKDVYn%2BmlQUAhi9tWaWlJ7cYOiJ5DEi0aZc815sieWi6YKP%2B%2FwBtJmaaI8CwlLYRZp0W1xEHjZ7MYpTM2Qeakyj9X9oM1mP6biSRdonEL6s6ZcEmdpOog9y8ZSQR0LUBgOQMaaSnFoEnaBdRJT4%2FghGXPG%2FP58%2FA%2F4ajOAdMnl193gggWoRY5u7txMcH%2B%2B3mI%2FPKkBuGFJTsnrzqn%2B9CGpFhrkOJAYKm%2F8zo%2BloRRs80xvHgxLMEbutQ0X4iqvSn811FHLdVvkP7ep7iiWpN6KGYiw2k%2FKsCZe30Kgf5DOGsXhLpYX8vVhYYxR3zEdPLfXOyIBFJd3PGVHDZ%2Bf8w2q3ozgY6pgEV%2Fb5hiVYLqjJl%2Be2vzK3JzbLPYJveKZUj%2B%2B52WXMKsoj3kPymLelE%2B%2BHFxAVwsRAOVr4S6YjFJxJ%2B802OQgr%2Feri6hoUjrpKPp1lwlTZ%2FIrBXq1%2BVeFGVVAlMrr94T4u%2FlmYx02jJgLq1wRE1%2Fx%2BJeJLYOJWmfb9kPEIt0uIWfbDCuHiOEqzO49BIotFN%2BkA5L9eq5sDbDPriNhEELoHCivp00uOl&X-Amz-Signature=df8461064ba94f6400c1dd299579159ef1d5aafe06ce1ddfa3d668474d754847&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GGZY4LW%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIGddArXB9HmtRuH4ZHAxcJf%2B6iwH2CU%2F%2BrvtadyQy6pZAiBcgwfJ7arfnpI03YsfxjxBeROJM71ZHHzqI6S074XAdSr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMNl%2BCFW9N1lYGjd7fKtwDosvjga4c0A3xDUSmHMVJtTMeLf2Xd8QIq%2F%2F0Klpo27zJ41fpp48fB5ZR%2B2TNRdGcXjialtW%2B1us5zSVBzE1CR2IwHXb205c5hH3YDJcOW%2FcYQ6BbSzbkp5V5stUrXU5A64Eyv6qOgdNvbijhXTFJC7YXGlT9UJfL%2BuqQQTzqry3ypJHhF2tSLyyaBktY4O8hFtqgCJYsU%2BewaKeNW4XvyK25SFVxqY9kxDHsgsLlqUL5b6Au3DqwPjyrySjY0%2FQSKiRyJfxs0SPo%2B63Oz%2FPHC0P9oCr64TCWZXdXNegkbKDVYn%2BmlQUAhi9tWaWlJ7cYOiJ5DEi0aZc815sieWi6YKP%2B%2FwBtJmaaI8CwlLYRZp0W1xEHjZ7MYpTM2Qeakyj9X9oM1mP6biSRdonEL6s6ZcEmdpOog9y8ZSQR0LUBgOQMaaSnFoEnaBdRJT4%2FghGXPG%2FP58%2FA%2F4ajOAdMnl193gggWoRY5u7txMcH%2B%2B3mI%2FPKkBuGFJTsnrzqn%2B9CGpFhrkOJAYKm%2F8zo%2BloRRs80xvHgxLMEbutQ0X4iqvSn811FHLdVvkP7ep7iiWpN6KGYiw2k%2FKsCZe30Kgf5DOGsXhLpYX8vVhYYxR3zEdPLfXOyIBFJd3PGVHDZ%2Bf8w2q3ozgY6pgEV%2Fb5hiVYLqjJl%2Be2vzK3JzbLPYJveKZUj%2B%2B52WXMKsoj3kPymLelE%2B%2BHFxAVwsRAOVr4S6YjFJxJ%2B802OQgr%2Feri6hoUjrpKPp1lwlTZ%2FIrBXq1%2BVeFGVVAlMrr94T4u%2FlmYx02jJgLq1wRE1%2Fx%2BJeJLYOJWmfb9kPEIt0uIWfbDCuHiOEqzO49BIotFN%2BkA5L9eq5sDbDPriNhEELoHCivp00uOl&X-Amz-Signature=037599f13638d95b73849f898c986bf269385170151200feb7c1a3c45a35cd87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQWLFLFB%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIDLOvEOHtmklBHFy2tMzpN536oxsPIRcwzF3990o13hoAiAcj6BZDI6Um1owRhvez7Y%2BcD%2BY9RqBLCrQrqDFTM%2B7zyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM%2BbP6qenGOhw3JFKgKtwD%2FAJldNXAbUR3sROWpMEOkdwMXubYKtOg2ZYm7JK2UDSsaGZjGvF9sLL25eK8Nk3qfelBlqtLQH0q6jBQYM%2BO3tQdfwy8ziAy9Gc%2FsvBIEPAHvOj0pVvpUJyscFYYOTwLxRFJjBe0f9MTRtPsvdttqn2R%2FETuk%2FS1%2BHqFnWSO1tPFxks9wQ2gCtSYFEHxmJc1aYdt3zoZLTAkzAcOcyL1B4A9LdGyUy2Ll%2ByjXEbWg2QgDGUej8x2NqnLecUekHMlNQXk3e13uG3KZJ2xwZijcWpXAkmW4Pv2VF7r%2Bj3pJYtpFORBe1YJmRehXdtlEKgjVkiam5Hr%2B%2FdSXj%2FKTgD34Du%2FazpRB40qEiBmI7ZrJSgZve4KQO6o60uwrokoEp7jjoQsnYI46rguJtBhwOK5%2F53AsEnRLpJvg2eY2l6hb91wWCemFSDb89RPj%2BsquFy05np36nJo25yH5J2ZeH6O5zEbcwGQpHt2IatNBLBnzNln%2BpSolsumMxzjqjvahPFpKtvVyq2Qu20Dq6AojnCG2WTivh1DtsOHeny4cUL8yaWlIgSFl%2BAVVaVJ5r1zqFdkz7M6xHfhgKbH5wNkA3%2BShyx2EI1dm0rGW1tmq0gUPo63VaUwA8zwA4amtSgwy67ozgY6pgGjpMXUxGZCHj8EShdrBBC67w3rp5b0UYy9koDli%2FDxvyNVvIlBax7IDm2850tzNv7QgxqLz47LipsUUX3XMLzP54KrmPGmqSb17rUh93Uf1Nf8lF0mh2%2F79DkcxvFqzLdcYNJq5H1kyNSwCn6yzbIh6WhNsrePdOEraac2xqLDZp%2BLj53Pd7EgPhh8mr3f8lT9Qq%2Bw6Thq481fEuBcyLR6OUnSLGHM&X-Amz-Signature=bb6df8232d8facd5ea911e692306328322dde6657f5706daf8203211818a4e54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666W7HZTE4%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIF6cpRdRbil0Aety%2FmCpixPnVz0qR7m%2B%2BhdmXcPk6GS9AiBV2xpzD0u7p8Tyi3m4Tosr%2Fyr5ZmkFUR9rgDcKzSC9jSr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMOJhc0h59z4NjH3ZBKtwDDg6DtHu8n3Jwn81mlf5uosy3Sdc9o8ac0UftdgtMjrOo4Hjf5pTSbW%2FRn%2B2yevX8ZO6FPfzvGqjSa4Cj2rlvisLQM7j29STarXqBvHV3xip2TxbCIBRWTyKUScDYaCAjJhLR%2FLUwSpTlH1%2Be7qCocgG0Yjyle21jmIoz9ATgbaMqqlpZ61Bs75ZTdfU8XmmlK3cBU2KpIMge%2FwSCumcgUsB4e0oMmRUGVkdfhCn6dAugCIXjZz32I4dAZXNdl2j6DfidnlsmFHxrQY5uexR39%2FxBk0euI%2FW3wTKvK6h8Y5kWDDzk4qmlUYMYSBWRtbYAKyvs7QHLswZ%2FQZjhUW0QmnjdBhKknyiqo3Cre5oF9i7LhywrZJjumeaH4TLHQjA5nLgdpgWpYDRX63XWh92a4vNIyJfNJA4P3Bt2f1L3wv8YLs4TEIe2oin%2BrgpPlIukOQ9V%2FBEUZuLZiis0mBV4L1hrpcDTCJPwAUJXw7Il%2FHdfFChY%2BhFZ6fnJDhzwlFKRrPjU4cmGJ9llpnZeTe4Nn%2Bb4GmPgBE7lJgsU%2BTeCsx%2BHDShifgnBLfWdF2p%2BldJ41bffB2OJvfveGEWyhr3egbq1ubdjTmOMubyOuokzTzgWXNI8gIM%2Fyl%2BTgp0w2q7ozgY6pgERRvvSRfK21BGm%2B02YR89V16KiFNgu7HJqFEKlU3SOTSZbcm%2FJoyqLrUHn%2FIprQPecinQgSCL39wXnhafRLFSJU5VLs7Azk2wMSt4yoclaVlWRaCYhKNDGZgN2g5wzLeZ%2F7kKTmnFUzDK9Slmr%2FkrAsTjF%2BGru9EDBTibdaRjdFm%2FVpAMHdpcWN7lBIE6YF6TejuQebxecJHgj4jjxE0387HswBJf7&X-Amz-Signature=4002480572968ba07e2db4f9b056dfd2a7db6d9a6e8392f107cd87889b099618&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QW63SIVC%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIBXX82yMwIekmcgJFkjxGS8JJoqS7nTWELz2IjZvY1IQAiEAlYVupxUhh9bLf%2BeIFiKy1IfapoMZre6OraVV%2BoEWhUUq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDBR476UPPsdy%2FQS5zSrcA%2BhIIoEKRpfbjwv6rLJBGPXGthQecRDDCC5Vq8fmr%2Bv2%2Fv%2BIkfVf3eryDZwfg5ThE5ay4rXu5%2FNgZdaERvqrcd7riLWvGeSjmYr6w348xSoXxUHUiRem3MCKZc5JsTlsrgnwBZOXaItcJryeBW2Eof0Elra88lql%2BaHL3RmMJyNvzzl%2FJPyLMC7fBeEZIHkhFIxE%2BUU3J2zDTJf5dTYl5xAQh%2BQFPyBvdmPnGUO7tDVW5B%2FC2yjo%2F0gdVyRVyoP%2BBMNXZ3gpFoeHqsS4UALOWY7kStl9m7PV1CJyns3ylvqT7Tp%2FHxz%2F1jPSMuKLmWJNRfItGtQaTBU0L5RKvXSe4fmJ5LCjUMMiiS9WUzSf0%2BAV1BZpcS7ruHHqOXgYup4%2BK08CDkym33zpJwN0VvIc%2FNRVbbZlDRnuw1I5cD4NLJje9Y9iPaExm17xl0MJB%2BhU5zsRxg3DPbIEATDS1EjuWt%2BGysH292eQmrGXdsMRgg2lMyCzNYqHsOaTfuTbPT%2BIFduiLf0lAraUkE9afwwMjlUD5igNY%2Fg0%2F8PSB%2BsMQThtCSFA4J%2FFFR0uo6DpU6B8a97nmGeEkXRQJ%2FCt8QQP4CSy3Bptfge9v0KE5vrMotnh0cGtErUfkveyVxFfMOGv6M4GOqUBs1KBbLMYqO82CvNRsnGePjGvp6V5RdVhLJoN6jSz57dBj3LwXpK3WmXaKhp%2F1KTrCZDE7gGtPEKQu%2FsoeAmC9BggcBgCp8w0l%2BQr9LO9kAbpdBNb48C3GtBHRqFhE6fQfynENJwZpnBjGEryE88PNGWTeW%2BNBG%2B5NqbTO6ntSPkaC8MgrEzPlitqXQLJVsMi%2BP2AdRBAZgTcxSox15x30Kcd4y6L&X-Amz-Signature=7b79a52ad7e95611324dd8b43e4259945a173592ce6620443f0515a9d01300f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVYUBC56%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCICRvYCSUAVtJrFTL3AcFUBcjvBOtFA56VBV9s%2F4XYIjqAiBO0Vww1Ry20B7vLi%2BFQ5gINKicsTMYVMtBOre6mXK6Tyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMeR3xigl6XHVYuwudKtwDjcxEp6l9B5Dj41KVEeDQhK6SdA4i8LjgDKaXIW%2Brl2mwhDygMA5yKg1dxRAB8lXqhQA6MtXCe5w8REMGEKVdu%2B2f0weWiRUnzQeDryWPeiHkQmzW5h2MZc6oA3jXzIYtAu7B8g1ipez6Iz1GeIPJDTW7YS5lsIIbyTveunRo9hDI2uOsaD5YGSTzfSdDWbNf1kZ57qUMrMK8wMcWGcBb9I5%2BCtkJaPAOaX%2Fkty6V%2B0v4EigKaQWV1HruIvLxPsyAjpuE8iP4fdvZq8SrBVMg1P35sp7%2BSr11OQxAabmOrMdf%2FK%2BfitSzry%2FB8plTP33G5BhXBvAuLLG0w97Rs8okZTBF3H7UzhBZON8drUT12KVnrXYeevP%2Fplli19irCDcjCO4qgoJKwkAySvR8pmg6mjD%2B4io0XkM%2B%2BaVzgzH4ptdj6lBJ%2FuaFNZQ%2F7q142iKmcZgfU%2F96LqfZmz7qh%2Fv%2FmsjmUm%2BXROcy8HLllnIJQVCPlgsXJRqp1vbbU%2FPgOx1hJj8QET4pT0nRYgtvHI72dUMKHfxZ8fb61StqsNtqaFYRLDNu9LXNiFWuTV4Ydv2n1BZ0O3YpoPqwqC7aKd1vAC0rPZAHZXMNy0CDT4PTFDIl6V5968SlNBqSME4wmK7ozgY6pgFt9m6fjiH2OtmFZ%2BLUixIEwlndslQVJgyobttm%2Bjcy2lkjhwxBSwFRtTpMe7eVI8O91EBCinHpXpBkkjXsLWC34NZpb1whERe9PaoGTfsv92h1SM2q%2BOgnuVIvq9iYoOoJnmeRz5OxH5OMyiYStrGEyV3iBWHIh8kzTgAoZWBB5J9F9ihQpsR2A7bdEwkIbhfa0tdK%2B6XYdTXhWjW3HOjxLv%2FwZu4P&X-Amz-Signature=3e596629632ba4a2c258138cd0e00c1d60168b2ed23c04527494cc5e9292eb6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVYUBC56%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCICRvYCSUAVtJrFTL3AcFUBcjvBOtFA56VBV9s%2F4XYIjqAiBO0Vww1Ry20B7vLi%2BFQ5gINKicsTMYVMtBOre6mXK6Tyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMeR3xigl6XHVYuwudKtwDjcxEp6l9B5Dj41KVEeDQhK6SdA4i8LjgDKaXIW%2Brl2mwhDygMA5yKg1dxRAB8lXqhQA6MtXCe5w8REMGEKVdu%2B2f0weWiRUnzQeDryWPeiHkQmzW5h2MZc6oA3jXzIYtAu7B8g1ipez6Iz1GeIPJDTW7YS5lsIIbyTveunRo9hDI2uOsaD5YGSTzfSdDWbNf1kZ57qUMrMK8wMcWGcBb9I5%2BCtkJaPAOaX%2Fkty6V%2B0v4EigKaQWV1HruIvLxPsyAjpuE8iP4fdvZq8SrBVMg1P35sp7%2BSr11OQxAabmOrMdf%2FK%2BfitSzry%2FB8plTP33G5BhXBvAuLLG0w97Rs8okZTBF3H7UzhBZON8drUT12KVnrXYeevP%2Fplli19irCDcjCO4qgoJKwkAySvR8pmg6mjD%2B4io0XkM%2B%2BaVzgzH4ptdj6lBJ%2FuaFNZQ%2F7q142iKmcZgfU%2F96LqfZmz7qh%2Fv%2FmsjmUm%2BXROcy8HLllnIJQVCPlgsXJRqp1vbbU%2FPgOx1hJj8QET4pT0nRYgtvHI72dUMKHfxZ8fb61StqsNtqaFYRLDNu9LXNiFWuTV4Ydv2n1BZ0O3YpoPqwqC7aKd1vAC0rPZAHZXMNy0CDT4PTFDIl6V5968SlNBqSME4wmK7ozgY6pgFt9m6fjiH2OtmFZ%2BLUixIEwlndslQVJgyobttm%2Bjcy2lkjhwxBSwFRtTpMe7eVI8O91EBCinHpXpBkkjXsLWC34NZpb1whERe9PaoGTfsv92h1SM2q%2BOgnuVIvq9iYoOoJnmeRz5OxH5OMyiYStrGEyV3iBWHIh8kzTgAoZWBB5J9F9ihQpsR2A7bdEwkIbhfa0tdK%2B6XYdTXhWjW3HOjxLv%2FwZu4P&X-Amz-Signature=9f67649c0e5394b43b6fae02726eb17788e28070a1805fc50cfb25d87b073389&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOCBFRJN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCC2QZSzzncbWMt7eyqu7UKNXpQ4P1OyG8GWbljbThE9gIhAOCmg%2BKrlLtmJnR9%2BlJ5d6Zs2axknWE%2Bz1smRbW3qXS%2BKv8DCEMQABoMNjM3NDIzMTgzODA1IgydqjllKM%2FuHXQOhe0q3AOa9UrHDf0kitsm%2FBJfulsLWQ6oLXdtIWV7rYfscInOxk0o8%2FCSdYU3MAYU8DjEcM1%2BXDQCGsWK9v552CFVPhAKkb8tBJispvEyYGuffYBV9fPQLxlJc8JgnfbQ0mQgFGQ7nNiGg2xhmr15SRarCtuDVBZs%2Fp8kBP45nwnInQfuo94FGQbWc8QEn3atIrPDxvmhjYVsVjTXBHQXdTUq%2FVeDkAsFQUdyI%2F9aW88s2KF9ljKI%2F1INkUV%2Fdgxc2aYi55rBPoEv6KYCk2vMD9ZwAV%2BPHXciWVYBh0LcxgqeN1OSADxr7EKWDdsUCCsV2ah1xUiVvNhd5zSo6Lg5zO8BlzR%2FSck21mvZsTMPGlpuf2eIPOYlfcrC9Mg8qdKVigKgF5HmTPZTGGRfRUSZIlehAIx2CLjLGE1Zr0H9xNIgqps9eNgF2JdckbjEfo3rWa3RhVSSgaKq0ph8PhGtbf9TWFSh%2B6dqbJc6v7SJoeRG7Y4KI3Ah%2FmbA9%2B077Fj%2FAxhuynJVeRxdCvtHpqex0Qwnp%2BfYX%2FQYfnR6DwkFXts92NG2o86NRd%2BF4lIjf%2BkN1a%2BReXocui%2FIHwsErkjqgt9Z6RGp%2BHPCSAC0rCZMFV6u9dCTJqe5AV72KcsCSqXNPTCxrejOBjqkAfvyLjvRBr2DlsLm%2FWFL4K2lBtGYFnCvSxf3%2BP7RWF%2FOxY8kK2zcWNG63enMybPL0dWyuFZ%2FZfaPtedKC%2FkpxIhKzQr71PvqbrOQQd3Xzg3joIs%2FGvSWKyKE08ugPhYgbaiIiQZnsp%2FAcz0s5CkiizOm5Ycx2iNQWbUswPvEoobSZJeRTbs1xCbEy2hNMXq%2FgOjradwCPg4IWFn2btuFZncZid%2FI&X-Amz-Signature=67da9b71f9a66ac128308a08dc0381a1f00f85daa3268d72ef7747e32efc8790&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665A3OWPKS%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIH1CvpEdEwa7W00Ykmrt312ddB3dbIivQua3cVAG0SnnAiEAzUlyJo3HkikY8n6Ykk45Y%2BjX4DRU2XdWloWa2KmTvrcq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDG8G%2B%2FyKKxO%2FdpHyDCrcA%2FNMcvVgKHnh9C4k3PfuutmVnRYbq8bDPAPvRA2ovMbvdA8LUEIUhV4aa9uiq%2BLV40fvHIrhXcsxWrDLLA6ahMly1rWpb1GDWukWjMGveuniXu4oRqLu%2FhBXjOT1B1bLUya05L78YltzwvwLNpCKTPsIo%2F6ezvFoyXMwc9oG1MxQomY4eX3RijGglb%2FvL7ttlMFT9avIkNR%2B42fPPiRuTwzRkNt1tqllHv1QM2vOFcdI3znodc%2BEu1su6ijwgoxj%2BbSBmI5sWx3UcWhHo79oNTUfPZlh9H3DBB5X2NBlI8biosF%2Bc4yU1uFwtKVHfTOw%2BPwu9qsnI6HXl5Xe%2BicxN3SOps8wTFHiMu80oPp5yXi%2FRytgpdu%2FLw7Nt8kbdngyfGnmsTtFFEFeSXqEeHbLKBcX5bGTYgeQ%2BMJyMQ%2BGR%2B6mmWGOlqS7fycdG4X3YthwpHLAsA0G7C1vWQyFbv5wEuzabEfZtdRLeYoBwg5Y4daSKNZiwatmMzsaXnOit4Wx2Za4mAD%2FfOqKjH90WTQy2VLXB6zPlshoY%2B%2B7shWl%2FVDmeCxVwBpkPF%2BEOALjMBEPzPOl434vyASisKNNuX5PD%2BI4c0hn%2BWnkXQURtJKzgBPGtHKLhJsaZQykd9xsMOKu6M4GOqUB87CrcXomtQzO0d8jCAQlBKiCGniqMMleikF%2FUXd1orWh5YpdZnR0hji7uGyNGYhs2oJBvfLzU8ptcDnYFk%2Fu6oOCNvMmNpgkoJJoTXlryj0XW8GVS5%2FNdaHHWVXu%2B0a1iLQFA0IMxhAZ%2Bku8N6lrKRtiH6i9adIjehT%2FWJdMzKoPaB4iLHbX0OlcYJXxEQplP7bTuVlJyOzImFHH0xelO3o3KOkQ&X-Amz-Signature=dda15697aadf154aab7acd232fb6b730e91bf7846404a17b9ef9434e8f366daa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665A3OWPKS%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIH1CvpEdEwa7W00Ykmrt312ddB3dbIivQua3cVAG0SnnAiEAzUlyJo3HkikY8n6Ykk45Y%2BjX4DRU2XdWloWa2KmTvrcq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDG8G%2B%2FyKKxO%2FdpHyDCrcA%2FNMcvVgKHnh9C4k3PfuutmVnRYbq8bDPAPvRA2ovMbvdA8LUEIUhV4aa9uiq%2BLV40fvHIrhXcsxWrDLLA6ahMly1rWpb1GDWukWjMGveuniXu4oRqLu%2FhBXjOT1B1bLUya05L78YltzwvwLNpCKTPsIo%2F6ezvFoyXMwc9oG1MxQomY4eX3RijGglb%2FvL7ttlMFT9avIkNR%2B42fPPiRuTwzRkNt1tqllHv1QM2vOFcdI3znodc%2BEu1su6ijwgoxj%2BbSBmI5sWx3UcWhHo79oNTUfPZlh9H3DBB5X2NBlI8biosF%2Bc4yU1uFwtKVHfTOw%2BPwu9qsnI6HXl5Xe%2BicxN3SOps8wTFHiMu80oPp5yXi%2FRytgpdu%2FLw7Nt8kbdngyfGnmsTtFFEFeSXqEeHbLKBcX5bGTYgeQ%2BMJyMQ%2BGR%2B6mmWGOlqS7fycdG4X3YthwpHLAsA0G7C1vWQyFbv5wEuzabEfZtdRLeYoBwg5Y4daSKNZiwatmMzsaXnOit4Wx2Za4mAD%2FfOqKjH90WTQy2VLXB6zPlshoY%2B%2B7shWl%2FVDmeCxVwBpkPF%2BEOALjMBEPzPOl434vyASisKNNuX5PD%2BI4c0hn%2BWnkXQURtJKzgBPGtHKLhJsaZQykd9xsMOKu6M4GOqUB87CrcXomtQzO0d8jCAQlBKiCGniqMMleikF%2FUXd1orWh5YpdZnR0hji7uGyNGYhs2oJBvfLzU8ptcDnYFk%2Fu6oOCNvMmNpgkoJJoTXlryj0XW8GVS5%2FNdaHHWVXu%2B0a1iLQFA0IMxhAZ%2Bku8N6lrKRtiH6i9adIjehT%2FWJdMzKoPaB4iLHbX0OlcYJXxEQplP7bTuVlJyOzImFHH0xelO3o3KOkQ&X-Amz-Signature=dda15697aadf154aab7acd232fb6b730e91bf7846404a17b9ef9434e8f366daa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ALLPYQJ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T111906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDcSR5K54mlsktF7JDzP88dcbRCWd7NkN%2B9LVD6%2BjprOgIgBbYyPYRDg6PlAWbvnkMAOQ%2BluiRYgJ0bgsTj%2BvW61wwq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDHxGJN7bbpOm7z405SrcA9hEtRwPwVPrX8%2BVWCv26r5txwXtRy0AD3KDevYrUXSu2J0OUZi8pCtV0NXqAX90mfDDHAiqKeyNTBYmRptcXbLjcCsybmMoSgfFLZoIHWFgn9RHPsQeElwnZRGl1t6mSj2RUlNy760OI0RPFNP32w%2FQRR5LGtlnrpSoMiensw7YgHYc6IK%2BTFwYQKB9F7JGuIyVVSBJfFGJWFG%2FpJFi7nnxU0CsL5laQt20IKwpEFvzhu1Sh8ppVDofh9GFCNucvesD%2B6VPLY6ZIAvRd%2BJBNlYUCYNFGqe5QjXaoozHnfUUX4Zl5MXVhaQdy7%2BVFyCA%2Be%2BEp1cJWLwy9v4sYX52yqDQowva7McOYTS7R2s7DeyQClRcxDw4NbFcd9Eu3cugE%2BjaD0UWHJB6uYKZ%2BZm8VE52Ue6691Xrbf0AM5WuJGou9%2FtZWJbA7h3Ppuc2dS0q%2FG2Gz353lDGuMZlbcBxgyT2pDMt5GEM6hH3YBBP4oXmJ6gUlXI4OfIldEp4%2B9umGM4i1BVCHrnMzCOtZhmSsCX2%2Bvxi8yolwWqrEt%2F87sD0kF%2FjcgtyPeeFUtvJPkh84eAIlVi9tlgEAezcHtPVp2xetrCVu0pOqFUFq2PrhxWtivfYZ3uhXRAqe2QVkMI%2Bv6M4GOqUBmB8RkgJgTINYm7EPDO0RIJHTv2kxDAI0G3XoHWOZFRh2En1EDOtmHFtqXMRealiz4nra48dgxH5BeUUIO7AgJ0Oj%2FIF%2B%2Fp3uscPIMv0RcKcuP1j3pZZjSCk04P7CbJDY%2Fj6ILZgO9WFxWKtJukWPlZhMXZUcsxMynVF6xKP5cZwE4Xt%2BNVhm2KtLr0D67Zlc0A2JPtg3FocXn6%2FGeZrdgcs0UvUl&X-Amz-Signature=8c1530938adda50452e1c8d5e00d219831a749e57a0813b9494d29117a6012ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

