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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFAJKFYV%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIAS23jWUGegc5uMMwlfdyUIMqzJBb9woRAGYYZTVRN18AiBIbsayM4CO6JmIbxKBvT%2BM19NME0BL0D0k%2FHInLSc3zCr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMQV2e1igUba%2Bs%2BvHpKtwDwgPiv%2BQYr50AligktFFx3mmzDqdHc98v2%2B3JKYImdZW41evWpxM0e3z6n%2ByIqYP9h5DBAxcowf6YPOsiEy3chCjtfp816tFej89vbGjgUvnR4AyafsJTPAr4r4GTwCaW0xOj2NihUzo72dEsZNC58KS31uOHvh42PRKRjMEg1tTjowysv542%2FcX%2F79XmsqsaEDkckE0EqXb9ugfBRbZ%2F9Q%2F0T%2BCaP1VCBJ3QGRVkfrTBlMBvXw70vDH%2B9SGU7RupnRWBbNyf%2Bx0ze3KgOYApIB0YoR8fDXYyUMYcqEAt9aiD2Mr68pN5KvBk4FTg2McZvXPQSt0C7a30A%2Bc0QAUyn7Ew6LPJ8NVNjm1wbjwT2rM7Lf16vaz35cJgot09iPGODOdv5oIYmXSqdWrRDc6%2BUb4kyb1VNqDVB4tG4pWKBDQnzL%2F24S3RzObSM1IM5rbv9KvSMF7tWDh1%2F8rwvgevcPutfTrqqahTKQmxNr7o5KLq9W8ThoJZMM82EF91tANo4wqY68vUH5tgMsEtzOYYfHWYeY%2BnNnnyOnAsxKVrrvESPpFE4fHcsYF8woaWfZBPkHjUSQLkjnA%2B%2FAviXerj5RFNS6IdnYGIFy50ipWN3quCVLrWD6gYrhJ6hdwwitn%2FzAY6pgEcPLvtft%2B8Jce7Y9%2FSrGlBJCONlHUbmH%2B66w9MdXpfUESm4y9mMtSqrDdNopNIPZQQyCl57LjJ3py0mmguYw%2BEHRPD1S08av%2FYQBo9y8x5xWQ95%2BqR7FI0q7i2JZALOkAphKWbrkCv%2FZ3Irb2N7aoebW0NVHvvjIujnqPRFCITCMFFUZb7Hm%2BMYMtNgjQAcYKAoSTGeFhgwHKkcMfxkKH%2FUIhE0H48&X-Amz-Signature=10fab1d0b72c3ce466fb8899a31dc39becb8b3eb8175dff0d1fb751a0d417d6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFAJKFYV%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIAS23jWUGegc5uMMwlfdyUIMqzJBb9woRAGYYZTVRN18AiBIbsayM4CO6JmIbxKBvT%2BM19NME0BL0D0k%2FHInLSc3zCr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMQV2e1igUba%2Bs%2BvHpKtwDwgPiv%2BQYr50AligktFFx3mmzDqdHc98v2%2B3JKYImdZW41evWpxM0e3z6n%2ByIqYP9h5DBAxcowf6YPOsiEy3chCjtfp816tFej89vbGjgUvnR4AyafsJTPAr4r4GTwCaW0xOj2NihUzo72dEsZNC58KS31uOHvh42PRKRjMEg1tTjowysv542%2FcX%2F79XmsqsaEDkckE0EqXb9ugfBRbZ%2F9Q%2F0T%2BCaP1VCBJ3QGRVkfrTBlMBvXw70vDH%2B9SGU7RupnRWBbNyf%2Bx0ze3KgOYApIB0YoR8fDXYyUMYcqEAt9aiD2Mr68pN5KvBk4FTg2McZvXPQSt0C7a30A%2Bc0QAUyn7Ew6LPJ8NVNjm1wbjwT2rM7Lf16vaz35cJgot09iPGODOdv5oIYmXSqdWrRDc6%2BUb4kyb1VNqDVB4tG4pWKBDQnzL%2F24S3RzObSM1IM5rbv9KvSMF7tWDh1%2F8rwvgevcPutfTrqqahTKQmxNr7o5KLq9W8ThoJZMM82EF91tANo4wqY68vUH5tgMsEtzOYYfHWYeY%2BnNnnyOnAsxKVrrvESPpFE4fHcsYF8woaWfZBPkHjUSQLkjnA%2B%2FAviXerj5RFNS6IdnYGIFy50ipWN3quCVLrWD6gYrhJ6hdwwitn%2FzAY6pgEcPLvtft%2B8Jce7Y9%2FSrGlBJCONlHUbmH%2B66w9MdXpfUESm4y9mMtSqrDdNopNIPZQQyCl57LjJ3py0mmguYw%2BEHRPD1S08av%2FYQBo9y8x5xWQ95%2BqR7FI0q7i2JZALOkAphKWbrkCv%2FZ3Irb2N7aoebW0NVHvvjIujnqPRFCITCMFFUZb7Hm%2BMYMtNgjQAcYKAoSTGeFhgwHKkcMfxkKH%2FUIhE0H48&X-Amz-Signature=10fab1d0b72c3ce466fb8899a31dc39becb8b3eb8175dff0d1fb751a0d417d6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RGIBMCM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIENJsE72Ymi6iX3PdhUu22278E0E2PIzKBC9K17aNjL8AiAGRcDiXyRCGvy9JjFG1OOA2Uoib9oAh152XuUj3%2BFXyir%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMHx8EMO59zsqB64YMKtwDU61wOgyEgMVpd8xLrLeaXR9OzXiBPEbMTGL1eNKqhEVtKqNKQyoEX%2BPbH5VcamM2rohK7ZCN%2BOUBPyPoxSwQwP7jNf8Twx1S8Xk8AzY20Omzby37uqBiUKsLGkMDsUWGooUWprxGeTpk0EEwhq3gy564lAGslKYULZx5oow8XhErTwBofPBA9n%2FQjI8045s1pEzdoDzi63ElTsFaIXRlfcHEzyUvGbFKOl3cQ1Ua5uMOkNezWJpz3ZQYMV%2FOeh0Q2OJLx5xOSzzVhrfo6trDhYmOKIJiaAJVSQVnl8hTWiLvV2vJpscZOSSA%2BcvSBTcDjW4dQX8rYZySDchHm2If%2BEk53U2OIbEGccNDCOT5cFMZvkgP4yEafY1z4UgmyEJwpXW%2FVY4VA77504dsAuOGMjOvRK5rQwWeQCUf1ATgYTt8Gw3HAIQnyad%2BXkEEx5EhY9SbpJPqsnzy%2F%2BUeLJZ3W8%2FjYiN5ZPqE3T5m24kSyt79Nh1N9vBFNw1UXp%2BaLRjzMVCxe3PYB%2F%2FJ%2BSBHLRtTOr9E8FlRbZrl6UczN8Uhcfh%2BUKTAHxNqB5BG33Ldb55IkSe93SwZCWuO15PShPx4ky0GIDNm7JWJ6Q%2BsSAzEk1%2FixD3VP5XzI87g4x8w6Nn%2FzAY6pgER1fd5akdnLk4apVogmBX33OdbJTc3FZ6pg7WEdQrjR23IlbZ0QigwJW3HYTEXha6eIxvZR0HUcZK63UmNiHfZf9HqMKIuezwKRJn1Z8gCCl3guSsQ%2Fk4VKuCX0Fkxu03UYIYFxvmhW97C7AsJSnZy9M0fQg%2Bt5AwtzhUlWRZkGWoeJ9asjkmJDhz6ZoKaGubl0uPkulGoTppdlFS%2Bd03NZanYsFry&X-Amz-Signature=e63bb4cc67d6f9a1ce0af189f94730eec9e6e7688cd6475125d5438b9a370bdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466374FEVVJ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIHSPLrLz22WmbREPSnMEoXucgJKQcdc3mU9GVvNtdBWqAiEAyKeGBpEPQpkTs%2BGUV5eVHPDjMXZF4IUCRnM4Jt0jRakq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDI7Z7Ppm%2Bb6Cf9rsVCrcA%2BPRnyPPeKwmk9TaOpu%2BgqaerZ%2Bx%2FlNaeRJvG90jzrWTjqvr9AG7mPQSLWWVxd%2B5rf9NkdkWQZgGJt24TNN9iyguE1fEObk8nexPGU9alFZByUP7BlJV5IZrQCmwgmnGWnKKtajJ6mxJ1fteXrUC6s93IYuqPJe6B249iLvHMMnXwguA%2B8zBdA8Ue4fGHETAawm7iiCPr3iU%2BLc8fiuDLOYFa0tyR2AWDMyu97ns2xx4PP%2FY2M1CBvCzIGM89uYLVKh%2BPCaRBwTqOUAIj7pPPXfZpBF%2B4nxIx7r5TEp2edQVplOauhPqjxN84HH9KfGfSK%2B6Zygn2GLxwICtC0I072aqKjPFffsarSUiiKjGmZlntqBKBIfFXKl5PqCbXTUiijoFwAR8XqUQU04RFKLNmFtGX13sFJNy%2F1uhzCP2L3X1WO0h%2BKS8Ie3neqopsHJzW3Hn5%2FS%2BugZgJfpXCS3BCBUDo%2B7jP9S7lg9PBWRKytxkg69RSl7Tw4Ec8WN%2F%2B6zu5wRmSIv32oi%2Fz7WTT9Lkq8jtbnMCvZzbzVVkBSEHMAeh5XmgTXdJBx%2BtF7TKzwt4mCmbMEhrg5OX8qOJEI4umF9OLhMEzWew%2FuSMAD9XjyMRNBwzNlg89VinEzQUMI7Z%2F8wGOqUBgawfQEIUT77kVxdKRNn702bto2uBN%2FTK6jh6Eq2bz%2BGBouCKQRPti97jVJrkwEYiiw6C8tQr6zahu0xsdywMSiF0cUiBYxEsMbDXXStMNWJMA48Uoz96%2BaG1xniftTsrL3N%2BPPHt2Y9SVhWeLIlMxiogfz3Zm7MsQ9wmG6eYqR1Waxz%2BaZ8iRed8zlkm88C%2B3WutuFFdrF66zpSQWOyLneIcfm55&X-Amz-Signature=1823700929370ce7fa1dc76989f2ce23d546f541a547d2a56067f4adfffe95a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466374FEVVJ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIHSPLrLz22WmbREPSnMEoXucgJKQcdc3mU9GVvNtdBWqAiEAyKeGBpEPQpkTs%2BGUV5eVHPDjMXZF4IUCRnM4Jt0jRakq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDI7Z7Ppm%2Bb6Cf9rsVCrcA%2BPRnyPPeKwmk9TaOpu%2BgqaerZ%2Bx%2FlNaeRJvG90jzrWTjqvr9AG7mPQSLWWVxd%2B5rf9NkdkWQZgGJt24TNN9iyguE1fEObk8nexPGU9alFZByUP7BlJV5IZrQCmwgmnGWnKKtajJ6mxJ1fteXrUC6s93IYuqPJe6B249iLvHMMnXwguA%2B8zBdA8Ue4fGHETAawm7iiCPr3iU%2BLc8fiuDLOYFa0tyR2AWDMyu97ns2xx4PP%2FY2M1CBvCzIGM89uYLVKh%2BPCaRBwTqOUAIj7pPPXfZpBF%2B4nxIx7r5TEp2edQVplOauhPqjxN84HH9KfGfSK%2B6Zygn2GLxwICtC0I072aqKjPFffsarSUiiKjGmZlntqBKBIfFXKl5PqCbXTUiijoFwAR8XqUQU04RFKLNmFtGX13sFJNy%2F1uhzCP2L3X1WO0h%2BKS8Ie3neqopsHJzW3Hn5%2FS%2BugZgJfpXCS3BCBUDo%2B7jP9S7lg9PBWRKytxkg69RSl7Tw4Ec8WN%2F%2B6zu5wRmSIv32oi%2Fz7WTT9Lkq8jtbnMCvZzbzVVkBSEHMAeh5XmgTXdJBx%2BtF7TKzwt4mCmbMEhrg5OX8qOJEI4umF9OLhMEzWew%2FuSMAD9XjyMRNBwzNlg89VinEzQUMI7Z%2F8wGOqUBgawfQEIUT77kVxdKRNn702bto2uBN%2FTK6jh6Eq2bz%2BGBouCKQRPti97jVJrkwEYiiw6C8tQr6zahu0xsdywMSiF0cUiBYxEsMbDXXStMNWJMA48Uoz96%2BaG1xniftTsrL3N%2BPPHt2Y9SVhWeLIlMxiogfz3Zm7MsQ9wmG6eYqR1Waxz%2BaZ8iRed8zlkm88C%2B3WutuFFdrF66zpSQWOyLneIcfm55&X-Amz-Signature=8b21dc9a989429d7fc816d5b6b623e3e68e97a7c23d60f96fc101fcbc6c94d6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQ3EDHJ4%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQCVFtHE7I5uEI43IZIyWRk4nQ5%2FH8mrrPm2Bb5T4WDh9gIhAJ5LT21CEAb3OEFCHuCrcwNkyZAGE4kABjRrpwnxzuVhKv8DCCAQABoMNjM3NDIzMTgzODA1IgzYb0D1QLLmLrf%2BdJQq3APaSksIHtaF%2FYjhTc94DVQmrUbMztSzBNka7L3wookDDQrrfmIPYvZX8bigcY%2BEsD%2FJpXeitQieRKRJjEOC21YAp0ZpJa%2BJuhJbvCpAFRhgyaobGPPGCZi6beElN0NeWg8f8O5ZQXM1Sc0QGeEjYQKTX64XgDiLAbTnjQCLSIFohUlxbInvqYZoHDm%2Bi6GrlsuAl7%2B%2BRV4pwNlnymcHybYb15W5v%2BAzGdYPctv16Q5UD97AeOWHN%2FH8NBWEM1hgHL2X39KWyrvh0Vk9IPUaDZm8JX02wB5rUmxAt8eNL2xY8s2rwgPbIVBCXGnExLfAGW2opYcut%2F6IxIdk1d8h404UZWjep3v26lPP%2Fmr7zBkNUur7qffb2n9sitMSiUM23dUrU03rsJYBCw58gKg%2F8g%2FsXzjhloLXWIuCQX9lmBeXCOPzM7cT5WU8uEk7ILrbinl%2FClRg5bTaJwQf7Pg%2Bi%2BlyZZKsAlVUBFDXXqsm86hMVmxvprXnu4apbm%2FD2clL2ffMBuMQKQ4e%2Bh%2BuiXPCCvSz4%2BIITn6NhZLflMYh82ZCNZp2jQ%2F6ia5eAcbsuLWGXeT%2FbvbDraJVyOvHMY1FEqqFxUeMyx%2FuiO8drLromS5d0CdThPjQJWih1dXE%2FjC82P%2FMBjqkAUxMC3bO%2FSW7sCmTtVB4K6PMjEhDQ2qNV8pP1b7VJsr8%2BDcCn52dIoGxnz26oWZB7PjLugojgEclgjqf4qVPWQ%2FiOeWO%2BLvqSMl4A5AiYLSovAu9FSBAKNfUPeavQYchlnBNCGO%2FdMJy4vFZOhYfe6O5F54SDziKesxrmEj1orrnpNRTUCtyYXgt9V4WyqEBlX6%2FyIq1akH87%2BJ%2FBRJ5dSFCgM70&X-Amz-Signature=742bcb12cc785f42c80c2b8d16491284851aebcf11bfdf78cf2f5c9d982747e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKMVXKFH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQC%2BZqYBLgALJxlnEy4xLPx2xxV1dRqjtNn43PLvYFZcYwIgFuJK78VJAhdGM0vFCYlvnK6xKU%2BK74ao2UvU7t%2Fjnv8q%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDG2XCl0wR6lCcUijoSrcA0D15CKflu9tqpemsKFbnxT2HA1bD4XYSXaJDfEskmENqV%2Fe5S5qAMsGzYJSnLtmcbWJQBVK7r7jaCsz5a2za6TohUtUk%2B0Xg4Nb6vWkzs9iNV%2BLmqRZ3dbqEe09JRuRA8EIRq1kxm8u%2FKrs7eZZuWjBA5jVwuSv1L2xVjEcOfz94RrZWQnhmdZWm0d4oW1iOnT%2B98QRPvOTlJBn5wDmbZy3%2FOpwpTYxmRsqjjJiOK9eyfMX1Xmadsmg%2FEtjZQBzRbyKfk0v58zUwyy%2FPxwNFfY75zmRQjKVcResj3aFAi2BFvbOD6RBj80wIEAlH1ET5LbZAeWomeMuPSgrVXg3ejeMp5HJgypEob2TWdHHCeCWUBVNCI610xmZmjrL5PScHWF1xTyo833V%2BvBgm6lC%2F%2FaykeAy%2FnyffAoFCJs6xJn73vzWWiORoPs3Ls1tY2P6vCJV8LoMN%2FfTyW0gexBNdhA7bDChpTdyC8IWkJ8Ef01Z4BivTUT5AIOIEOcdc%2Fmnj7BpnNv9wujS4HbJs1Qy%2B8Ymcw0tu1VuXtQNTp5z5FpXtXcaQwXpa4fZtNtYpp5D7MWWAElalE2J05yrhW8uEem2AYAzAA4Fk1f%2FQ62gC%2FuopOvMI5G5rEMUQAdkMO7Y%2F8wGOqUBXDl0N%2F89InTcHNhbsMLyGEQT8MOy6k6U0ect%2B6kifjeqedqmi4zLmOYE1XMFEPfHhxPWCMIDHgxpCv17%2BBsttl9r%2BRxDgNd4cmDrL72ygHmmJApbzcKVa3zH4mNUZcomLeyoxKh23o%2FcHoe54jg%2B26tPbZw0lqdUoGOCUi9Xej5tbsqSEIqZk9hyONi83fAxLoJpS6aakvXS7PfOJopan4cMWKIT&X-Amz-Signature=1c990e2371f0631fe41aee977266b317aa8a0d28b97f792251e1ac13c5606ab5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663B2P23JO%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIEkImbRSW78%2FnBKd0kPQeF7Mnn7zUPwec8ZJKMOpVP1oAiAb%2BLiWKgWtVP9iPsVhM4fG52LcRyQSHxyHo9rai1PSyir%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMINmCOVvEQiCogrYxKtwDIOLBP%2FNs6VvV1rr%2Be0EXrhQOT49hzh7Nndt98dHPbhepwGuaE8gzBeOR%2F3oxx17sOwC8HMBxCwjl44fmVou1GBiZF69lh7g%2BnziwDIsBc3Y8SkXSZcU31yTrr%2FVh3p%2FZjteTYyrtOQsCy%2FYUZ58xrjw5vKIcMXODGj3Bdx2wByLdTwyg4DWReh%2FzwbmkgVw5bdWSssnaU4w8%2BGsvTy0ojxqRyY6SSEXYIYKZ9ivpzM6ojx7o8VP%2FV8imlabRzESzt%2FQLZqUHJvBiweJgnB4SeT1S3YliL%2FyOXinJylyB2LLvXrAZ3K0LLeO8HERsHJB6PpDC7deu3%2BAiNjz54TMHHucT4ogCiZw1pq4t5HkvhNDKXxFxzC5KrEtYM2y8pAKDVFiuOIiKTRDfxbBi5WdGTHB8ij41KdPHFUxA8Kk2CxFkj005wf%2B311tyfrUcAuy8nWLS0yQ8iEliSHHed8WC%2FSCJCSokDuJkDai0wjTV%2F2vn9Wjo9xZ2Fs3535Wogvx3MQGX%2FYqBfF2LbFIx%2FXhC7Hz8EI0EQCY3iSkIaz2NO5wOn05x6CBSFl7i5sKmBi88GQfY%2BycwiKW2u7PzAAE4sqAarmyRa%2F%2FKkxxb%2FDtKmtzYkCqQgfAXfb1EViAwrtj%2FzAY6pgHU%2FFPkiZfzxWHjW3PMmTN6mhMQYmTa4b10ug8M5k%2B5T1Bwv%2F0RSmIAPZLxC2D9WVvOUP5%2BTUN0P%2FFNmLhaXnuagv33ZLrcs6%2FJjZVyASdCnoUg%2BBeia7Fs8eC8FGPTX3HIu0tyZQ0kfAY2%2FWFzTnQWepTeniAiKxzmCJe8vXAtUY84sgXHCL%2FpvNq3cd29GHCAJYgwl5dcgzdRgcciqWbtqDiPltgV&X-Amz-Signature=78dc5067e2ddb392cf826b39db24002a955f6330b7161182cbd928253d2bac44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UI624BKX%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIGHxv%2BjkbODhqHK2VF2ikkFyUcbM3ULH%2Fjv%2F0PEQshWxAiEA3L0qE3mr%2B36%2F0K%2F%2FwYenWA6Fs2uA6qXWQpByTok2ttgq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDHJMpeosvp9w6xfigyrcA16lfMVqIz7gF5lWg%2FxnPnzdSi7Bh3Qvp6dhuLR%2F31rYC8vVKlmVM9ZS0o0J%2BEAI%2FOwurtRgqJqGK1uNHYn8RIoSbNg0kTGA5uEj60Z5yDujyVd%2B2tArq9WMVWWDaMriKk9RK1tWsoUy3o6QQdzOfZtYAv%2F3ButPiDHJ81mn%2FjiGcnPgELI8nC9KE7soGR5X3KaSyt862xxiQ76mw2fjH8Ua6XukLfH3LgOHyHcFDEwQzzBTbtGvUFQF7ka52AX5jlAzV%2FKOFYjoMBjPZDjlFZqTi1ifK0nfJ0Lxew%2B7qSul2Ha2difrRowNtzjWnNAHgDWxvaKjXhYT0PoUH0kodbWmvBEF3valD2R%2BffClg0E%2BRnx%2Bi%2BZNOQVyhn195NlJAsh1Oz9%2F4NlCqB07bEBN%2Fks8LO60jr0xWMrUmfboIs0rfHLAqPeMvNhvO76gCZY8UEqjRJIc%2F6cAMpGcI3UWisqVRmMmRaOGRkM44SdVqjSM%2Fth5H%2BzFqFq7QjSlNiuaHZPaXZi0JXcJ83b8WqcnkTKZO2p2l5StD4eNlhgMGOlumb7LPIGX2o%2BO0KqIQWM9WetoOuylmb0Jn0lQCd9D9fKRRvruji6PpE5i5Unf5qyGOpE%2BjGLUxkKSi6XmMJbZ%2F8wGOqUBk56J%2BenKwc98JMNSemtsipHLHOL2%2BfxzMHRHTDvqnm48BY9xrV5vEluFikrSICDJ8C3aZuWEntQPbIpkSsLjmu01TXAQysp28I07eDhlwFw9%2FIYzD6H5%2B6L02d1Zf7DVtznJEt%2BGXYVDPsGWNP7eh2Qbli2iHkPnf7hDLjr2lKVWLKeg9LgKs%2FraaeyME%2BKxk42EDISsNHfOO9Y885QsX%2ByNoY0w&X-Amz-Signature=8b7ac6dd05377f297b1878cfa47b14259ab384249a09d1a6907ce6359e9e26f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UI624BKX%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIGHxv%2BjkbODhqHK2VF2ikkFyUcbM3ULH%2Fjv%2F0PEQshWxAiEA3L0qE3mr%2B36%2F0K%2F%2FwYenWA6Fs2uA6qXWQpByTok2ttgq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDHJMpeosvp9w6xfigyrcA16lfMVqIz7gF5lWg%2FxnPnzdSi7Bh3Qvp6dhuLR%2F31rYC8vVKlmVM9ZS0o0J%2BEAI%2FOwurtRgqJqGK1uNHYn8RIoSbNg0kTGA5uEj60Z5yDujyVd%2B2tArq9WMVWWDaMriKk9RK1tWsoUy3o6QQdzOfZtYAv%2F3ButPiDHJ81mn%2FjiGcnPgELI8nC9KE7soGR5X3KaSyt862xxiQ76mw2fjH8Ua6XukLfH3LgOHyHcFDEwQzzBTbtGvUFQF7ka52AX5jlAzV%2FKOFYjoMBjPZDjlFZqTi1ifK0nfJ0Lxew%2B7qSul2Ha2difrRowNtzjWnNAHgDWxvaKjXhYT0PoUH0kodbWmvBEF3valD2R%2BffClg0E%2BRnx%2Bi%2BZNOQVyhn195NlJAsh1Oz9%2F4NlCqB07bEBN%2Fks8LO60jr0xWMrUmfboIs0rfHLAqPeMvNhvO76gCZY8UEqjRJIc%2F6cAMpGcI3UWisqVRmMmRaOGRkM44SdVqjSM%2Fth5H%2BzFqFq7QjSlNiuaHZPaXZi0JXcJ83b8WqcnkTKZO2p2l5StD4eNlhgMGOlumb7LPIGX2o%2BO0KqIQWM9WetoOuylmb0Jn0lQCd9D9fKRRvruji6PpE5i5Unf5qyGOpE%2BjGLUxkKSi6XmMJbZ%2F8wGOqUBk56J%2BenKwc98JMNSemtsipHLHOL2%2BfxzMHRHTDvqnm48BY9xrV5vEluFikrSICDJ8C3aZuWEntQPbIpkSsLjmu01TXAQysp28I07eDhlwFw9%2FIYzD6H5%2B6L02d1Zf7DVtznJEt%2BGXYVDPsGWNP7eh2Qbli2iHkPnf7hDLjr2lKVWLKeg9LgKs%2FraaeyME%2BKxk42EDISsNHfOO9Y885QsX%2ByNoY0w&X-Amz-Signature=1793a95f245a26007e80d722f33ae3671116437143813c169a81c148d6b0bb9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635Q2VFDH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQChRF4u0PrvJWCBQ%2BMxUnbaUwR4J7BFL6p2IiW6DQR5HgIgUnHTUUwvMYgQMx6Rd6EySwjSbTcDd0%2B3KNiNj7gC%2BwQq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDOp1sU%2F4L1Yge4zfyircA3AiVy%2F1K2a%2F3dyB2FOHM07RNeSBsOAtR5wsf7rdyGOOJJ8dRiY4HcZT1sU2LHEhzQoO5okRmsa8aH6UCislai5ZaGmMTWG9Kw83IVsVf9%2BeCZz9Kzpx%2BeHhq6ukLLYHB%2BewyyimudhIW2EgKllFrHIxTg71m4gon3NFPk%2BEjk75Kl5jaulbgsBLO57TEg3JgyuIsLwVBap8DrA7FfcLNG24efQH42PiR5k4ZJVJ63njhs4rxo%2BagMQX8CDylza7980ynt7PX%2F9MmWS4uIWZZKX%2BL6gRT471qvqrofvHbAYlM847AbRnR%2FAe0jLETcCwqU9YQJZHviFEZtXEc670vMHsWtBPECdNJuLayXZ3uVlw%2B9jEBr7wEVJaJPz8JewpXN%2Bs9YcnuIDT34pVZXTvV5kD%2FSfCxXyhQ3EFmPR26RDfgX%2FxpTrD3YWOPQQHfH7PrFzsLHz7L4tyL51o%2B9lb1k436JFr0ummCW3F4RrwvT5OLGjyadvg0bkt5zSZVNyrKIHVgMcnm%2FBE%2BHaK3t3KviAH2DTaA0z7kNNqx%2BD5Xk9gKAs9IFicNywc5lTmJ1ApDarSugPRI2es92aX3q0INNwgdNn%2Bm8V%2F9MRbTy1GyZt4in0zVRZfd7WT%2BHQ9MO7Y%2F8wGOqUBspyeH86bxHQk6TdOMYqNKjwSwM7b0Jwbvs78zqvkPgcQEL7nWXW%2FQ41qES%2FvpWgOgh7AMvivGRyvI1KMSw0Guq2oPc%2BanrYTqXYjSobi4OksrIgZFYXjuUmU8AEE1OOt2hZdaIeiymYkhY3k7Uvt7OvqlCnTJ33nHIiEU5umcZqR%2Bjgk4BLDV65U6e5clR8S3bYZjBMmV%2BwtAm1VJNnXjT03UNr7&X-Amz-Signature=b617c4b84727678a05cdf4b3f5ddaf4c089f2b9c1f825772c25b302a6e0c5236&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3KF6F6Y%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIAx7ghSerT2DvCq8LVIRlo078CRISuTdIljytky0kTBWAiAGJtLKSU0YtfEAhrtlzgNewaIXuk8jdsi7mf86whLk7Sr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMbYU880%2FEa8hH7bkKKtwDIs4WuU19L0rZOzXERcBNtifb0WBbWdnbn3Qioj04xIl49S%2FUpWLGcoSdYPxRJRADbj0urNtFtyTfDvsXyNe58NyJXUrP2WIkL3zomw7w5Vt2nJWbzD5qYZuccIWhWx3F5yFO9rs4Z%2FC81KVF9QKauUnzdoVHKlrfSGgK2FELobFQxnAFaOR7eXeOOGJMkKOQuFVZPPPD6T%2Fu2RRVGiVqRUQMbVwNiaHEtP2MrnUDqmRuYu6LkVuek%2FmFkIfK1DAmVacoi2v1dKxGdrk124gdYyupvyROrPBhXkahvfO%2FTun%2FHp7nvi%2B%2FbKNAheeRXNNwoLRznLWQR%2BlK6PcNlYPIVzMW1h4Xq2q17nyoqa3lGIH70ul3TTUUtQnK2WJyEmSS20siPIsMP%2FWP6isEnW161WRPa2O0jUbXF6C0yI%2FOemOip4khAvgzNb2IYce9mdtnlA9caYrS9kZ24ywrtztLIfXSVS1XT90DTS88VOM58a0UL6IH5nFFu4TKPv7huc9aDG42Mmnaa0vzY1rR4SbPMk3xvjxmulfv3rm%2BCVXoVYrKnImR5xfW9uSahTQN26wtXYveeydrJiYbwNFXR5TT9GW5cVtOd%2Bk92TdULwtQvMDKuqJY1Uvly%2FyH9SYw%2FNj%2FzAY6pgF33ILNbJkVcGayGKp6FOIfRtQ3ry37prIWqZIAo7OzzkPzoRNe1xp7ZgwR8%2BNmZywf65g43fSVbU68LsnGyAGNhGVS4iMalqLvuAL2vV13ce1V7diqdsWwI2TZ98blCKpdvgzNT%2BuZvrk3T6Q3LxK26Jrkz2%2Fv48YA55ogrCxcib9X7auSzH7wau72tRaakDbipTCPhjVCYFFkXToH2Kj5ER%2F7Ap%2Fe&X-Amz-Signature=ce73c5accdf1a556b60770f20c87b942af335d17662cdde2484de6f533e62fe4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3KF6F6Y%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIAx7ghSerT2DvCq8LVIRlo078CRISuTdIljytky0kTBWAiAGJtLKSU0YtfEAhrtlzgNewaIXuk8jdsi7mf86whLk7Sr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMbYU880%2FEa8hH7bkKKtwDIs4WuU19L0rZOzXERcBNtifb0WBbWdnbn3Qioj04xIl49S%2FUpWLGcoSdYPxRJRADbj0urNtFtyTfDvsXyNe58NyJXUrP2WIkL3zomw7w5Vt2nJWbzD5qYZuccIWhWx3F5yFO9rs4Z%2FC81KVF9QKauUnzdoVHKlrfSGgK2FELobFQxnAFaOR7eXeOOGJMkKOQuFVZPPPD6T%2Fu2RRVGiVqRUQMbVwNiaHEtP2MrnUDqmRuYu6LkVuek%2FmFkIfK1DAmVacoi2v1dKxGdrk124gdYyupvyROrPBhXkahvfO%2FTun%2FHp7nvi%2B%2FbKNAheeRXNNwoLRznLWQR%2BlK6PcNlYPIVzMW1h4Xq2q17nyoqa3lGIH70ul3TTUUtQnK2WJyEmSS20siPIsMP%2FWP6isEnW161WRPa2O0jUbXF6C0yI%2FOemOip4khAvgzNb2IYce9mdtnlA9caYrS9kZ24ywrtztLIfXSVS1XT90DTS88VOM58a0UL6IH5nFFu4TKPv7huc9aDG42Mmnaa0vzY1rR4SbPMk3xvjxmulfv3rm%2BCVXoVYrKnImR5xfW9uSahTQN26wtXYveeydrJiYbwNFXR5TT9GW5cVtOd%2Bk92TdULwtQvMDKuqJY1Uvly%2FyH9SYw%2FNj%2FzAY6pgF33ILNbJkVcGayGKp6FOIfRtQ3ry37prIWqZIAo7OzzkPzoRNe1xp7ZgwR8%2BNmZywf65g43fSVbU68LsnGyAGNhGVS4iMalqLvuAL2vV13ce1V7diqdsWwI2TZ98blCKpdvgzNT%2BuZvrk3T6Q3LxK26Jrkz2%2Fv48YA55ogrCxcib9X7auSzH7wau72tRaakDbipTCPhjVCYFFkXToH2Kj5ER%2F7Ap%2Fe&X-Amz-Signature=ce73c5accdf1a556b60770f20c87b942af335d17662cdde2484de6f533e62fe4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667O37EF3G%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T083102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQCs1Sr0t29X6v7YnC%2FjOLUf05kcISIknzG9wc1nFe2gdgIgUEd1UVfle9lJdNcpw9JIINqFqFY53jdiSTsybQMq1EYq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDBPexqx5MbzZ3A6AlyrcAyjhDc3AqTkZh4oxRAGlWDRRzumT26RdvNPblOTUPYx1aF521aUCb3U%2FKRCqMGHUS2E8CwFkmn0IF83Z%2Fv3tr4P6vEmekaxWVbN0kU0aVn%2FE5iiYvRBgxpstz5HWSz4QTMfhIQqLz6TO%2B8RBbCFt6vK0avzOwbUK2ra5qjOqgauYD%2Fwgv8bIYCcPYgN82rrJBF0huvtKXEcSZ6cXD%2BEMKvvlKljvbDHlzbKyG7jS3ZHcuam4NiMb9T4jnQK8DONAuAy4AENH5PQb63wKeWWb4rDQxfjLrOm84z7jYpjAMy914FA%2BP3cT7Kg1clk10qBP9M%2FSWMqz%2FQ1XJ0%2BbtnV3oDJQktO30me4xo%2By3lmNyMiXFoAhuYDBLkRD16p3GHzQC345mWWshOFkrFjzAhFZYlv5FHwZZ2zey5lme8Fv2izlY53n9nZ8kpAo91FyJvWRHuNIC5WsIEsdJlHpteWSlwlBIRWuGRAFdli1fsGPFNm05j%2FSDAv79TkqxfjpqZ5Hy5E5Xq6sM8NVLoSEx1yb8FflR7tv13GzRdzBqWS768JecPtqpBmCv3hhlPlTSkaHC9EVaU8cz0HOLTT%2Fv8WhueDmFxehyHGHZ0lY4KCLO%2BybL7dnIOKocNRi8nDpMMjZ%2F8wGOqUBjdpFnXSk3c6ZwFxHjn6txN5IL7L0FO04mfQmhxacR3ZFidwzzhteTtDg1pvnhBNZsnqk%2Bqf3txLuHBVGsasTFO%2BRwSequkWZIInKjcaYUAQzFHxYDQlTSJbNDW%2BYeBH2ZU46dHBe6ea2TFA55KeqkU4UZf5pPfl1IzrNRgfxUgJYsFrM%2BEOILF1YvgEWBB2u5E7eYsHoeb9Wx5YHQukXLBzZambp&X-Amz-Signature=6cc869ee9026f51d1f019c6b77e5c5620ed820c1ee74d0a70c02eda88ad8f5cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

