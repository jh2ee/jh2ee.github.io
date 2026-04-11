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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VWG3JUN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQC2%2BQaCV7UbZHnFBS8x6pSy9Smb5ZvKxd%2BNMkmbzeqRxwIgC3t%2FjoUMiU9Wm1DGFi%2BYmhUJQhvSFJCqDOMQD7Y4oFkq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDNTqbodWc37lh%2BfPyyrcA2uuxmJnsKgZEkmafbNpZDgqvEv6zCVu2VX%2BCdIicDFGU0RdjvpVK4IRt5ze1NJK9r0VAT4rOXDhRiQDQ%2Fm2tKvAH2IGs1aEV8wVUetVnXruQqMTpxxNm%2FeH0LNtgy%2FRlp1BohFxjUwB%2BIIPPhdYLgiy7aXiEeoNM4Sa9ugu2MrC9oqz0%2BI6vy9uZ%2BJ%2FPE8KjZKAZpeyO3t%2B562ZyI3Pp9L8SObGy4Dksh%2BpcOKEAMnCGd7I7r1277dIkRm0GPVQ7JaBiwaTgf2b76oIIN4aPhEJFX%2FF43kUoLxL0TQfsZfMGTbe1KLTArXgaCZpYvBPlB%2BebMd%2ByfRKA%2Fcou3p2VHGX9qddlzsetTJjGbChTuwHRbehhdvB0Hrj0BxRivG9FEJ7YkWzqJFieZc%2BlUqQsvujwauEd5NRCIG8o4G11gwZ5Io6CLMjdOmyXdCZcwokN0Pl%2F%2Fz3LbneRLsGpFzyG%2BwBnDzsJ5m7rDbeS0uawVUVmTFatbmZr1wQEFbdWYxNEQDnPX3fd7HqO4%2BMk52vVr0%2FWSav9bDirZzPxT0DBOZNLs7dUEFlg0aoQR95VWp0s5sLQ6F1NOS1Kb030wLxyQZhak5oLW4Wjuuef%2F3gDW7zeTW0NDqB3r9UmZcHMOKL584GOqUBr7xINRJzYCdc2OPs%2F%2FTQSGTI7I2pvLMwqCfmvi2iUzGYuNpTcUiqfdJHD0S%2B9Y1elj2Kn9fjYjuoDgMiohayeDnGhqNpOR44QLN%2F3QRcZf23AD8i0JU%2FyFYUbcKXzzdek3g1Vl6Tn8C6ba21EFmis1gBU%2F1iueIeRKHYWc%2B5SyyQZ0LdMS5zzYYK0n98c8jvU%2Fs5flAsF%2Bdu3%2B9pmmqlC5O1%2BNCZ&X-Amz-Signature=3b92667482ccd9d4dbcad7747a92346d36742b925f0c8099e75c0af8c11f5a29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VWG3JUN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQC2%2BQaCV7UbZHnFBS8x6pSy9Smb5ZvKxd%2BNMkmbzeqRxwIgC3t%2FjoUMiU9Wm1DGFi%2BYmhUJQhvSFJCqDOMQD7Y4oFkq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDNTqbodWc37lh%2BfPyyrcA2uuxmJnsKgZEkmafbNpZDgqvEv6zCVu2VX%2BCdIicDFGU0RdjvpVK4IRt5ze1NJK9r0VAT4rOXDhRiQDQ%2Fm2tKvAH2IGs1aEV8wVUetVnXruQqMTpxxNm%2FeH0LNtgy%2FRlp1BohFxjUwB%2BIIPPhdYLgiy7aXiEeoNM4Sa9ugu2MrC9oqz0%2BI6vy9uZ%2BJ%2FPE8KjZKAZpeyO3t%2B562ZyI3Pp9L8SObGy4Dksh%2BpcOKEAMnCGd7I7r1277dIkRm0GPVQ7JaBiwaTgf2b76oIIN4aPhEJFX%2FF43kUoLxL0TQfsZfMGTbe1KLTArXgaCZpYvBPlB%2BebMd%2ByfRKA%2Fcou3p2VHGX9qddlzsetTJjGbChTuwHRbehhdvB0Hrj0BxRivG9FEJ7YkWzqJFieZc%2BlUqQsvujwauEd5NRCIG8o4G11gwZ5Io6CLMjdOmyXdCZcwokN0Pl%2F%2Fz3LbneRLsGpFzyG%2BwBnDzsJ5m7rDbeS0uawVUVmTFatbmZr1wQEFbdWYxNEQDnPX3fd7HqO4%2BMk52vVr0%2FWSav9bDirZzPxT0DBOZNLs7dUEFlg0aoQR95VWp0s5sLQ6F1NOS1Kb030wLxyQZhak5oLW4Wjuuef%2F3gDW7zeTW0NDqB3r9UmZcHMOKL584GOqUBr7xINRJzYCdc2OPs%2F%2FTQSGTI7I2pvLMwqCfmvi2iUzGYuNpTcUiqfdJHD0S%2B9Y1elj2Kn9fjYjuoDgMiohayeDnGhqNpOR44QLN%2F3QRcZf23AD8i0JU%2FyFYUbcKXzzdek3g1Vl6Tn8C6ba21EFmis1gBU%2F1iueIeRKHYWc%2B5SyyQZ0LdMS5zzYYK0n98c8jvU%2Fs5flAsF%2Bdu3%2B9pmmqlC5O1%2BNCZ&X-Amz-Signature=3b92667482ccd9d4dbcad7747a92346d36742b925f0c8099e75c0af8c11f5a29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YR6Q7LBI%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDsPJwUn2skLC1sqAY4pNTrYMWQ%2BZbI7am2OFaZGPMliwIhAIR5jJKrsyHouRNSqSOJ1EgJLIBwQDe1R8c1WQhHsvTHKv8DCD0QABoMNjM3NDIzMTgzODA1Igx%2BU0pd7ptFECT%2FUwgq3AOQHzIZR0sHy65vJKRxtBlgx5BNXRdY9A%2BpT2oAptZFwLoqqFN%2BTqcQZ82R0dQDKSy%2Bn3UJOKaiurI9shs%2BDlBWPvF6hQKDsB2Rz%2Bzr3cf9hrzvRVDCSJAiYicP42hGFT%2FYWQHdWnThveeLbrenlbwDarkYTGI8VQPSwE6e5HKCDLqMZ1h5MEU4IIZg4r8knI6lfOqBbxE%2F4TEmxWA1nbOn6KtZvgSKGr7tKnujR0MfB8vahWkT2Uloxqds5zOqJJz5NV5dZETyXPKdfrJZ152i37oCf3lh%2FK1Q3I%2Fnzok1VRGaJmE2VFbWqXWtzJt1U4iMLdc8kjjuKazBuRplejgSTf4QfBNt4yGlQ7s37dZ2hXwx%2FnLTHIfgvBbdwHCPnzez2kSYBhuOUYobK6IyuDklPKmJxyhnJAlLYbOrXHN2CEzIDhKrTxjZH0u9No6dmzZZfADHnggl0tXdXziUIE8jrLlUYA%2B0gxPKqefn%2BG7EhAL%2F%2FLLcSfLPtYZwpNBGDEc3%2BAhNQRqqmvqkLinNtGibQhxom3Uyj9JB0sbHefP6FtdQkB6E7GD9FTGswd68aRgfAkuFpDSL5FUflRPl6qZqc1dX8zZ67CrlE3kta8TBgWeBxF%2BSYhm0DZwwmzDriOfOBjqkAa9WNL0YRcYDR7TJ7VUSZD9mTP7xW8HMuTKm0W%2BP9AOmZcEPxdiMb54HWBrXaUcbY%2FTM0pAzQlHVH5oI1AWRYkYBniG9iDlkBuwPl%2FT7RV6hV2g5yCcFoIRzQycsJxkmEh8MNn%2B2WgzGSTatfizMow2BNKcjemTnmd5bOiaCHYCTGyUFj8B6Gxw%2BMpGYrM3WBtXRxW6rN3lMo3AKFeGyhsul5xRZ&X-Amz-Signature=c25f7bc58c2eb3ba59c2003cf858cfd768378078d779897cfa1213d0b0a4ff1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UB4MLI6A%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCgy%2F32qIFGxUuBlkqvyoHnmRwL8PtX2tbnFGm9xmmWgwIhAMpBe6mLowHRX1W9eH8v2vF9nwohAgN5xTFK0qGlnC4rKv8DCD0QABoMNjM3NDIzMTgzODA1IgzeoKtvARAWnqyzmbUq3AP%2FkpVoRNoikrxEey6%2BN6bEMlWUIotizlFCPgQmmcZDJz4Ct3fZM6HG53AsctMB3PoNsLf9YKHiRVvkU46Nf7SlBDR8cNuSQAARDLnSAzD8cY5w0Zib0PCF7qfFD8UebYBrVwTpKEZI9D%2BEhB4orlI8t8TkSQKGNz7cQXXnWZP5JKcQikQknWRIdDEAne8LZIwcNZrbnSbTCB7V96lUSG1NIYzBJJVbgvddf9oEOQ4Z%2Bvr2BQ3HfSI8tTvZoDoWGEXtJBo3SRMVa5pf5yoN4u3XSDJNeeYSqnMjHZmVeH%2F8qFVXdv9rhiSHSyjNxqd5jdy6pXjcSXtRkL%2Bwm3mBLzz12j1odZTit9Ty9SpKhgDDlsYV2XnqsJLeJAW9fXOqDdCwVXZ4%2F0qBRGpCMlgoNHkiSy4GwAKBSbb7vDuDEyeYCixBx5NwTNAdgHxoEoDUewMlH6t44OAG1v2IF5qrxoxyFIYTRC7qIgccRbrTFXIRLiGRbUKCYSXRLalOkH%2Fbt4TEuTYCKKZO%2B3tyvB5xHpJOae8%2F2wrvfYjtvb7xqhyCMdc1u2nIhDjk1NveHQ3qJDX2hMWWCX5VR%2BZqlwQ2KFGXO6WlqtpnE79k2ooORHs5K3xHzYcx1YVZCl44%2BjDviufOBjqkAaw7bpAATI4%2FhldynpaAZHUYRlO0w2pkfyDonwgwB8odn86aIwAkirDKSFKE2doLuEoz3%2FBUFr2ZsvGfGza7etMnnyFWUblA6kxAzAuvozG6mcbaIMajbX82dPfU8AuoZXFbf6woVfF5iGhYSbcVPCbQhECa4eglmyP%2BYKBFwDaeSm6Pj1IBLCdyu%2F%2FGXJBoht7ipm26zJ85dwiHV9AgQ5MjdGgs&X-Amz-Signature=170782d4dfcf2db7b543eaff8b86384c598dc3aafa0dd5cc8f0ec7692285708c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UB4MLI6A%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCgy%2F32qIFGxUuBlkqvyoHnmRwL8PtX2tbnFGm9xmmWgwIhAMpBe6mLowHRX1W9eH8v2vF9nwohAgN5xTFK0qGlnC4rKv8DCD0QABoMNjM3NDIzMTgzODA1IgzeoKtvARAWnqyzmbUq3AP%2FkpVoRNoikrxEey6%2BN6bEMlWUIotizlFCPgQmmcZDJz4Ct3fZM6HG53AsctMB3PoNsLf9YKHiRVvkU46Nf7SlBDR8cNuSQAARDLnSAzD8cY5w0Zib0PCF7qfFD8UebYBrVwTpKEZI9D%2BEhB4orlI8t8TkSQKGNz7cQXXnWZP5JKcQikQknWRIdDEAne8LZIwcNZrbnSbTCB7V96lUSG1NIYzBJJVbgvddf9oEOQ4Z%2Bvr2BQ3HfSI8tTvZoDoWGEXtJBo3SRMVa5pf5yoN4u3XSDJNeeYSqnMjHZmVeH%2F8qFVXdv9rhiSHSyjNxqd5jdy6pXjcSXtRkL%2Bwm3mBLzz12j1odZTit9Ty9SpKhgDDlsYV2XnqsJLeJAW9fXOqDdCwVXZ4%2F0qBRGpCMlgoNHkiSy4GwAKBSbb7vDuDEyeYCixBx5NwTNAdgHxoEoDUewMlH6t44OAG1v2IF5qrxoxyFIYTRC7qIgccRbrTFXIRLiGRbUKCYSXRLalOkH%2Fbt4TEuTYCKKZO%2B3tyvB5xHpJOae8%2F2wrvfYjtvb7xqhyCMdc1u2nIhDjk1NveHQ3qJDX2hMWWCX5VR%2BZqlwQ2KFGXO6WlqtpnE79k2ooORHs5K3xHzYcx1YVZCl44%2BjDviufOBjqkAaw7bpAATI4%2FhldynpaAZHUYRlO0w2pkfyDonwgwB8odn86aIwAkirDKSFKE2doLuEoz3%2FBUFr2ZsvGfGza7etMnnyFWUblA6kxAzAuvozG6mcbaIMajbX82dPfU8AuoZXFbf6woVfF5iGhYSbcVPCbQhECa4eglmyP%2BYKBFwDaeSm6Pj1IBLCdyu%2F%2FGXJBoht7ipm26zJ85dwiHV9AgQ5MjdGgs&X-Amz-Signature=f1c3a0504ca586765ad8af065538663cfc5b2b777dabb18821b267b469a85e05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667J5JBUZN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCID%2BqJt7zHzNlQ6TfKjGW6DOC1Q%2F1gnUy%2F72gDukw%2BveRAiA1rwg%2FG62HUQCcuOMdE7qNVQk%2FTL2%2BJxPYUy2tb%2BOSpyr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMY7WNmvz2CwLrcDzxKtwDaVF6RRBCmmqEzbZYni6kLy6aRq9fB622xECCKr5MQ6o2BDg8UurGYoAzwvWn2QXbE590Y5Lrc3vxAqyJ1%2FHPN8zEpWKkReVuPeZFO%2FW8IWEYcIRRg0k1GjrXcfIc4ybjhT5WkpKlKxYo%2BHun9NiRZ17CEeyFnHgEFNlinM7%2F%2B06P9FssYa6DMUnhiTveNYmDdFkLf4CK8CfkIjwxifSWDkrS0r1iLFsLlTLUS7c9lCeRgymT%2BWUgvnWmTjP1tzUZw0tfHGL%2BSWcp4zYle2srkNG2DmCh%2FHb%2Fy30PWHU4ajBWg4NcaQmHdB5SshwKwoSgmEvEeawMo%2Fggso46B4Q%2BqO79UF37kyyROSsrFUfCY4hxqgyuWFf1vUqqnm7cjt7pdrSEdRJB0HqbDaaou12QazIUmXcs2iSOuTMdB4xNFnGb9mHIUw%2FN5fsP7XtkJdxmHrf%2FvfTpiS5BHjNs98tj73TTzxOlH22noe9QX5BnYbiUNFdqQa8ij3PBbjfupWnt4Psitt28h9GYhJh%2F172eQN%2FV369JF82s69MftsjORtE3svON4T3sacN%2BGXNd6RqNuXQyYVwlnbwS71Bithz3EpgkoIYLvwlLP0hD%2FI6FgZICHBSskbOkxnA5ps8wo4rnzgY6pgFDeZ%2B2qabqeY%2BIglJTPCHkJ5477N6rwc9Klr%2BReGvlY4pPkM9vB%2F%2BiBz7lyjAXZItO078FCBPqSd6WT1fpLYr%2FNj9w9xJaZQOEbf6Tnf4hy%2F6l1hBqh%2Bg%2Bb84GMV4xhQybvouWQk67qHeZn17hiv2OPWDIcm0T15fuhqF2ZjGNGPKsdi%2Fg%2FsTIDJ5RZmoB9%2Ba8xLN3A3uzIo2uEBfMZ4P7UUeQVCnR&X-Amz-Signature=fc04087ee227584bf1a73dbc0bafed7e52f80be194aae9825a77086021636383&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IRYDJ62%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIER6vP24hWG6u1qngE%2B4xe1QpQEEPdHjfDyd1086B9N%2BAiEA%2BRAV4CSI1k9Eb4Fwy4921IrYjDzCPG%2FXoGBAyIBcpVIq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDMExARkp4CAU7jbTdyrcA4h6K2eL8l20YSAAVWOwQVxzyNuGcXa9QFR6rHhu6EgHwsOw3CTwG4SM9v04QUyrx6qG7%2B%2FsCgt%2B8hCs3Qr4nKDEQntTfFLCMR%2F6ZbmWE7sdw73etWkhR9hGr2QCZP5uA%2Boez6kiVPJsnh6w5NZAMHNi2E9YtD6e96PBf%2BZGooLGHISfug2M5BWOqx2BnABl7IiOWpqQf%2BC4VPGFItVWYdN5zvd6w8XFcvtifeo6tN3HWI8oicr98Baq3FjOwBgm1cIVP3CsDW3BOUvAhXjsunCi80D7ddEDIbJxuzqus%2B4gxdEdwiCB5WzNIagBkj7Vr%2FZ2%2FVHANjjUGzkbpULucpngOalK7XMeVZIT2dGZhd8Q%2FbUvMPznjc1OSmj3rMOrTemf58XHwjA%2FK7P6jrNCdEeZ1vjaJ02VvudFb8t0FV507ZhUFI3Bxuq1RLFendKllC53wNHEAAWGALf3%2Bvr17c6j3%2FYIKLzLm8zVpvwWfdGm%2FC%2FALXAXRE3xTqFcMHwP6cSBW9kr70UgLNtH2Y0P6rOwvC4OEA26YtUtkB5gYLuZLhnQ4hzksUd4mpjyC1igijE5iHjYP6a6EcqyGQ%2BnKDrMr4%2BhBg%2B5fjO8ybHpdN5otTO4wssLTbIiNfwhMOqI584GOqUBywWRuRVxude8vLIe7qUoOomLPXYaOZ0FlKNCpRVNCXDCIOPcP4WPEh96ZHTp5wrFt%2B%2Bjjz8q2eGreE7HhmB3fNNP0nU7NI1BXvwlzn%2BKC8Yf33iLXL99gEf%2BFESy%2FBMVP4K6ydWFq3JzADibtt%2BKGUOGmUNzqVqYJHaDKc8zxmU0MMTvF14JWbGq%2B68n8%2BYRDhxraQ9VfrtNmALplfhS5AdrIEgB&X-Amz-Signature=f7aea4c9ddbb079e165fb988c815df74611a23c927898015f361f7a7f5cff500&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NGKLLNX%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQD9h444ShO8IZDLF9BertQsWaZozhPVDKPCnZJ1jGfyQgIgJhmfWShqU%2BYsvmB2NhBnsChNZRt0eKmNKWjsz1JIMDIq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDKJbzSwf5%2FvopRnMQCrcA%2BsfMH6RtI38IPrhZMtgqlAwyAjytL6JahKIO4dp0DiHppIcemhptc9exh%2FLBnJhWpe4MSgS6GwxIhJnOPe%2BW7KDhyDdxAcJMF5F9FPjOhvS7LCTx7U0Qv%2FgMqT1Cpy8eJn7UZ1Nkaez7qboaPHhKllY64%2FogL7RujlytNNnXstPYnq7UVXNiqhwmab5g3UtRP%2FmAGaGMFQ%2Fy44crvC2N8Nm0g3G0%2BA0D2Nv65WNrYbG0546O6noayQZP99wwUYviB2jLebmAD3288hzWG0QwmV0GihTUxKAt1KinDx0MszzrHS2MvGRhuyoVK%2B8nfkBVyV7aQW2skammnN6PEY7xZDhvFV%2Fm6D%2FDH7Fq5YewiHxDDQ7FqSF078L%2Fzdg3WhAez3dMDZS7MA0sa4PuFhli3Jo4agrLEWM5yycmyoaZ8AvSP24Q7H2w0UrWmdYE6TsdnJAM%2Bh7CaQbi%2BQUMJ7sLo1SoAZY6TJ%2FxCA2F04rkM3w%2BxP7RSGNyABhe%2BwVCrPGoJYqQiCY9TsZI%2F8JDsDBDKZf48bd2DJOzhzjhsTDXmkbca2Sx0eoXywplLXctB5UbQLmR1EZ4k5vHXQENlZsApoLfXwTNX63jYWhVK8eVGOm%2B5lGY%2BV1gIpj%2B70VMJSJ584GOqUBpEloMUSHlVXM%2B8jeQXixXfzIh47Oc6xSmhL63bJAlZvjQvE7ZeKzO9QUuqN7TV0fvHxvEiVkLe%2Fg2I58U1UbbxH1f2HHX2R5kl%2B4WNpkkp2%2BkqBsBE8r546lGzy4ZMXRJfaLsqf%2BkU27JG14t030XYJf73W2b46q22yQb1fpLm00xPumS384gydHuGnazK4e6gGP4K0aaQGSz8HIjMwF%2FIGMFUf%2B&X-Amz-Signature=d7a7ac7fa9842157ae0c1909452c4ed53a2ab394e8849c4eed491d95a5b9fed5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2RD56OZ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCj33jqFU1bd06IqWmmgQcuOBLsGw6JGN9OXac19TrG0wIhAIFWW6sK55M3XqZVkpair4m3X8RjfrWIPEhS9Mcb7f1cKv8DCD0QABoMNjM3NDIzMTgzODA1IgwUAbrcdPI%2F5Sk%2Fggcq3AOk6vrs5CLOQvz%2F4y9e7gw9a70O25PmZa62mzW6D%2B3mBCtZm1KwyPoI3OxkSwKc%2BKN8Y8Dh3oF2P2YHDZ2wzLUywp6pIrgU5J%2BdTJbOxhLdXs51HAZ%2Bdor%2FCVzfPzwzQe5bYEvcFs6QIDMrcAXLLS6WIZrktgwMjW5Pc%2FPNy5yD3bPtQElXwQsLlUKvPvnEgpghub0HlL0oADCm7wbB9dcaTKCvSx4FSllx3gKYHdUwHpLsiFc%2Fy8sWEVCpp7fauHhYMO%2BUTFWJRt7Nphwm1ql2GFrAMo5Kaxghq51WmYM1BOsVVBM0v9h%2BxXgJs%2BW5Iuco%2BMqKAEoruF0KUuKLFwQrXOgmxfgwJAt6L1pOczUl2CG7ZV4V35AT8vpFhfv4lRSEdVUNfJ0sWslQcqIZfBz736LuvOE%2B%2BeFwHtZAVbsUuA1YT1jMbOJkmYkTVnfrjr1ItV%2BxVzZSUs9eSsWAmaBJFigMb%2FMZvUf2EDZh3PkmUdsovKfi8Uqqu60XgH4y%2BqGHKzWnmoBtErZopJ3izQ5T8JHTwmU33HkAjWxdwUMG%2BkI3QZk7Pu1U%2FcxCYeyh5VNP3kKnO8ERzhvgiqWeKWBOO5nR9awaEJnCvosRXEQ4qPcYw44R3Yx7Zj0V%2BzDHiefOBjqkAR59EzXmVokVu%2F2QtEbVbu9MF4qVzjdxRIh6DnsbBQLs5VgwXY7jC7PP%2BnVowtS7nsscaHUKhQCO5LgMyjLj33Qw7jOm8632z2KcUyXXN1bAt6u36%2FkwMwiNySOTjPoMxiZs667QcyxU%2BhSWHdYxlHCe0RJeZJdanvwh9qn%2FPKa9vg%2BYwnyoQ2JtmuMIe2nz9I2F852oT4LvDr6QHz09HwGdDgAh&X-Amz-Signature=aa679b744a29672dd5996676c20dfc9909ea5261c8e2bec9ede2da3cbc30c21d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2RD56OZ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCj33jqFU1bd06IqWmmgQcuOBLsGw6JGN9OXac19TrG0wIhAIFWW6sK55M3XqZVkpair4m3X8RjfrWIPEhS9Mcb7f1cKv8DCD0QABoMNjM3NDIzMTgzODA1IgwUAbrcdPI%2F5Sk%2Fggcq3AOk6vrs5CLOQvz%2F4y9e7gw9a70O25PmZa62mzW6D%2B3mBCtZm1KwyPoI3OxkSwKc%2BKN8Y8Dh3oF2P2YHDZ2wzLUywp6pIrgU5J%2BdTJbOxhLdXs51HAZ%2Bdor%2FCVzfPzwzQe5bYEvcFs6QIDMrcAXLLS6WIZrktgwMjW5Pc%2FPNy5yD3bPtQElXwQsLlUKvPvnEgpghub0HlL0oADCm7wbB9dcaTKCvSx4FSllx3gKYHdUwHpLsiFc%2Fy8sWEVCpp7fauHhYMO%2BUTFWJRt7Nphwm1ql2GFrAMo5Kaxghq51WmYM1BOsVVBM0v9h%2BxXgJs%2BW5Iuco%2BMqKAEoruF0KUuKLFwQrXOgmxfgwJAt6L1pOczUl2CG7ZV4V35AT8vpFhfv4lRSEdVUNfJ0sWslQcqIZfBz736LuvOE%2B%2BeFwHtZAVbsUuA1YT1jMbOJkmYkTVnfrjr1ItV%2BxVzZSUs9eSsWAmaBJFigMb%2FMZvUf2EDZh3PkmUdsovKfi8Uqqu60XgH4y%2BqGHKzWnmoBtErZopJ3izQ5T8JHTwmU33HkAjWxdwUMG%2BkI3QZk7Pu1U%2FcxCYeyh5VNP3kKnO8ERzhvgiqWeKWBOO5nR9awaEJnCvosRXEQ4qPcYw44R3Yx7Zj0V%2BzDHiefOBjqkAR59EzXmVokVu%2F2QtEbVbu9MF4qVzjdxRIh6DnsbBQLs5VgwXY7jC7PP%2BnVowtS7nsscaHUKhQCO5LgMyjLj33Qw7jOm8632z2KcUyXXN1bAt6u36%2FkwMwiNySOTjPoMxiZs667QcyxU%2BhSWHdYxlHCe0RJeZJdanvwh9qn%2FPKa9vg%2BYwnyoQ2JtmuMIe2nz9I2F852oT4LvDr6QHz09HwGdDgAh&X-Amz-Signature=ecc542f773600d82c036b6225100a5261a1f17b362eeb1be3b2c6a7bd7ab18fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YFRQ4AL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCmQjHZO%2B2KahNlKzrPZzAp0Y%2Fjs5O4zWWgz2l69d0yZwIgduEISVuB%2FPLTDjAQXBru6oqDeGnuyroFkWjrABVJ8A8q%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDAvvWMuKbcj99nWerircA1fOhvCLcTOCBAcHDgMfDU%2BtRS63UvmbrKpSbLeHLyE9rK0TXu0APTgMyb0o%2FHfUnZ%2B8NW%2Bg6l2mf1bNfxEmTJ2vYEgkljPr9LsJSoMMwsswD9xR5fGw%2BCG5II8LatyibIZNQ4da3HqFiF6l2Th3tfyvb47iYc5ZR3%2B7OHG5sAIT2PajQ7AbAgQV01RaYzqYGDbi5ybzI56tvMAqNcz4I0y8InxwEH4TSjUjrBhAdlR7%2F9Q8uYCme3h25%2FAYRntiWZJpLjGA6DchMBiyikcAp1C1a%2FFrdP8xzh8p3wx3QmSkBcTIhtWsL3KPy9WcbcucWZE0LE5ETYoBWwUiL1ctcL6KGAYrYfHrdz9tVRQ820E%2BF94qfRnTv5po3Xv3M6NGCOogy2emgUUZbYxYZvH7cEra3R1%2BmODYano4ylfnitfpSFbunUo1mP18IFyZW58SY4Ij4%2FSYrMOGZiUYMicvFN0V2mTyrTx50WopKcYhzAUdntlBdPB45nech6xmy0IKJm7Y6%2BBAyEgzVCh%2BdRJakNoLD49oV2Gsh48%2FMLYvCZKbRltZ2hd7FlIOMzcj6PmdBl3FNIkz%2BRXQIo5mlghfo0QO7jjv6kL4VHUgwYYBd4mm1Hbe1371C%2B1bKyoOMJyJ584GOqUB3DZQdJN%2Bz9RckwXNSmsi1vHM0WN4BjJjXDDXypv4Bf0x%2FJu2Q%2BirlA3lW0%2F4%2BhAfSnGm8mK86Erqs17UHh9%2BuRRd7%2F4NhKFfG9biKTkLdFU%2BByvK%2Ftjr79gWQl9FHaD7XKv088Ufk%2BICSuCNjyl%2FaXzklaT1xq%2FRdF%2BjNtXNDfu1WKsgh8kk78rzpaYTKkc%2BR3E673HRmcRjvWEucAqhTS858ci%2B&X-Amz-Signature=2f409aa8430fd44d842756dceb5a2ffc44ec9e8befb282330b397a2fe42ffe52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IGAM6AC%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDhN6irJm4YYE%2Fp%2B8baj2fcNlNMhceiba5UKF%2FCRZTAYwIhAM7i5l%2F8FxmJ3Fylv4JUA3zANB6iwgekL2yDIV%2FSCAzZKv8DCD0QABoMNjM3NDIzMTgzODA1IgwJYWSpCh%2Bggq9uWjAq3AP6GR8tmzirj3Uk9wuNwBnCCX5Gz%2FeSWyXOiazwOeEUUlpL6jtl%2B%2F1iJFaUqJ2ynWhX%2FK1WkITlMrliJSFB8Dnw3X4thcdDyALr5wqDktXKKD2wWwMsSWeMdeRP8xGVMglk%2B4YhwyKPYsUnICtKtlCsOg%2FEvJF5qsVijzerT7xP4k0sCUBzYy3zfzwt0T9rAaDIGJaG7VOIHVzJR7hi2abZR%2BsZlfEO5jM%2BJM%2B4BDx2i8VpDzZTEgHovW3k0AjlUvKuATLIAwJikyHxb06KGvFQtyYCBAIa19FhpU6IzwML%2B3sOJFwt%2B5mn%2FRpPihEIGft0Y0C73BqarPv7tqxTOXR%2BI2oh7vXHv2Mf60OV6jafXYE4Jrv1it1keuI84IMId%2Byuq%2FXgJ0E%2B4a1jm7De2Uu7xStJz0cI36yNyMSJNKIxIVTDrkejtn9bqBTWKnWaG5%2Boq1oOWiVikuZ7mJgfjpC4Bc0oqmlkIpxjUb8Veqe5bUKHAlrLBLbxOKSC4ovBwYQswSVUaenEwonNSo%2BpqtgBfyl3KBAbRFR4iDsgEvOUiz82Vnau35DI3GoRun5Gm6lC6iQiCYUw%2BLdKruI%2Fv9HP0yVtpO7mFM2mcopDJgvwyG1wMd4m4PvbJITYmDCNiefOBjqkAWNsEUYKTi%2BTC9HV%2Fp3ttxr9t2G5urcErZhDduVmk%2FmEBUqoQmxGOqFouS7ePgLk69J%2Bf6ErEro810Jltj8QcUb6l7eBmjhsP7haOHb65zgdCFcA%2BQIXMUdSCihuPpLL4RUrmH1vKApldW%2BkuigJ2ZAw0VNX3o9lAlG%2BqQ00j1FWyMbxqFxrkcYpYl2vXarggXsebJpdrdHgSTXQ1X8TbqsPSby2&X-Amz-Signature=d56bf0e1dbc10819d3737144e3cc775b82c95aff9d080bb5ab77303efccc1beb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IGAM6AC%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDhN6irJm4YYE%2Fp%2B8baj2fcNlNMhceiba5UKF%2FCRZTAYwIhAM7i5l%2F8FxmJ3Fylv4JUA3zANB6iwgekL2yDIV%2FSCAzZKv8DCD0QABoMNjM3NDIzMTgzODA1IgwJYWSpCh%2Bggq9uWjAq3AP6GR8tmzirj3Uk9wuNwBnCCX5Gz%2FeSWyXOiazwOeEUUlpL6jtl%2B%2F1iJFaUqJ2ynWhX%2FK1WkITlMrliJSFB8Dnw3X4thcdDyALr5wqDktXKKD2wWwMsSWeMdeRP8xGVMglk%2B4YhwyKPYsUnICtKtlCsOg%2FEvJF5qsVijzerT7xP4k0sCUBzYy3zfzwt0T9rAaDIGJaG7VOIHVzJR7hi2abZR%2BsZlfEO5jM%2BJM%2B4BDx2i8VpDzZTEgHovW3k0AjlUvKuATLIAwJikyHxb06KGvFQtyYCBAIa19FhpU6IzwML%2B3sOJFwt%2B5mn%2FRpPihEIGft0Y0C73BqarPv7tqxTOXR%2BI2oh7vXHv2Mf60OV6jafXYE4Jrv1it1keuI84IMId%2Byuq%2FXgJ0E%2B4a1jm7De2Uu7xStJz0cI36yNyMSJNKIxIVTDrkejtn9bqBTWKnWaG5%2Boq1oOWiVikuZ7mJgfjpC4Bc0oqmlkIpxjUb8Veqe5bUKHAlrLBLbxOKSC4ovBwYQswSVUaenEwonNSo%2BpqtgBfyl3KBAbRFR4iDsgEvOUiz82Vnau35DI3GoRun5Gm6lC6iQiCYUw%2BLdKruI%2Fv9HP0yVtpO7mFM2mcopDJgvwyG1wMd4m4PvbJITYmDCNiefOBjqkAWNsEUYKTi%2BTC9HV%2Fp3ttxr9t2G5urcErZhDduVmk%2FmEBUqoQmxGOqFouS7ePgLk69J%2Bf6ErEro810Jltj8QcUb6l7eBmjhsP7haOHb65zgdCFcA%2BQIXMUdSCihuPpLL4RUrmH1vKApldW%2BkuigJ2ZAw0VNX3o9lAlG%2BqQ00j1FWyMbxqFxrkcYpYl2vXarggXsebJpdrdHgSTXQ1X8TbqsPSby2&X-Amz-Signature=d56bf0e1dbc10819d3737144e3cc775b82c95aff9d080bb5ab77303efccc1beb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZK5WGYN3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T055101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIHcf3DNrXT9MRruUonsGaML0Es5cv94iabBXxD04hOsaAiEAwhgQRnEHtMf6r0pthib18AyBqYsd66PCdHVRZTxRZ%2BUq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNsKCQzu70UDmSG5sSrcA1Jx5IZJDBBzgIAL2lC%2FPev27DDKH7DHoec0L%2BlzSoFX0pASuLoV558JfHIpSlHz5iewV1T3qF1n13joyPoqnysOJFVoVGkTMTRerkIOHvVVnlA0YMdwAKaa12ZKrXjY0Lp4jn%2B4XOlQQ%2BMBdMEV3l7sPOdubsUzBJsbmc12ES0y2Sv9V27aKxCtBb5qdE0j6npsZ8E2YJmAZGW0DAX6HZEGZSXPKYj7jsCh3pKduIRtMs2G%2Fm%2Bzcl5m6PGZikCo18NpoTBHhnzQhmr5F9bUkWDGHgRbJAvfKW%2BsZJX9VtRTkPO9JMEeNVrCVL4pYYCxo2nzCt4BH8%2B7eI54XJcMB8BmQBNkAdIi%2BVckhjshanAJZ53Uk7hNENWoIePPRmFIWMCxyau7N5tD3wBLTEhDUjJMBVSMWTQRMHe94sQjlMNEfl9UFFdJSqG8stOPDIXqFefO3fa9as4FMAzeFptv8GdxwghorexGO1v2NV8fzXUJLKaIm2LY3P%2BuppS%2FG0RUVknlBpVayqq7RXownJzOG9S5MDdEORNh9H615OIOk2zVuPnlPVBuL6wNRLEcM52CkA89iYjs3cheuNddpGgUEc%2F5nFCrXwicoc9Ow%2FbJ765Bq5wp1NGW%2FNH3K2OpMLjB584GOqUBcQWFSHqMNsE1vkqQ9cd%2F1E9ULoD3Cfamedh4iARYbSDe%2BGSxJTgskRql3AdoyF6vZadzorbUx6Y9N4yn4H%2FKwEg3U9SFo%2Bg6X19xjkwAukbRPEKimbB1kt%2FGKh3FkHmKq65EbhepDZneUCuBpmQKBr1jEESXY6MpotcadF2Dz88FrOGhInphldCgnV2AB37W6pEUfL1Bjc7VxROwNeZuLhkworD9&X-Amz-Signature=59c6fbc2f07faa0a72c66e6f821d70748eb4a61b1bba8f45e26cecb1e5621401&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

