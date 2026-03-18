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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZ7NEJHC%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCM2FDc4hqk3WRq6SwbBPEI2qjqc50hcVRB14jgEvLRCAIhAOJDuqj%2FMQ%2FeDLU2RJSDhf9JSlhvJPOQRkzgqux1wF%2BOKv8DCAoQABoMNjM3NDIzMTgzODA1IgxV0wx%2BtSeAqpDp4cUq3AP942qtmekmnFVwxotTGenekbRJITao6QKaEgAMCb7erY35oq7SYbbRa4T0Rl5hZgTZbyBBGTd3f6Jv3eNYYRBh7S7RQfysLheCEDlGmgq6qwXVifmm4TZdcFXY7OWHfxyXn0A1TU7nFegkGL0A5CBVecZ07l%2FVvKCva7rQHoz9Ih%2F8XjQ3beV919XdFdnI8tJCAWn5ZirisQHEmu%2Fgb3XYFuMl5E2RVgtlKcGce98b37DQSNu7gPPDQCE6Q5iqRWX1Vxjt37gKrNRrC8BOZBV5E%2B6xVfKov6QWzL847CCDfTMPGxJWuWuDsKXTSHK4wg33RcxE7QV3kA%2FED2EBkrNHj%2BUJZ%2FXQ8msOCHSgFIoGyhSgAYZzul8Z34v54YmQuGl%2B%2FyOEr0bUMp9YZeIa2oBPK2pUdUNqAHLwHaUVa7QOjc54%2FfnkAWylm6%2BUWVVd%2FmufIeBrzsfoyuJlkyxx66mX9fGKfabAGCUH18d9bvQxDlDMTNzydnz0hsBnA%2B2reLpGiHf20oonjVl5119P2bDFvdcLzjEnFDxaQVNwFY1R70AbpeI0YBrUIJSnEYiWMTKCEjLQvb6M%2B%2FTiWyUFYLhGp0Gt2Nme27HnU74NEmz7CYpDNDvb3d66UEhvkzCapevNBjqkAdeIjNz%2BKfHkgkCXNSSbzsxGEgvV4c1Z3N0f6X4ltCJgk23Rl8HhJH0hbJ2hBN8hR4kUvNizkIDcsqRyeBUfkzZTSgrIP2DL91gqMsrJFTjhBGu1AgCWOwelfARcliArhAWHPrnJA40UgR3DiBVFTUYg6V1mY4Jb89ESs3%2BFsGplO3KT9TiXw%2FZYwrFv7V2znARw4g8ku3NgxV5gF05bo5967QcG&X-Amz-Signature=86057f0a9542621ef89946c0fd3fcf76974d73d9c3309aef719fbebb6f831b17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZ7NEJHC%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCM2FDc4hqk3WRq6SwbBPEI2qjqc50hcVRB14jgEvLRCAIhAOJDuqj%2FMQ%2FeDLU2RJSDhf9JSlhvJPOQRkzgqux1wF%2BOKv8DCAoQABoMNjM3NDIzMTgzODA1IgxV0wx%2BtSeAqpDp4cUq3AP942qtmekmnFVwxotTGenekbRJITao6QKaEgAMCb7erY35oq7SYbbRa4T0Rl5hZgTZbyBBGTd3f6Jv3eNYYRBh7S7RQfysLheCEDlGmgq6qwXVifmm4TZdcFXY7OWHfxyXn0A1TU7nFegkGL0A5CBVecZ07l%2FVvKCva7rQHoz9Ih%2F8XjQ3beV919XdFdnI8tJCAWn5ZirisQHEmu%2Fgb3XYFuMl5E2RVgtlKcGce98b37DQSNu7gPPDQCE6Q5iqRWX1Vxjt37gKrNRrC8BOZBV5E%2B6xVfKov6QWzL847CCDfTMPGxJWuWuDsKXTSHK4wg33RcxE7QV3kA%2FED2EBkrNHj%2BUJZ%2FXQ8msOCHSgFIoGyhSgAYZzul8Z34v54YmQuGl%2B%2FyOEr0bUMp9YZeIa2oBPK2pUdUNqAHLwHaUVa7QOjc54%2FfnkAWylm6%2BUWVVd%2FmufIeBrzsfoyuJlkyxx66mX9fGKfabAGCUH18d9bvQxDlDMTNzydnz0hsBnA%2B2reLpGiHf20oonjVl5119P2bDFvdcLzjEnFDxaQVNwFY1R70AbpeI0YBrUIJSnEYiWMTKCEjLQvb6M%2B%2FTiWyUFYLhGp0Gt2Nme27HnU74NEmz7CYpDNDvb3d66UEhvkzCapevNBjqkAdeIjNz%2BKfHkgkCXNSSbzsxGEgvV4c1Z3N0f6X4ltCJgk23Rl8HhJH0hbJ2hBN8hR4kUvNizkIDcsqRyeBUfkzZTSgrIP2DL91gqMsrJFTjhBGu1AgCWOwelfARcliArhAWHPrnJA40UgR3DiBVFTUYg6V1mY4Jb89ESs3%2BFsGplO3KT9TiXw%2FZYwrFv7V2znARw4g8ku3NgxV5gF05bo5967QcG&X-Amz-Signature=86057f0a9542621ef89946c0fd3fcf76974d73d9c3309aef719fbebb6f831b17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PIK42CF%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDuT3RJg2CNrEnPgQcPNdT1lCerNpUQXw7V3BxpAncmRQIhALrmWOs7jsH9liwb3rR0iqstuefipnft8fxIYGFLS7cpKv8DCAoQABoMNjM3NDIzMTgzODA1Igwz0mdImlJduXy4ldIq3AP%2BFNLVcqifHx7ccPRFd%2F1E3GpVwbVhDKrnffWoLjKEezCa4Q3T6SKR7Y3wBLUfkNy4lMhRU6piyRdmQysimJpGXN1lIUI%2FcWvaFgUsriB2gR%2FFIDwaS4Hdup9Zn8rvsDYM5o7Tz7nD1PVhKsoM%2BfqKGPrN4ynSblSNpwtPRtwp7Df9XHXHMeiwO0e%2BL0K2pAcGK6ntx5a2netkvr1XuaGGa%2FsAkUxXo5NIjXNI%2FjVderfBI%2BYsXF9lEJX3LCfcwgAAbySobIxjsLR567IMjZVflPnm6MOFIwXb3I%2BXsOJrh%2FdAGBUSng0DfL6ZJ5tqNl3xh%2FP7eikSDM6DPQaxswaFl29LcCkraOohW94NNagq%2By1%2BW3aNFjRQBZDJEBFNquzBmQJ%2Fax8%2B7Jn%2FMwqlXuUL9KoEnfR6rXtMu8qnae6UkVPvh1baFiqsZQ0AQEABtGMoNbbNiQbViIbfOsvbMhwH%2BSTmI0%2FJ9HZqB3nseZASNuepmMcBKsOrKYZscKQ739vz6rj%2BnKoYxhMEEzyhTy5D4Vk3hsPVu%2FV8MxN0TIkMeN05TQz8H5kfEonZGhUOPPIJsuJxikJhxJS6Ht86zvcomzAkuku%2FmIgKZPk7NIt36YonSrJtKoHoHyJ%2FVjClpevNBjqkAfvvLivBbMKl%2Fg56udzQU3yfGDW%2BIVemlH4cGlVfxcAj2lmTHTI4SFzM4wgjoPL7ucHh%2BwcMT%2BnRsTnaOY%2BrWt8dTU90DMXJrt9s5yVQVDtUJAgpw2O31IRpmZOMJ6DOrIAvsJLkAmMinxVtxi9c31Px2GjOUq9LV3%2BDfYBpeevwa2d10j6enmT65jl07FqLLWyNcOYCGcG1nx%2FeF3UK6z1Lmqt2&X-Amz-Signature=effcce8163650b43d62d3bb11c5f5324ea1e8f33c7228fa0af609b2c02961c55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FQ4ZUYK%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCiDN6N7QR%2BfERmeWuX2418kmqmrhp1LrekaIh6AqoNFAIhAJANjWc4TSAuxaH0laKcdMlZ4J2pcGNsBGEweBbHHN8yKv8DCAoQABoMNjM3NDIzMTgzODA1Igz629tmfcSl7Ad%2B6Gwq3AOGXyjzU2jWZC0hUWYgc24SfQEnYVI3MPakBXUinIYyBS%2Bf%2Bm6UmShKQhR2tV6Zps6ouTXIFxz95bhvYIUt%2FHMZLwlEFJb8pkJtyN6hhmbJJUr4FDQzr%2BmeNceGau9HGTymusGkNAKCfrUFxKxUnupLR1yBxnwmiCJ%2FURhKrmNLouEquCr4OmVYeprGWrr6CVyUxlH%2FMxHg64KM0SJNIKATxc2d%2BKvB6hZ31s%2FAlE6ogEEDfOIVJdSmyoc44EG0brydPb8vdvUUzNxdaE6Tr2n05ve%2BOstwwnZF5nEhHK1Re0wk70WLmYczue0BYrCcNUdAXWGThPMX90SEZE3EBR6P8s1gy6p5FzVniKZK6VSt9bK0dj9uSNoWPJD%2FyhMAOluN992KQ3P%2FkiJBTZiWVcGH4Lzqjom%2BxwWt5NOHLEzucfwLorMwea94%2FFkCrg2Z3HpZ3pIZX%2BsbMn7XjuyCxuMKVVLRgy8SASW077NL5N%2F3XfcgssTEcQHqix%2FHchIru0mJpbO0xVVciw%2Bv26%2FadCM2o8thGCm0CKxPAe%2FesECMwFboNJMrH313F3SAZ4rE7Pg3FqfSgzIn%2FHq22ofq6gR83GzOkqyoIwJaaXElrTgAK%2FGXlrmFbzt9xgKnTTDxpuvNBjqkAVx52ocRNdkMOM1bCd5g%2FWDCsvXjY1DEY9w4Jw621zzu3y1kDjCSDcJIb9OBZ2EFdPMyBJqoSprIc09cW2yG4K5AWRXi9hvewA0Y6wJzgTpMcOipoRlBuJtQbvqeRa3PoNP1FdyyHYt9h540ixjfGK7SDQIV5aiHdjWXr4P8TygVGMZDGT9qAHgWKMY5TFfClkpgUO6%2B7BE6qqR8tP5vC0hffSvm&X-Amz-Signature=37282b9cf29948bb0a92b811c43404694e3b75c3328790a7daa2e57b5d41122f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FQ4ZUYK%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCiDN6N7QR%2BfERmeWuX2418kmqmrhp1LrekaIh6AqoNFAIhAJANjWc4TSAuxaH0laKcdMlZ4J2pcGNsBGEweBbHHN8yKv8DCAoQABoMNjM3NDIzMTgzODA1Igz629tmfcSl7Ad%2B6Gwq3AOGXyjzU2jWZC0hUWYgc24SfQEnYVI3MPakBXUinIYyBS%2Bf%2Bm6UmShKQhR2tV6Zps6ouTXIFxz95bhvYIUt%2FHMZLwlEFJb8pkJtyN6hhmbJJUr4FDQzr%2BmeNceGau9HGTymusGkNAKCfrUFxKxUnupLR1yBxnwmiCJ%2FURhKrmNLouEquCr4OmVYeprGWrr6CVyUxlH%2FMxHg64KM0SJNIKATxc2d%2BKvB6hZ31s%2FAlE6ogEEDfOIVJdSmyoc44EG0brydPb8vdvUUzNxdaE6Tr2n05ve%2BOstwwnZF5nEhHK1Re0wk70WLmYczue0BYrCcNUdAXWGThPMX90SEZE3EBR6P8s1gy6p5FzVniKZK6VSt9bK0dj9uSNoWPJD%2FyhMAOluN992KQ3P%2FkiJBTZiWVcGH4Lzqjom%2BxwWt5NOHLEzucfwLorMwea94%2FFkCrg2Z3HpZ3pIZX%2BsbMn7XjuyCxuMKVVLRgy8SASW077NL5N%2F3XfcgssTEcQHqix%2FHchIru0mJpbO0xVVciw%2Bv26%2FadCM2o8thGCm0CKxPAe%2FesECMwFboNJMrH313F3SAZ4rE7Pg3FqfSgzIn%2FHq22ofq6gR83GzOkqyoIwJaaXElrTgAK%2FGXlrmFbzt9xgKnTTDxpuvNBjqkAVx52ocRNdkMOM1bCd5g%2FWDCsvXjY1DEY9w4Jw621zzu3y1kDjCSDcJIb9OBZ2EFdPMyBJqoSprIc09cW2yG4K5AWRXi9hvewA0Y6wJzgTpMcOipoRlBuJtQbvqeRa3PoNP1FdyyHYt9h540ixjfGK7SDQIV5aiHdjWXr4P8TygVGMZDGT9qAHgWKMY5TFfClkpgUO6%2B7BE6qqR8tP5vC0hffSvm&X-Amz-Signature=ce99e5e59bd0edeac0ac239a27d0d0ba24c25ac1c61e6235f35afd2d2ba4284f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYEWY3L2%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIChR3aqgTXl8hGc7302wCXvfTxVqgYlzGGTUcKHcm2DpAiEAwuGVLMDkA9LtJds1kiq7QwkIQSxOIP2sEIL0r1blzL4q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDELjZSdKOmPCUpeOwSrcA7ZULUY6jXmj7l7ynK4Val6Ow6z6JD7RMBINbkgVWk0zdx%2B6p%2Fo0clwuvGj7InWFEBt%2BMTvkOVNhRBib3644nXYnJ3vLDn9lcY%2BI1DlmNKGzvNf58CCas5SBjJ8bVaEJVb3gxEyQH%2Fg4ohdTnk9EZUo5nSKJVyhLZWNHEfvkbQk%2FZfEJTKubtqnEDsRuohJ%2Bz387nyW2udndava%2B6PRhSsu7Apn3Lv4fhczlsI39HHEtxWqM2jxcI3mq8RBeFlRSyiRDOaHEabmt6oBXHk9HDteemQTqhFItbMgYW6s0aeD9t8V%2FNACItZSXQAtc4hY5MUVoa%2Fg3DOkMZg1zlzA7Y7RCFhBYrLeL4eczogXf%2BVqy93QcuDVn8ePjW16Tuh6Cig8zJBqTG9K2KZDaQuXWT7beT40dR3izXAZk8IkQEacb62Knd7lNO6GFEjPwGwtQb8LF3%2FGX7OzCDJS3X4G1lpIm5aUcQS8SiXCykPsW5A6oPGWfsdtSx%2FTCkHVu93SfieEXrR8GB2b9oxgfe73rvWSUGyEbuLLEV9%2B9zg3n59O%2FPewbkFFwZy5PCnYwig7DFhxCjitdIOivH7kxmvcyEU5wJGUT4CI8jLpRQZI6N%2B2Rxs4TD6CbOKCdu%2BENMPal680GOqUBpnhxcZni2dVwgQLYcNIapIGEEWxzPeUp%2BMcXQBta4feldx9F3gTeKt7PwWA1y67rP%2BHWqMp5JAdw%2BjOOa2gJIN9p5zQM61dzV3x4KxCmV6nHhcf6qgYyVB14DfFvjm9%2F59pmvEoCmagBt%2BNlsFEuVBj8U%2FsOC5lasxXN2sOzHUpM1QdpFvF%2FOFia94mxTEBaXMSLTrMhWxYkQIseJHdC3jHqFvO2&X-Amz-Signature=5ad9f88c343294c76034e801e29a495a860db71716ed9f69123bde0610b75457&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTWSHEIK%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQD6UfFKY49Z9jgElMS4pInjX5z1rf2%2F73tYgV6Ucr64KAIgJnIQJr5tNyrQ8qfzpjFPi4sTmLj66REDvIkDq5gFzAAq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDMIdqJd8Inf9Ob6FlyrcA1%2FcoHd8GBPPCAXXX%2FFgRHKc62zwvw0qBwIcmg43JnfWPSAZ%2B5jcIhJipuUKrzkrMcGniVZWrrmjkz1wh12NKWKu1OzhoJCX%2By6N7Z9LUd02HOC3qJLL7cZmhqRBB5LFK2tY%2FNNlUX%2BZPeRRzEOTfNFNkR2yNTrNtxOsWybAjrWw3InCvUbtx9B7USEyvz3rSlki0quujssMVDW3l8L8URjTEKvseYxMDE7EHf9RIyWeGBVuv%2B9ukgDWV%2BfjByHqJb15bv6Ne0oBDBceOrNvrbFVyNfotV5zlhSSRA4npI9fLzjICX%2BmgecFKvSK3sYLwsITg%2FczcSaJbedX7hrdLgZSkAOOmv8pZ5w9kya6mDdiS1dPiccxqYVLYB4VatUuE20rtSmKZwToVBuLRBwU81GYtwX4p2nCdoivUcQWk4RK5UHkamlCKcELAkvaoaGBFNU9EMrWux5jXbQE%2Brm8f0A3sxT7tMhurMGJr2%2FDW7RLP%2FymNqOAEJHfmC1SSM1zuIjVMsTOvPqZU1w7itPT25wEQ51sUekMT4yA9rMXOJaEKzkOAcmV32wfUWFKP5lYPLXNgEPsPVztFqkS5%2FY4hRpkFjnSZ2z%2B9KMi5LCEDWqr%2BPgqMceB8YjRTEvUMJim680GOqUBEPhvewglinDL8T4Yl6SFj7eseWaSgCNQ67EjVh6znpFnoJQ1BSSHlOy0huDhUq5eUhh5EUcpbcVhsU6uRySnS5wMz0m840fU235%2FLQN8byZrNxyLgdX%2Bo8%2FKoUv72AOQoRLsocwQa1Zzkxa%2F263kD7r%2FDTYBpZFMbADG4muOfgg1BDNLbHJP2aHVqKJsenTbL8eqJpjNEedui8zi7KtBW01gCvKB&X-Amz-Signature=305b42060a8830d19075091ddf278f41f5bb032822cb908aa3d8769ad32c1091&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMOKOOBI%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFryNodFRt9%2FqrSvUVSngesR4KMgJKQ5zPCMOYsrlAGqAiBW%2BXw%2F194BYNBVSGew1upHJnPcJZ0Qi1yT%2B1XpkLclxSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMLLZX04u9OKYA%2FiWaKtwDWIFWx4bFp5jG91UbQqt6Pv72NH0mgVrtRLGO2acEyrUxgJ4fz93CqxbAR7LcSckIS1uqvUzxh9EdTweAzXkOIZMPf8PFAGdisdRI9L%2BX0ETc50om5vdbmrs5LMLUH3uqcA2ZOMD2wX7FXyfkwkgG5fjjyVWpkwkQD9fTYzzLIhX3yJ1ReGKVOZNz8iVDPwuxN1TCrhkulOWcx4Es%2FRF8Qm6Zqs1iQ2r%2FtKutxz6dh1cXNPgGsl%2F56qz2cG4cYSls0%2FePybok8TZx3q1VsAYY5AzTQzd5p%2Fk3jW3Jb0kmE9zQgpW%2ByRqZI4BmkOwIXLkmXq3ZuF04xZfa7nFjA0xrq5HgtBSs8vksrNrxfVhxELKAp1S4qA40Z9%2BpxFiC%2FzolWcR%2FOzTitw0H0hyU956BOVdmlq6W1g2sNu3iVCBL6CE3WRNMB3ZruLGbmtiv69BEtIg%2FNUhUVvAqpd%2B4w25FVLt6e0tA%2FGjPAZXWcmMN2a%2FCHas41uc3ZHyKcuUX1ZF%2F9i56hSUmveUhwhTsR3bR1rbSMlYSq4SjsL2q%2BW565NNvDZf%2BD8zAb17uuRmMzqk8ojQuZnZ%2BZ1Eimla9OzjZYE66W2ctOIoCcuU3UQ01LM%2F2pE7Yx7rBOvYWHzgwpaXrzQY6pgF5lXEl51EudE4fORXKAw7IZL7lAZbjhKGjFPlpxvBzXe6O6T%2BJ4Izi9995szjI829OI0v%2BYjB6QJgskzBO%2FxTxunrndfgM4jw%2Fb20AwuZ17kFBB2Zz8FFTD8KAKnvmJS9SGKgvq3QvtR26Pq1xyz%2B8V1Nr3WrZ4mY286A5yUz07dLRcgid1ii%2BEUuYtQIT%2FMX5T%2Bmt5WLrxJkbCRGXYxLuNXshx23S&X-Amz-Signature=c2a43b4d924329d5c31e6c8b111557ca8097f73486e338dd1bd114d9658515c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663X26R5VI%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDpleWjcSXe3BjI3SvWSZQvoDP1eKoV2ILRn%2FYOBBGqoAIhAKtEPMRmmdPNsZIyywqKmvM%2FYMOYhSzEnioFMsJ1psA%2BKv8DCAoQABoMNjM3NDIzMTgzODA1IgwKgPe9qph9IHMfkCoq3AMcl%2FBMML8c44bxkI2sQqE%2FpDRF7DFjbTBE5eAdQpCQAdHOUzoxMjfGoizpoyAyqhQXWv9hhEomqlulJvxyfSKoIoYynvcLb1ULTNsi6ssrBQ%2BVDrkdasVKHFXENJY0H%2B8BqUoPk%2BFxprpsICofbisRpM5vU4u2dj1W%2F7%2FDDzyYemYQLyVCB72pP%2F%2BUGuaKK46uUPZgzk2GmnvvU5m%2BOTo0xuk84kRfJrp7yrxte98qv60%2FTKA4lYLGiaNuUm75JMceZv%2Fc%2Bd74YHbkYNCM8tzWwHoW3R2I426WLc8nTV93vY71ZLJ19MrFtWH%2FzHz6lraHanVrr8TDnD4Oa6nU0VI6GDaI71phPnxy9m7vqhpVqBmKFumc%2BXjiswS4Rh8B5fPaqrGPphoNi8%2F8orPSlAXQ%2BHvO8E1BowQLxDyCBO%2FSpTkCW7AeLVZb%2BV3hYavFlxtvJQ9cs2tNRActYut%2FTb5fBogo72aJpFWGr8lKcMKPpQgV9k2rbk%2BaznCSKZhLv63kOTPD2nJ9WOQ5o2L2JVTiUV0umsjK%2BGSMuePTa28KbfB%2Boc9w5v%2Fxh2kAxIoMFbMumXL6NcfT6lOVl0dqJcvqQsHOt6ITLPer4VU50xl5GkPZOerdj8ipchDqkzCEpuvNBjqkAf8rqpqik9K4Zvz3YCLBRhZ70nlkVBjikf67YzjYY72SO8d1zTa%2Foj51xoIcho2JmUVdR6uDF3nb4eyxPa%2FFO%2BGiNo46EAddU%2FTsPZNwtXKSr4aWHOxjhOXNl4c1xWsm08l8O66w%2BuaBzpFvStboFdXJV37PiWU222J4QIy0THhtP4qmD9omjxb7GLL9FKXvRxaOp3bYzt2kg4gTVJYEPutLL1X%2B&X-Amz-Signature=b8a5798dda028bdbbbc17887df49e313a119b68c652b6f43650dc8b089cc88ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663X26R5VI%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDpleWjcSXe3BjI3SvWSZQvoDP1eKoV2ILRn%2FYOBBGqoAIhAKtEPMRmmdPNsZIyywqKmvM%2FYMOYhSzEnioFMsJ1psA%2BKv8DCAoQABoMNjM3NDIzMTgzODA1IgwKgPe9qph9IHMfkCoq3AMcl%2FBMML8c44bxkI2sQqE%2FpDRF7DFjbTBE5eAdQpCQAdHOUzoxMjfGoizpoyAyqhQXWv9hhEomqlulJvxyfSKoIoYynvcLb1ULTNsi6ssrBQ%2BVDrkdasVKHFXENJY0H%2B8BqUoPk%2BFxprpsICofbisRpM5vU4u2dj1W%2F7%2FDDzyYemYQLyVCB72pP%2F%2BUGuaKK46uUPZgzk2GmnvvU5m%2BOTo0xuk84kRfJrp7yrxte98qv60%2FTKA4lYLGiaNuUm75JMceZv%2Fc%2Bd74YHbkYNCM8tzWwHoW3R2I426WLc8nTV93vY71ZLJ19MrFtWH%2FzHz6lraHanVrr8TDnD4Oa6nU0VI6GDaI71phPnxy9m7vqhpVqBmKFumc%2BXjiswS4Rh8B5fPaqrGPphoNi8%2F8orPSlAXQ%2BHvO8E1BowQLxDyCBO%2FSpTkCW7AeLVZb%2BV3hYavFlxtvJQ9cs2tNRActYut%2FTb5fBogo72aJpFWGr8lKcMKPpQgV9k2rbk%2BaznCSKZhLv63kOTPD2nJ9WOQ5o2L2JVTiUV0umsjK%2BGSMuePTa28KbfB%2Boc9w5v%2Fxh2kAxIoMFbMumXL6NcfT6lOVl0dqJcvqQsHOt6ITLPer4VU50xl5GkPZOerdj8ipchDqkzCEpuvNBjqkAf8rqpqik9K4Zvz3YCLBRhZ70nlkVBjikf67YzjYY72SO8d1zTa%2Foj51xoIcho2JmUVdR6uDF3nb4eyxPa%2FFO%2BGiNo46EAddU%2FTsPZNwtXKSr4aWHOxjhOXNl4c1xWsm08l8O66w%2BuaBzpFvStboFdXJV37PiWU222J4QIy0THhtP4qmD9omjxb7GLL9FKXvRxaOp3bYzt2kg4gTVJYEPutLL1X%2B&X-Amz-Signature=557e41752a25665522fca2aa373cdab1672963c702d8dd87ca2e803ef2b4670a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCOSNYDA%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDYqqnGS3Cj2rXUMq1w4SUlITg6nlHqpcxCT18vsdxVFAIgUKYOh34g3DVK9iBH9H8MI%2FLEYjNzug4dzKhLSMLllaoq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDKHql8Oj4nk4ycvQryrcA0fY2uwmY7MKmDG4%2FGil79j02t0hgG%2FiH13gkECqnDG2h%2BmlOkCz%2FcTtX%2Bc7B4oQj0djCx5B7JnD%2FeooQyV1XdFsJUqBcVjZM95TpRg2XrJKsGJz74turtEZZaYV6X33oUFHiVLtGkZ7d0XHtvVX25cp478KbAtSYiyVYLLn1VMT378l%2BrraORUExw0op2psyyUMP73JYqqND4V7jDz0zMj4bquoGL7LW7iAqUcE5Bnd%2BxZciSLcQCZ2Ww3JLvPslmbLLUKNHGBlqvF%2BK2auhYakLYyxRz%2FNJq0nVeygmPy0v9yb4vnxajAe60NLOSLSSdGJs4YeFgqASYUQQ03fyEKi6YrA4GyK6uuIm8puhcK%2FzsQ7%2BO2qy4zVFrP08QLNyLYQoo3MwW6ipg%2FP%2Bbpl8WAbgPknAqxcWpW7o0QESNSAoxOiksYZbR%2FlM13ViZyFW0wQEqcS1Jd3Uaod3Av%2FcOgaCTQK6qjWPpP2UV6QWDjRRAJE4KBPaEpLOXqFUlWsYvBCgOGgOzrNGU01DbsFt9atsdzuuGGlATWGsBiIfebqnvKvczb4yr%2FIWSb2Bsm48ixtguWyvU5ozlZoc1qzz2o6OmciQY3LK1BHLaavH3HexvANlT5YB%2Borldn7MOak680GOqUBBKMLMS3a7BsjfwvBsnvQ4i%2Figq2Z9XOg6GqyOtQ7eomMPcIA2%2FqAviRRYbb2rUwqvYVD6C6Y7QplCQkeUz7PFxP07S8maZRYwTUno5E1G2d71YP2n2bSrx%2FpbZwl9X3UsT6%2FU0p%2FC%2Fimiwu7Bvii5Ak8OkfzcYP%2BDuqM8CKPVQbs0XGCFhHrbNZYltPEX8tGJZpzz5T%2BNih7AArVeqsnaZe5nn00&X-Amz-Signature=ab025afe32bf9b214f2acb0e391adcddd03c3f9f9ed676b0e64ed23d36682dc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJD27MJQ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIAxjnJDJl7zGk25Q5LP3DK7YWDl33s3WVbpX8LMGE2LtAiEApDtYsFpkk1VLQW2V3zk7ig61EDFFES9G6ufW9KOveDkq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDNThFTi3LSOmFnVKSCrcA22U3z51N2JLhMAaNekWIIiitxdeUxGzIYmlaWIaUyQPx36Oy4WZz1ROLP4lxtsqyXNrooqbquNO0UHux56H5AoW4Vm8fjjb5z2QuNEVxPv%2Bjumq4brlWsmnSRxovmCqOgTsRMseCgyDM8IFZxBmujZSQb2Ds%2Boaf0KzgDHVtkmPtBEMM6g8o4sKO4eFCBz2LEFbtAaDmOPfd4UFAKCcXUpBuC8GXEVR0s3YqArEQYpo9OilNT7LX7GjcgqKY1BJecPpOp4qcvTtMFoSrGgvlvxVUbuR3Irn9qAx0XxkS8txVSHfn8202r7cykuJtMV6%2BYCGAmHyNLSunaXoQt6r5h0F2%2B3QMKYcetcwmfV%2FGEfRx55fyS8XUlO4K9t7V2AN7vrHe%2B2JuDZDblkTBE8MQ8NibHZrDpWiBNGmNPPcYqjNXqZhHk4dpZ%2FtE4KWl5urzrk3DuWtNVdW51PyD7VDJryJmG0OZhbFm0iWPRxW%2Bbn9D%2F3FvyQ4F1dyDmCJ8KlwDTYQGAVj3rN%2BVPP7t7GDoWVA6jR%2Bvs2dnOI0xT15Fg%2F8u7yb0%2Fx2JlHJ2IoTUVs7RGoMwcCTHjSyPl5xEXlqiWZmW%2FsLsu2xT2xW7w%2BqIxk4xQcJO5KIMDHiQfN8MJKn680GOqUBZDeyZ%2BU1x7CmS76HsemMCVfrOdfKTqHbGh0hFCtsNp%2FYqeirT34kjfNf%2F%2FBh%2BG%2FwCPtVeheDrLHSgwEfMkOxGovubSkUyIU5cMO3FwjGWwMY2q2cxMAWyMd4UDPIREJ7otVVnauboae1Th8IzhXWgg3VeObn9Wih4rfitAiBhv%2FZJGba0%2FYFTnNPhg%2Bwyr1KgdWK62QaQsPH1GxwV1yR2Le6ZTMV&X-Amz-Signature=ceb29ff22e8b162aeae9b0e003bd590d8a7b5667bcf3a1a38320a08c8e591406&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJD27MJQ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIAxjnJDJl7zGk25Q5LP3DK7YWDl33s3WVbpX8LMGE2LtAiEApDtYsFpkk1VLQW2V3zk7ig61EDFFES9G6ufW9KOveDkq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDNThFTi3LSOmFnVKSCrcA22U3z51N2JLhMAaNekWIIiitxdeUxGzIYmlaWIaUyQPx36Oy4WZz1ROLP4lxtsqyXNrooqbquNO0UHux56H5AoW4Vm8fjjb5z2QuNEVxPv%2Bjumq4brlWsmnSRxovmCqOgTsRMseCgyDM8IFZxBmujZSQb2Ds%2Boaf0KzgDHVtkmPtBEMM6g8o4sKO4eFCBz2LEFbtAaDmOPfd4UFAKCcXUpBuC8GXEVR0s3YqArEQYpo9OilNT7LX7GjcgqKY1BJecPpOp4qcvTtMFoSrGgvlvxVUbuR3Irn9qAx0XxkS8txVSHfn8202r7cykuJtMV6%2BYCGAmHyNLSunaXoQt6r5h0F2%2B3QMKYcetcwmfV%2FGEfRx55fyS8XUlO4K9t7V2AN7vrHe%2B2JuDZDblkTBE8MQ8NibHZrDpWiBNGmNPPcYqjNXqZhHk4dpZ%2FtE4KWl5urzrk3DuWtNVdW51PyD7VDJryJmG0OZhbFm0iWPRxW%2Bbn9D%2F3FvyQ4F1dyDmCJ8KlwDTYQGAVj3rN%2BVPP7t7GDoWVA6jR%2Bvs2dnOI0xT15Fg%2F8u7yb0%2Fx2JlHJ2IoTUVs7RGoMwcCTHjSyPl5xEXlqiWZmW%2FsLsu2xT2xW7w%2BqIxk4xQcJO5KIMDHiQfN8MJKn680GOqUBZDeyZ%2BU1x7CmS76HsemMCVfrOdfKTqHbGh0hFCtsNp%2FYqeirT34kjfNf%2F%2FBh%2BG%2FwCPtVeheDrLHSgwEfMkOxGovubSkUyIU5cMO3FwjGWwMY2q2cxMAWyMd4UDPIREJ7otVVnauboae1Th8IzhXWgg3VeObn9Wih4rfitAiBhv%2FZJGba0%2FYFTnNPhg%2Bwyr1KgdWK62QaQsPH1GxwV1yR2Le6ZTMV&X-Amz-Signature=ceb29ff22e8b162aeae9b0e003bd590d8a7b5667bcf3a1a38320a08c8e591406&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQGW7IO5%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T193943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDn%2F9X6qHv12XICkdaQpA2HQRjZCFQ3uPrqnsUyqd27hAIgA2i6nkEGvt3a%2F%2BEwTsNYUqnxkcn6tctVsnKCrx9D1%2FEq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDJeQbuu3YqAQZ2EiWircA50HbKnd4pfCdxUAAHI9n8%2BU8Ezh1FxrQWCA2WUjk%2FrRCSBRw81Lrzj%2BUoVQNfrB15SVS%2FmFsJ2cu665EDWQ5q5S3zoXHxlJTwZRamL%2FUGnEZ%2B6tT%2B5lzJsgHgIp28x2rtRQSm8wPGdhfIHRDEISkokCEIBOTycln3lf%2B8KzpkF9RVDzgKEf31f4d6Xw3envBKuBmA9LoYbSsVHPxJcywYaqr9yO%2BV7YSSvgEGMmdBNLhzuaXKySHpO3pVmDChM2dp4%2FT8sowb9VkZsmw%2B6Tbe5RL4AcFOF6rXClfL8KVw49zFd7AGScbZrdGmQ%2FFKNTr2m%2B0YLABtgbXY9zAweTwr9VHyRfz75aqd3xbaIdseULbyfYfuauPVr0OSYcmEIM0Ruvr57tgv8QAEQ3gmKeNTHr3wBDILz7OGsn7ASQQuySqoM8Q%2BmfPH%2BOv8sNDRCoT6M9WZJmGeMiUX0ePmsUqauVpTacyXkUXsswBz%2BvhWnsyNBQEhym2EyH%2B3yjRAaFZnd8REakvj0as7C17cbzhOzO84ug1PPnprAzRrnosSXlJT9khwokJY1YYrON37FMinrkPnodcEMlXWyVkGnZR%2BL88tmHDUcSovq5%2BaQHg0OhKE2K0GxI4AY%2BwXNDMIqm680GOqUBZx9a2QzSdhU2mL%2BsbYdH2dF4XJMD8S3N3xG47W4aWlqYaI9HRr1C84peU66Gex1BBELxrBsT9QEHBewaZTXI4tHMMGd5slFCH6Skidk3e6LDxKB31%2Bz1AX7qnaHbo1gA7iE2fm5V88Bl1om0NFZrgs3XlV9ZiR9%2Ft8ObLaciyj80H6Lzrkbm3xkNjwhQMdFmYmY0XxNPUkbSlC1%2F7X65zBqaoTEe&X-Amz-Signature=761f339d7006efd8f26efde5f207eb4dfc8b45084e998bdf37fd4c107b4ad807&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

