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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRWUWVMU%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQDF1uw89AJ78VzgYKXREz1TkSgm04BOZ9YS5LGP1m45AAIhAPzcLCNzi0LItmgATYvt%2BJJltWEyaxt46IJsFkx%2F5ef6KogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwkrvesD%2BBfi882Ap8q3AMOUJ3kkvYiW7Z2mpQo%2BE0ratLJxUYp7lXjNRyKkxR0tSh72bOqrtV%2BjwWHhqpEN%2BvopidDc1cTwJKgTcI9DO5E8mJbSVJjtdELyiTPd0KpkyGJqGPA4Hw2bCenlgXWD8fN9NUY%2FFx2TiY5gkHncuYFqO2M0WXU24h9WP%2B0k1GoT%2BFfaQj8HOL7EOio%2BXtjbmjOjQXc8TQ8U08U%2BqLtDKk09a2E11gaVNwvXl5iGnisDz%2B4HOC96MASDGos6NY4ie2IZ%2BAFDj6aH3I6kQlHmb7inVdg75TDE62i6b%2BKQHtmZZ4AKm0NqIpT45XOKAyXxUFtKnkVsT0t71FUw2Wg%2F7fVdQYu5o164gI5KTFNMV2GMRlSobAP4k5cTydDdGTKMdmm87pxf25390QltIARaTP2aa5MvaCAkFCdfReeCF8vNg6wbGKeQKra6lJiL%2B90SgDEo%2Fuik1fo%2B2W4FNUXEweMX13iEG0k77L5fVPM2yMKrUGWwuVClmkMkTO4fQgeEcJt5UzrpFcUlqZege0rF%2FtKphtY1fF1d%2BHsISiZDc%2FDiI2lAqU9zXt725aW3r1zupy%2FTYTAKtli9aY%2F8SWCt%2FVIlRDCAJEZHCFwLPrSeayumINNnORBbCNyXlOM5DCAnMTLBjqkAaY09uYB1zXqnOUfV7Et%2F6jVWvSp9EIgwRGJyVm4wH294xQKdO94VKn91dgDysRjvBybF7UVkI%2F53ukvWsaCbsE93gGf0hASsahZR1gOn3qNuRsFVpiQCYMH0AWtwRN9frZZyhK2NNxdvTPe9zmYsXBDhJAmo7TaSrnLS9Vl86rGAFRGVpRVurOMOs%2FFLsbZGkCB%2Fd8GesziroFekGvKmqRG%2B8%2Bd&X-Amz-Signature=dfb430c1bcd16b126116e8eb4b0f673a6f811dc3dd740ab900b73f18a01277b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRWUWVMU%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQDF1uw89AJ78VzgYKXREz1TkSgm04BOZ9YS5LGP1m45AAIhAPzcLCNzi0LItmgATYvt%2BJJltWEyaxt46IJsFkx%2F5ef6KogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwkrvesD%2BBfi882Ap8q3AMOUJ3kkvYiW7Z2mpQo%2BE0ratLJxUYp7lXjNRyKkxR0tSh72bOqrtV%2BjwWHhqpEN%2BvopidDc1cTwJKgTcI9DO5E8mJbSVJjtdELyiTPd0KpkyGJqGPA4Hw2bCenlgXWD8fN9NUY%2FFx2TiY5gkHncuYFqO2M0WXU24h9WP%2B0k1GoT%2BFfaQj8HOL7EOio%2BXtjbmjOjQXc8TQ8U08U%2BqLtDKk09a2E11gaVNwvXl5iGnisDz%2B4HOC96MASDGos6NY4ie2IZ%2BAFDj6aH3I6kQlHmb7inVdg75TDE62i6b%2BKQHtmZZ4AKm0NqIpT45XOKAyXxUFtKnkVsT0t71FUw2Wg%2F7fVdQYu5o164gI5KTFNMV2GMRlSobAP4k5cTydDdGTKMdmm87pxf25390QltIARaTP2aa5MvaCAkFCdfReeCF8vNg6wbGKeQKra6lJiL%2B90SgDEo%2Fuik1fo%2B2W4FNUXEweMX13iEG0k77L5fVPM2yMKrUGWwuVClmkMkTO4fQgeEcJt5UzrpFcUlqZege0rF%2FtKphtY1fF1d%2BHsISiZDc%2FDiI2lAqU9zXt725aW3r1zupy%2FTYTAKtli9aY%2F8SWCt%2FVIlRDCAJEZHCFwLPrSeayumINNnORBbCNyXlOM5DCAnMTLBjqkAaY09uYB1zXqnOUfV7Et%2F6jVWvSp9EIgwRGJyVm4wH294xQKdO94VKn91dgDysRjvBybF7UVkI%2F53ukvWsaCbsE93gGf0hASsahZR1gOn3qNuRsFVpiQCYMH0AWtwRN9frZZyhK2NNxdvTPe9zmYsXBDhJAmo7TaSrnLS9Vl86rGAFRGVpRVurOMOs%2FFLsbZGkCB%2Fd8GesziroFekGvKmqRG%2B8%2Bd&X-Amz-Signature=dfb430c1bcd16b126116e8eb4b0f673a6f811dc3dd740ab900b73f18a01277b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JZK3GQD%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIDg5tB4VsAftIAVXM84U19Tw4YeQ2TFSNHA1UTOD50TbAiEA3H3Q1x5jQS3sfBNQS%2Bm31QqrngrjXWv26YmXgf0d5XkqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM864aZYeuAWKCK6BircA3baMQzDLh9L1Mx7O0KGf0RbzG%2Fa0Ve3TI1wKNa4QIdyT6JpVljzi7mJv31CNwRCkE61JXEF%2FYbsaISb%2BtdddnnlerlioXMzhMjV4qICWD5FjfTATukK0ccbLfkxsV3pUK48GeKui7v%2B46iti2y3dJSDOcU5kEt5vuqUU%2FHkJfD%2Bmsvy0nBwvI7QVYovwKkWXQdy%2BO%2FVQh5fWv%2Fxje6ppZythKGcuejhgBGtrnwURxk%2FUa%2BfMclAkeFfyoiuothM4Nv8qQfsI9PzQna1g5JCdrFVyoTJlVZKrB4fDbGp0LC9lOmK7C72o%2F3DyWE8w0ZZwYjKL5I3XsMCbM798ayvP8q%2BiGnvj2hCH5t60Oa1SFIMCd%2FMgzMi0ae0JJiY6ua80gRkO5DZtGvEq1s4Lj%2FAFY96z4AKka747bDsjshWWCugdZxjAvMIVePwZ6wvjA5M1RGL9x%2F1C7%2BR263LwS73spFOp8QV4%2BWnHB2NbEgkJzOrx%2F1k8wrzssERq60BvbgdqAKW%2BkXxtTr1vEShD0MQ7lllTekzzelNzW3RCo7%2BcRcOuxeB%2BlPWUCn8CJc3ohfitqfUvac6uMpSqRmtKjIbfaBmkkvvuEBQpJobmOUqQncSpe3DSYAXsLK1VMrFMNiaxMsGOqUBDTMcpAH9c%2BwPNYlyGDdtYbB9FJqSarEC8Y6geKyo7msWPwkngyPsCtJ8UJ3APjHX5mwpfTwkmpMm6NwIHHqnYR8j%2Fmd39iBoeOk0Sf%2BNs5C5tYdh1w%2FgTeff0snjHbzhDgYDjNMASmoNVHGbYuondevANp5f1YECUF9ZBmx%2BxlZcz7GJRMt4xkKpiytyuv2Ur4q%2Bf40yxbNfewRnOPMrCdI5vzBH&X-Amz-Signature=5186a0de142a194a4d60d1ad040b09603ec7ee2636a876bdc61632ae57017bc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BH7WWVM%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIGAmbw1sWKET6AWaA8hRw%2FqWiUrycK2s3VrW7pdGXu7xAiEAiJTbOwN16t3%2BUAgoaedPALpUKYgDw15SqAn6lg9i%2FH4qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIISzOBmcxaYsaXYqSrcAzQJU%2BxWvCGMSv2WoxXec8p6ct3AmLB2a7o9NGsdA4%2FqlOupAOEJ2DlfjOBxbQjkK4UShsC4o2mlcdb6sWL%2FrvP3wMrvfQlj9qLvDPJ6qzdC6JcEXbahLJ4isisV9OzBHqJcbO42%2FQV1PYSt0DjeQds2JUsr1f%2FFPidM6sXx%2FEKlg7HUb%2FVKN4ABTCTuMrwtZJFLbmRkDcSUQZv6sV3NPuCAdRCfXKNGpuNGbgPE5spzvNSMCXE7LIdThIcRFWYe6EVvxpTWoWffa54ZZh1uDR55GO5QSDj8hhSNUkPGz%2B6sSQzU1as7ga9KII8%2FRLPzkX9biFlyBFxWZHfvc%2B39jiFB0xi06DNKoNwl2e4dQ2ezE8cihsY0iqcraEgtAbhgtbaH4Xk0go3dmHtFBKzerPu0Fr7OTRUyPbwI55zGcKM0MiGAX2X36mfHwxf%2FqNZ2WVaw0lYR2vTLB5gqazKtjlwUOwiHLaU%2FI3TXu2ffJPe0o74dvResGR7rice4A393Sj5xZ%2BCL%2F4aIb498wKqT7V2%2BJhYr2lpHGbUazh8ZqCWVa%2BY%2BEoj6otYPjJsAed9ZufHlQ%2F18ANa9wZZ7iEr4jpi9yEiJF5eFUHKXUDeKWrdfMsRBX0BsDZGVzGMyMNOaxMsGOqUBGZVYanIPhLfbri5EkaEWUwiJfXgXok8k2s%2FkqNXbfV7ii6mjyHtvV8c%2FIIaqU6srVIGwz1hxGcO52eHFns%2FqwtV4d%2F%2Fiz8qKu5696QZ%2F6KRovlTy1SVO4ZlfFBkQlytpAZZSbofAk26rEpc9eq1ZFP9GJFPvZ6BHvhZ2P9kIdjBlT0qOvyurwsNOiCcVa%2BAScj16KLAoproG8xB5GaJoxQjzlagY&X-Amz-Signature=ee11343ba2f3a3997a6e33a6573d476df8eba17ef1d8279fc345d2af4267d0ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BH7WWVM%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIGAmbw1sWKET6AWaA8hRw%2FqWiUrycK2s3VrW7pdGXu7xAiEAiJTbOwN16t3%2BUAgoaedPALpUKYgDw15SqAn6lg9i%2FH4qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIISzOBmcxaYsaXYqSrcAzQJU%2BxWvCGMSv2WoxXec8p6ct3AmLB2a7o9NGsdA4%2FqlOupAOEJ2DlfjOBxbQjkK4UShsC4o2mlcdb6sWL%2FrvP3wMrvfQlj9qLvDPJ6qzdC6JcEXbahLJ4isisV9OzBHqJcbO42%2FQV1PYSt0DjeQds2JUsr1f%2FFPidM6sXx%2FEKlg7HUb%2FVKN4ABTCTuMrwtZJFLbmRkDcSUQZv6sV3NPuCAdRCfXKNGpuNGbgPE5spzvNSMCXE7LIdThIcRFWYe6EVvxpTWoWffa54ZZh1uDR55GO5QSDj8hhSNUkPGz%2B6sSQzU1as7ga9KII8%2FRLPzkX9biFlyBFxWZHfvc%2B39jiFB0xi06DNKoNwl2e4dQ2ezE8cihsY0iqcraEgtAbhgtbaH4Xk0go3dmHtFBKzerPu0Fr7OTRUyPbwI55zGcKM0MiGAX2X36mfHwxf%2FqNZ2WVaw0lYR2vTLB5gqazKtjlwUOwiHLaU%2FI3TXu2ffJPe0o74dvResGR7rice4A393Sj5xZ%2BCL%2F4aIb498wKqT7V2%2BJhYr2lpHGbUazh8ZqCWVa%2BY%2BEoj6otYPjJsAed9ZufHlQ%2F18ANa9wZZ7iEr4jpi9yEiJF5eFUHKXUDeKWrdfMsRBX0BsDZGVzGMyMNOaxMsGOqUBGZVYanIPhLfbri5EkaEWUwiJfXgXok8k2s%2FkqNXbfV7ii6mjyHtvV8c%2FIIaqU6srVIGwz1hxGcO52eHFns%2FqwtV4d%2F%2Fiz8qKu5696QZ%2F6KRovlTy1SVO4ZlfFBkQlytpAZZSbofAk26rEpc9eq1ZFP9GJFPvZ6BHvhZ2P9kIdjBlT0qOvyurwsNOiCcVa%2BAScj16KLAoproG8xB5GaJoxQjzlagY&X-Amz-Signature=0b182aa936a7e2a96f0fc84d43d4a583ed94c22381544e2365ab75a10650d60a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKLCBJLR%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIDjVDbB3VPiAanPOLLH2xWvskX1xI%2BzntnW%2FT7bo4FinAiEAmsPHBxKXC%2FnXEtMma6vEzqP11baJkubT9Bcdm4iSzFIqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFh9rNcZMPl3ymq1bircA3HG4HA7eNe%2Fjwa4FhGSqG7fcct%2BDV2ckp7Cget8PHCdqHvm5yo42wvsEgyYt006DFy%2FIyHC7NkarSII7he%2FWcuhZm3Xz4n6GbHIHQNa6zFypEX7ufEmQBh70kG4GuTExEeljqo38qUYZGDKmHHT9tTouNu4Vg79txFjg5piUxMlvL8yfHMTRhI8AvdOccFs%2BAK3YTEZOwLu1BBh2NanCYAOdQqp6lmpIRPqzi4iDC%2FjZg4xh1SgOkKdTVhi0KUR46CdFl5orWXQzq1FIoyXpG3VHUvRWbBeoxGMdGtJhlu%2B4fyMnXKJsClgmqwraATRKkbcO4meyBelHX1V7w79TaX2%2Byn1ZxsQZVq4gAUOn8AOyOxUng4OfzopXh3CffspAY91cav8XMy0Dp66QFiEZibb1ZcnHFhZ5lLA9Z5Bhv2IEHqiCFlY9tkyDxForq%2FsNzSCCtWuyuOZ8WqyfEB2j1zHWZk9YyqPZoPH3FPslf80%2Bb%2BiY4OLWPrS6xo%2FLNXMBIQCIRaHvogVSUrcCMOxr1NfIBSUpuUy1HDJ%2FpGlR1bMR2uSkGoxTH38FTu8sH6ZZXqIBlKr2bmiJeuDwAoUXcOI8niDuSGb9EIYZH%2FjJHeehw7Dr9GHJnkW7KnOMLacxMsGOqUBWldqJoSNEydvrvVmURkELnObIwkmBMH7e0LD1JJG0zt6zdiXsDuAAZFaPFLFyB8GCP905HxosEng8Hs05HBOIGaCF7z8%2FonSMuP%2Bn6tBfe2tceVtuM47rMSt850rlOBYIy1LIVjBEfhXIXW%2BF9I4p%2F%2BWE5g%2FFQNOfK33NN30qKIHgTFb2tCnswTl2LG3%2FzfzCvmV5ulmAjopmHNxRfWTSaU82b9N&X-Amz-Signature=a44b9b34dc2d11fd6e83fd3b10c7e5f2ee2c100463c7cca3ddadc1c4a99216ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QV5B6BE%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIFx0MzLvjrQQiMcBjUtDb1cCRNPSrqd6%2Bhp5vUDYjQhlAiEAsLbzAAf1Q5JJ4IAL4dsaKcjLeLZ3uHv1PxsXey1jRJ0qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAHY1OVdK7decOMr1ircAyD77AWLDOLvU2HhvI2v8cIf%2BCq5W9UGMGD8JzNAOsQ6c3Hmwsmpb1%2BqIsAF2EvPCgv8rL9TuuEb0xang%2BYDJvl5Uj6ohBISowU4F0MJHfU6%2Fc8xziiutaN0Q2QuqNwLfC6HS%2F7ESqvDHqJkPozc8d7yIOAFx59Ou6eZNxybQ7yt540dVYNzsZzvK%2FuY79j8SEg26XTgvTCbV%2F5SvwecrotnHV8IkA8b%2BX2sXX2rooBrfqI9ezbGnq2zCOYac6vwgLyBzbootbfPKEZT1%2FBFszCBO5z8dbuGoBLwzuIEYaBHZqCd%2Bm2yXqnb%2F6rEafhdN%2FYgMLM04%2F%2B%2F5WfY4PdaMI%2FcOgMDFziFRk4O1uVwYp84BN9KpKlrj3XMTZkM1HpTLVIm7mfB9Z3fZUwvJe76ZofK44Z%2BMGtjkLxnONyoVZezSzJgdDZc7ftaKcSpz3QdbtO%2BiQd0aHDmGoYvz0WVSPWNP9R7L4s%2BqAKuZJHl%2BmlkZXfu6PN2eYSsgKWKbLk0RIMKljyg9GuTgnjpz7%2BCuDpN3TKxJ15ON3%2FUlNKeXutxxMcAChm2XmCmJt%2BpQ9BX1CZ98JntuwPnYWDXpglEZ7S7JpY059NOlXfOBRnrP4dEaVrnPftBHISvbbq8MOGaxMsGOqUB162cR7zLZpbFqkr8AJkqmmqvJd7NTY9ZXXXnFhjMp44xa5KV0O6j%2FQiTC5VKqVvS4uFfdN0td0co492rTKrM8Qhg%2FOSOO%2FMa5wqn2daMoCH3%2BzrseTQ34s6wK6nETQgHVXlpHFYhxHtsUmB3eIl3vX7kNm7uds3z%2FtLIpCDPRh7YyeaW9IymBUThcdIPSKiWh%2BRCbvP%2FtQ9wrCwYvQS6Y50lgdNG&X-Amz-Signature=a9872147b9675ddc9144d1ff05201ca1c5bd80ec5b366b0f5635b5a0a4091942&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MFRADBZ%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIHytgcBNvLSvaFsqHSnkyTo6uQ6oOFposSv8es2On3%2FgAiBQfN8BVG2H2o9znB06Fm9EMJ5CXI1nJkezxbOAXQaPrSqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BCFslFJdiu2srGg0KtwD4XwrKno1XNSlS4aiExIHlXv7VkUBwXWK596pfX4rh64xtFTASy4wsWYRda1rqMyvwbRuCzRCeS26jz9OYPKDdxEU3JW4X6SUILbK7h5TWgjpqHZodBB15%2FKYztfa%2FdbumEk%2FYYN%2BK2iUgxfiSTRmAFuy3MM7FyC%2F4Jy%2BOQ15tIyFoFYTcBPYrsFwKyCLp3hMHSOKdHJ4A2SMym08VK3bTxxBzeFXPbPBoVeqBNsaCOq0vqbiYBd6UsemTmF%2BNUeRS3tEpnLlf5iMPxLYbJnXKjKTgG8qSUwR1wSu3ZLxniVsX2BcGf42LwOXdcVeKLEMrSdEq4gvLkOiN6TgzHf0t%2BWSbVx0N4TfBpgtXd%2BSloOEKwhSHPqHmFLrZVfnfHCmDrv7BJDbUfC129AsbZZ82ZpNrbsySChNNesb8r69BK%2FN2041cLwtUeHjprN796zpxYmkA2LfWoD%2BeRLL%2BiF1sR92IyRl1WAEdjbqgt0PiUFwPeVFfrHsjTA%2FuTbzGM1DiZLXXYAddE2hZGwzixXm8Ua5b8XScWHZuvOXiqXMIFyOn26RkOZVp8L1uqo4J6OjTPxvGAzHYYNnZVknncFTJPiCj7Fv8oqLyK%2BhDMB%2BGktUg0FXdif1CxJkm4cwr5zEywY6pgH0KSCMuVdvM4rkujN0v56FTDMaZlDMr5KcQaH7wKMrdJ3nieX1IHS7yhrZ6zMcP9WF6MWTyMaHWoNpXdA34JZHNr3sUQFJs8z2afB2war2b3MzDT9S66yWTmIft1AxRkSgK%2BHLNSPiibGyITZfDilBYc%2FvCQQNC9%2F4uxa9HsRvuKI5oRP2MkDKyk8hqmPtIdun73y0uikKeMKUUynA4gtSpjGqg9BH&X-Amz-Signature=6dd56e5259f6505f4816aeaf184eb7e7daa7f5de917a39cbb1d9d1bf0855fac9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPPUOH56%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIH821pj8h8UYty%2FrCtX1SApSKE7n9tULSSGemvcHBM1kAiBA4gK43bKtj5F5UZ1%2FHvLm%2B%2BQ0UmdczfsrGuyywR4kbCqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgd7V%2BrK2Bqr85C2lKtwD1mYbEglWE%2FUZ8fxaI9TQJj%2BbThUB1BbIhGIJd%2FA8jzqRTO9DbpX%2FkxVP%2BPO3jicmfddIAPz5HDAqOxWxf6NnVm66odfPEHnYVPckxkMkXgkoFzreK6efA94xaghEpDC75xX3kMJW5cRbXL1L6nPhx32YnoAhFbdf%2BYnP7MBHv4O4h3hz1QgAajpc%2BrpNyUrV8RYBC2pU%2BeCkxrAYHmANkmUJ9jhWXPPMtCuh9xLyHHzR6CslTe18LXSHcpHnIGJIsZ8sVeMUBtYK8OcQv8YVl0S78x0T3YQSe%2BfX9MNNUEEYXg4cotgPuC7k%2BmFF%2Bzy3lGhbormyYrw2RMat03XWAPrTfO6yeQCW7OtcHe%2FMU16sv5QzYlbuqOdwNO3AXQNyR9tM%2F1lZsaQ9sb%2F23jL0L%2B4gEjg6wPEfLQGqE5tfkE0fM1hPpHlzbDEzoisTOK33yYMfRiYEFUBFxpZLhQ66CTwT4tiKAZZ%2FgS3fmjpnh8%2BIXbb4ccyVxsuWeN%2ByGET9tL6m95DH%2F%2FDwXJyKUcIJNcTPWynbCYZ5QDmGEo4UtA4vv%2BjDsyfmG%2BkhByYWF3%2FxUus5iLrBQ9bFjZ4OgVhtj5FYrdikEDj0EhY39AKGmlFAdqjf5g9JfMRgLk0w%2FZrEywY6pgExLIMZX%2BbK9DLQsALt4P98qv0bvZ8ivws5Rc5k%2FA8B35XPUh3lipr85PTOB8pcTaIXtVyQnl7J2mgaa%2B9CXioouFpFQHdOhYxIKlpPwsYflWC0T7xD7INANEBg123TKDkfzm4FAd%2FNuFSV%2BuVRt8pj7MA2lVXdzahUE3zHNqy5gRQkurnXxBNYF9Bu8FozRjGpZH6FGPDI6DX8KiAo6kvYD4ypC4hW&X-Amz-Signature=049c197a6bafbb349f0c79f96f6a6f0bbbf4fb1f81f1e61bc016d46959a5a8db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPPUOH56%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIH821pj8h8UYty%2FrCtX1SApSKE7n9tULSSGemvcHBM1kAiBA4gK43bKtj5F5UZ1%2FHvLm%2B%2BQ0UmdczfsrGuyywR4kbCqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgd7V%2BrK2Bqr85C2lKtwD1mYbEglWE%2FUZ8fxaI9TQJj%2BbThUB1BbIhGIJd%2FA8jzqRTO9DbpX%2FkxVP%2BPO3jicmfddIAPz5HDAqOxWxf6NnVm66odfPEHnYVPckxkMkXgkoFzreK6efA94xaghEpDC75xX3kMJW5cRbXL1L6nPhx32YnoAhFbdf%2BYnP7MBHv4O4h3hz1QgAajpc%2BrpNyUrV8RYBC2pU%2BeCkxrAYHmANkmUJ9jhWXPPMtCuh9xLyHHzR6CslTe18LXSHcpHnIGJIsZ8sVeMUBtYK8OcQv8YVl0S78x0T3YQSe%2BfX9MNNUEEYXg4cotgPuC7k%2BmFF%2Bzy3lGhbormyYrw2RMat03XWAPrTfO6yeQCW7OtcHe%2FMU16sv5QzYlbuqOdwNO3AXQNyR9tM%2F1lZsaQ9sb%2F23jL0L%2B4gEjg6wPEfLQGqE5tfkE0fM1hPpHlzbDEzoisTOK33yYMfRiYEFUBFxpZLhQ66CTwT4tiKAZZ%2FgS3fmjpnh8%2BIXbb4ccyVxsuWeN%2ByGET9tL6m95DH%2F%2FDwXJyKUcIJNcTPWynbCYZ5QDmGEo4UtA4vv%2BjDsyfmG%2BkhByYWF3%2FxUus5iLrBQ9bFjZ4OgVhtj5FYrdikEDj0EhY39AKGmlFAdqjf5g9JfMRgLk0w%2FZrEywY6pgExLIMZX%2BbK9DLQsALt4P98qv0bvZ8ivws5Rc5k%2FA8B35XPUh3lipr85PTOB8pcTaIXtVyQnl7J2mgaa%2B9CXioouFpFQHdOhYxIKlpPwsYflWC0T7xD7INANEBg123TKDkfzm4FAd%2FNuFSV%2BuVRt8pj7MA2lVXdzahUE3zHNqy5gRQkurnXxBNYF9Bu8FozRjGpZH6FGPDI6DX8KiAo6kvYD4ypC4hW&X-Amz-Signature=438567a361dd68971507807410a60e99a8bc61436d607d2cc072cc39a79fa3e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFBREAVP%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDuUu13GQTM8bZy5pVtmMhrXAr0BpTbZu7cXMP8QeKj3AIgbpPsEEEA%2BEnRF78An9OA%2B7WXMKKFOz5KRVd12eomoUYqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHafOFzirqCx%2F2sIRCrcA3oPcncosneZi5ltFZvhi5IU0%2BEvb8tTCO1%2F0qpbPKxw%2FxyjbYy9nlgOb85a%2F%2Ft8Umks6UCCUXxBtdej3buY4GXgzTP3L0x1tDuSLEhJHpkD4NVvZdB1d5jgX420Y2Sw%2BdhckDGM8Fo0zJ8mN9a3wW1doqVQIgAMvhO%2BdkywYcE5ykRQQlNJxG0sUA9wSZ0yMyZIqaw11bml7UA%2Ba3ssPX81qQ07fkstopXubPTdHeYsPg6mMWuJXwUIqdHcFz58EJRQbru%2BAiTicbw%2BcXMSYr6PUYg%2B15x1ViEpxwC8hB%2FG2AMQ2jJvm1Mpi6sSzCixF6SEf2VP26caEUmqdFksU8SnBUiczADMrqK8n9TBZh8wi5Fcw7GbaFiRoU3vKw1MgrQFhegqTq%2Be1ACJJSD283pKkFP1jW6il%2B0Jn9efuldHoJI1q39FOc%2BASFFwFZ1gzIBh3sfPyo6%2Baz42THB0M4fcFNidqCv%2F8JJw9H%2F2%2BwQ8T%2BRGB1rPXekTiOb1VWZjiwFjt8qnRoHKfm90QjVr4jFxdNH5Vvm%2FkkP%2Fen8qTxnoe60Bwq2P3T6C7I0Gox%2BKBP0s5Fco897lHb8E0uSVF%2FDVOj8KS7HFnhnrH0udxE8l6ynUn8FcD7%2FD4u0zMPKaxMsGOqUBoxAPW91Whor2Wla9DeZKJS5y5iRYcGLTV0Lqci7ZyDFUcAMBGnZ3mmlCYY%2B%2BP1eJmrF9G5%2B%2FnNmClysNtMYdSkZyE6EGqGpuYjvtzm2%2BzxOePkZRHQtFtaIHoIwUeLC5pbCo%2BPLN4jdRYmtXncoHfHWNYnIgf2xv%2FRmDKax4GMT5%2Btgdq7s6XNHK24XH0naLxYF%2F2JR3gV%2BM0W%2BMqqrtDwSvtAcJ&X-Amz-Signature=c8f4f21d2bca42cc367cac9e37fddccad45ad6020a8637dc0b9184883a3db80f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAPISKRC%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIAp5l1pv3bBXvLf70M8Wgzp%2BP0eHPvYIUNBycLek4H67AiBcs4i5%2FN0lXUtGVSLlXbGsxqd%2FDhaFnOba2hcPId6%2BXSqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoAlD28v0lwEcQsGAKtwDmt58Nq0BorEfkp1zr8WT42qVNECehb%2BsbZtJYPuC49ace4qBHK8vp00RMPbJJ1cBmSWm2pmmHpnRSM%2F4oax0Fsy%2Fh8BZLASmc2%2BLxjKM1DwzQTszhwT41jLUmB%2BrPTVRKJ7InWBWLz%2F7XJBWYfGmwIE%2F%2BJtP35I0bj13mbi1W5EibXwFarKkWijijscCZuP3y8EA1D1tDFaDh6olT%2B6YC1qlbNPh%2F8MCw2rQePee82gxlEsXPeGUNborzM8MIkHCxOQSq7jfp1lmB1fBFxzJVT1WGKCU4%2FaXaCiXWaKssmHktOiSUwbEkTcAnlXn9syLVSg6SZIr06OO3OjhduyBSqOXqb%2FL4H6CUsDR06Z6P6Mi6qz34OWPTb5RNKVzxS5sIg6wiEVcrzd0WaBzoe4tJEKmALc5S65zsYMouivl2TOd5FswqXwQNfD3EydyZ1Ebs4kCvxzJ%2BjyybDH0p6IAxG%2FJ8megh6gqmkGqyy%2BkIvg6n8WOMfmWkN2FzDR%2BUynESW3Xmm50sXA%2FUqTrRgC3P%2BuvVlZqv6evF%2FLp5qwKXUPWHk9XcB%2B0mkO5tyuf666ER1D4SKF5XoyCidrv2UQFxoJAGDIaPutIK11WCwtTpId3B2DBkIzD8o%2FKHAwwl5zEywY6pgFWyvYsZtPIJyIPQeqSaAa4zZBH1y%2Bx0ol%2F%2Faac8YJLxKLEGysM8qNJP0FAZoXKLra2sElje4DIam0lGQOrcuL5byVB3lVghtS73tbnfZ%2BgoAWDA5ilbVxhOqT8iW79EA8fEwmUFN7WNTEYBE94s7pSp8YU8%2B03O5Uz0m9EFNlqR%2BdfPUlnHZrq7RjygKVzE0bC82i%2FaGCnUQgDEpDpdTQzObAGlFkh&X-Amz-Signature=228a17ef07c4429fcc699d4ac9e38c49979bc1fd2283959565eaa6727a002779&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAPISKRC%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIAp5l1pv3bBXvLf70M8Wgzp%2BP0eHPvYIUNBycLek4H67AiBcs4i5%2FN0lXUtGVSLlXbGsxqd%2FDhaFnOba2hcPId6%2BXSqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoAlD28v0lwEcQsGAKtwDmt58Nq0BorEfkp1zr8WT42qVNECehb%2BsbZtJYPuC49ace4qBHK8vp00RMPbJJ1cBmSWm2pmmHpnRSM%2F4oax0Fsy%2Fh8BZLASmc2%2BLxjKM1DwzQTszhwT41jLUmB%2BrPTVRKJ7InWBWLz%2F7XJBWYfGmwIE%2F%2BJtP35I0bj13mbi1W5EibXwFarKkWijijscCZuP3y8EA1D1tDFaDh6olT%2B6YC1qlbNPh%2F8MCw2rQePee82gxlEsXPeGUNborzM8MIkHCxOQSq7jfp1lmB1fBFxzJVT1WGKCU4%2FaXaCiXWaKssmHktOiSUwbEkTcAnlXn9syLVSg6SZIr06OO3OjhduyBSqOXqb%2FL4H6CUsDR06Z6P6Mi6qz34OWPTb5RNKVzxS5sIg6wiEVcrzd0WaBzoe4tJEKmALc5S65zsYMouivl2TOd5FswqXwQNfD3EydyZ1Ebs4kCvxzJ%2BjyybDH0p6IAxG%2FJ8megh6gqmkGqyy%2BkIvg6n8WOMfmWkN2FzDR%2BUynESW3Xmm50sXA%2FUqTrRgC3P%2BuvVlZqv6evF%2FLp5qwKXUPWHk9XcB%2B0mkO5tyuf666ER1D4SKF5XoyCidrv2UQFxoJAGDIaPutIK11WCwtTpId3B2DBkIzD8o%2FKHAwwl5zEywY6pgFWyvYsZtPIJyIPQeqSaAa4zZBH1y%2Bx0ol%2F%2Faac8YJLxKLEGysM8qNJP0FAZoXKLra2sElje4DIam0lGQOrcuL5byVB3lVghtS73tbnfZ%2BgoAWDA5ilbVxhOqT8iW79EA8fEwmUFN7WNTEYBE94s7pSp8YU8%2B03O5Uz0m9EFNlqR%2BdfPUlnHZrq7RjygKVzE0bC82i%2FaGCnUQgDEpDpdTQzObAGlFkh&X-Amz-Signature=228a17ef07c4429fcc699d4ac9e38c49979bc1fd2283959565eaa6727a002779&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USEFXUG5%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T182621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIBSlvSKX2BsEyRjXoOBtoa9ZzRnc9ivvjuYwZNEz446rAiBQUGbtodCu7qeDJADfRofsZvHKgsE0jIGHSlw8sxKs%2BiqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5CQdMlsEDHqHujeGKtwD3hbhXsKIRd3NG8hpwlyATbqrnwJbRqw%2BLjugeRGPnXcCXLR95QqHJZ%2BetzUntZvaf35QEtBUtIMpeiLorXlIngqq9LwGY8nvAyM3bfAKawqJSbhS4k%2BbtMs03cnFQeNt1JqrwYTpU3ZC%2FcUSIu1F%2Fnr0FxcAvigAJjCeG%2Bz6YGd%2BV6dYvz7iaNHxR1mtLKrr99ffsJY1HSbVEmOzeUmGcW7g%2BGL%2BU%2BJL20wBZvQ%2ByAhzwGZ7wplmdEWdZ9zOMfwcwCzg7lp7h7LKtlYSlWOAySDQhR2wl9SH0YSPRaMlbAUCNlMZ77%2BGUF5agXvj1r4XjKnV4uHN46HE31uC5jLuB3gb90%2FdaFdND7vn731%2BR9VrivHwW7nDXhYxj9OfI16aTVTvFZ1G8WrxihzoJiOJcp8Vl%2Fgj5qsQ2oJVRvJK7D2E1EMiaxubTgCD7TOKFL9Gc5oxt6rLj0XOK9SkTnUxgZjvKlb%2B3XtyBW1%2FgIeI%2BV7f%2F0RIywoEN9QBi8X2qI7ffzT%2FFbUxYu5m8NsvDlj0KXVpQcDb0Z9nLv3vW%2Frp3yHYIUHSAcbXE8f9Zom2s1xcRn5GZ3W%2BYIeVygkeFGIfhdcpieXb9IainxnSVTEDto5Dy9%2FTJ4vdS9EWTNAw75rEywY6pgFkYPfK8g%2BlUILv3UbcgV6pRCBav%2B0gOUtevAU3q%2BSDxfQ5Z0Qm2ZYcTUjfZB3TFscXOjsDiemuNgVYQcEZErQ0SHp25jYVoGpKkcNNG%2BHyzWIdkQTRKEeE7L2h9e4RNWNIkaF1C4kMNQhmImaaJfH61ApvmYM118dU8XKctS%2BBJn8uNJxa%2Fd9bcqZw%2BzghZu2ePUDJV71bZ9Z3jYZXKpCPP%2FqxgjPJ&X-Amz-Signature=66631e74738bb3a44d18196d28001611746d7664086744124d7750ba2211ca35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

