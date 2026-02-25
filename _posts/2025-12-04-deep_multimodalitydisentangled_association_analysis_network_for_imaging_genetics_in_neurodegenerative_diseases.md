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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MMRBHFM%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDcf%2FFI%2Bia4kiaeItb8fpGv0seagG9uQpEYQFCEVEyMAwIgcWVqPIosouTsrI7OPXIUdGeS7o0TAgl39kbZNQc2%2BMIq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDD0q1pqtUmGK488XkyrcA%2FewzN5QfVMVCYjRCS9MeCv6rXU0%2BPXRvLLzs9YhdBX4RLZMaG%2BP0cY%2FlIY9E0NCvjwwhS3q751tJT%2BVIscUacaqMaHAmHMmOobp4J3Y%2F4X88tLjCSgo2GwH66hRabbEh4U7baCq3Nz6KjUGbyB2j5M93c7smFIzN9efdekAtV%2F0lYTSVapGeJgtEjZitJJQ15uApQ1xjkdR%2FY3uNBkYMGc2maqa5TxUp1tpdBrKvJo3lg%2By09BwmOIYlON1X%2BWPtD1B2TL6AxUjpkEBVSeiYIndzQ%2FsQy1T5ust57Sm3yPGzft8T6lGf3RcnRHIFz5umXLTW%2BmdG1TaIuF%2Fu5asfiTXEEyfiTe5j5LrWlS8H6a8tYgCyIsncPf8CoLhspybGgxjfuqtrKXIzREfEl5%2B7WJrIoe6U7JGlMDUrnaqOrXZ%2FffEYw6DqeiwcNGb5tYuixd3w67UJgH61doH%2BBlLPlIoX0gZTHCh3aaxVoHfTq%2BH6pohdRLCmgGbsraSl2kIGUQdhxPtYCoe2sOQ%2BDp7N69RLjQhEMJgw6TiFEuYmVO3gWa%2BHC7ZFxaNEHPppETyvUCBey9iHJHs9aIrLIKYBmOMnBkqSNkwr4A1F56C9WvEbzb%2F050JFGJh%2FnEuMO6E%2FswGOqUBqQrA%2BliksmeSMFBORsRHsUbahwhyP5g0bkswCVeVN7geI6XdF2VtjXm4K1rCiWPe6KHdPhheR9F8z0qOia5QqyT%2Bj7XIIpFUtItDNqckVoZCzehIsuiFVJ%2BeUUE91bze1IGPV8g5ZE6kuYrFRt9GTWdCntWQe0T%2BiRmOSB40xLyNdD%2BbUrF6TjgYocFo6Dq9XSxXdep8KWSHBUn3kCfudn894VLV&X-Amz-Signature=968585492167e54ef04434d7decaac45c20726f748207b2bf62f7dd383b6dfba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MMRBHFM%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDcf%2FFI%2Bia4kiaeItb8fpGv0seagG9uQpEYQFCEVEyMAwIgcWVqPIosouTsrI7OPXIUdGeS7o0TAgl39kbZNQc2%2BMIq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDD0q1pqtUmGK488XkyrcA%2FewzN5QfVMVCYjRCS9MeCv6rXU0%2BPXRvLLzs9YhdBX4RLZMaG%2BP0cY%2FlIY9E0NCvjwwhS3q751tJT%2BVIscUacaqMaHAmHMmOobp4J3Y%2F4X88tLjCSgo2GwH66hRabbEh4U7baCq3Nz6KjUGbyB2j5M93c7smFIzN9efdekAtV%2F0lYTSVapGeJgtEjZitJJQ15uApQ1xjkdR%2FY3uNBkYMGc2maqa5TxUp1tpdBrKvJo3lg%2By09BwmOIYlON1X%2BWPtD1B2TL6AxUjpkEBVSeiYIndzQ%2FsQy1T5ust57Sm3yPGzft8T6lGf3RcnRHIFz5umXLTW%2BmdG1TaIuF%2Fu5asfiTXEEyfiTe5j5LrWlS8H6a8tYgCyIsncPf8CoLhspybGgxjfuqtrKXIzREfEl5%2B7WJrIoe6U7JGlMDUrnaqOrXZ%2FffEYw6DqeiwcNGb5tYuixd3w67UJgH61doH%2BBlLPlIoX0gZTHCh3aaxVoHfTq%2BH6pohdRLCmgGbsraSl2kIGUQdhxPtYCoe2sOQ%2BDp7N69RLjQhEMJgw6TiFEuYmVO3gWa%2BHC7ZFxaNEHPppETyvUCBey9iHJHs9aIrLIKYBmOMnBkqSNkwr4A1F56C9WvEbzb%2F050JFGJh%2FnEuMO6E%2FswGOqUBqQrA%2BliksmeSMFBORsRHsUbahwhyP5g0bkswCVeVN7geI6XdF2VtjXm4K1rCiWPe6KHdPhheR9F8z0qOia5QqyT%2Bj7XIIpFUtItDNqckVoZCzehIsuiFVJ%2BeUUE91bze1IGPV8g5ZE6kuYrFRt9GTWdCntWQe0T%2BiRmOSB40xLyNdD%2BbUrF6TjgYocFo6Dq9XSxXdep8KWSHBUn3kCfudn894VLV&X-Amz-Signature=968585492167e54ef04434d7decaac45c20726f748207b2bf62f7dd383b6dfba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI6CQBH7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIFEJUXpB90jBPl8yY%2BwulFPvJEdifMYFzTNF8J9oIvZYAiEA1VkLZ2EPpPXGAq8okBlSY%2Bwhefi8e4%2F%2Bg8uD2QEVGRIq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDB9sdf4finRCn0vp8SrcA6NBK2Vgko4b7%2FN3q%2F2mu3ZXEC1bmgNiKb86i5iqCNMcj128ygW2nM8YgqpK23naR7t4dt%2Flx4tmYuyVLRsPM%2Fa50TgmnUrpAXvd80ouuUosjNx0DET2Fstrz3aTMk6%2B075zfM29FrHtIedCOGxG7JY546LOxVDw5yWwDbKNDjVGb8foyw15gnZQvQfoomDObXb3%2FlwOVhSDZYIhupmjg%2BNp9V2CEKjEvMB0p9SZoRD%2FxgtP6X4d4CjipHbv%2Fnu6gHPzBOJDg38YXPFfibg8et0REF9gmMC%2F2pdBGhgXn52zzJmQ%2B40XKqzo7GJNx7zQw1vG8BDGbNDTr5zOq%2BYq7hEPeONEWtEy1tcT5gIN1LAwwTQmWhoMYoMrF1ulvYh9HBV815V2HrWukc4pqLPvmE%2BKNICUgeNmae0CN55Ag2xYR4ChBTM%2FxZtVp3T4qLePsGBKeu0FxusmuFkGUlcZwFLmp8CmQqsUFBVt6gWNMc2LWV7x41jg%2BSGeJMhWXNODXMclBJQj%2Bly5mps6U6DZ%2BxTDT3ODskoHTFLj1cwSAD6qp72mRphTtZ%2FB8LhGJzadG6YJ6HLqCxcONGZgtO9DKR%2BGMOdfjYqvrhRHd2%2BfOYk6KB2fM7pa1%2F8SWN7CMPfa%2FcwGOqUB8u5A1WjfNHhSJUvAHfW9OfEKSFy99LM89y6tju765inrspJARy6d%2B3%2BKn4M%2BaMRZkcGRWphrvp2NvTeoUeIG%2FOFNJsyqfaRHz485AbfqrYCeWSq6NYpDEKVDvVBbIRupX%2F6bcHOUX0NsJtNDhVN9bAnBmbCC1P6l75iRCzQuy4lt3iiW4mWDayrEX1508VQRG3ZaB%2BqtYTRKYzUC0xLyKhHLVEJw&X-Amz-Signature=f3dd809945d6a290328a21a923e1e841cfd69008212aa648f0170b44a2f7cba2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4N6CWWE%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCS8C5PyySOcoiTC1cnB5V22t5lGzRrV1nmObWAveQx9wIhAJBV04zGIO8DbcnBokpXV%2BygeThFMwwbqUuWYCRTY9qvKv8DCBgQABoMNjM3NDIzMTgzODA1IgwUJd3j0OFXGzv4KRcq3AO9bQ%2Be9A79lfL1X7fvki3Uj%2BjGhrQiPmB4qV1M%2FOnze884mezWoSI6bs9gSpwlnotp%2Bq9b05KJkl%2FmLYET8ekkUilBJnsy4qaKme7zyqs57UfoQHxeSB8fPVuDkfeB7Q06nCRgvETwMF0au69VOSXQAv4PW0aO90ulh7vvdUAoudJ5Qqk6qySKXUNWYNnzceS69ONFMpNtp2kk79VkkzxkvmTq%2Bbf38uhtULKQybBs1CV%2BiU4h3bUxdLja4KnPBQBVOp5eJdz9i%2FaDf9x6rDQp%2BjpUAAU5%2FVYPPWcXzDzrjPuIN94UDso8PkePjjwsHOsQZY7ijLC10cutcd%2B5cMtBTbUIkSU30ULVcaf9U6KirzM5PgmcISjSgVZu1gNW63t9Pt7B5KBY4DLNU%2BYlWZWb2kt2ydQb%2FGRT%2BLYakVbSqcKHJwys0lryuUR2VP2YqJtWhuFh0CwiEyhLyreWYQZBRf8o5Ti0q5hQ34%2BLoCeo7Fi2pX1c8eaQ3yGJSBeaJiPIrerP5TWjAe3NWtpxr1Gv24QzCRwLO6q7X0QBNX834EmpIQdqXRb3xvTlPXQ0CNJUPuuWvktl%2F75KnoLkTQ9Y2DXwaFiT%2FkyFoK5g2H8%2BqTxoOQBAzLhszOhbDTCYhf7MBjqkAe7Ddh21mm71EGvKWiAlrt%2FRdsSA%2FtWWbhSWX0bHXpufUkmeNnJphpzrFrHlrOH19Njm7wxtaxonKw%2FqU8n3%2BtbIMM%2FDs5Nh5Je54fQtm%2BE8mnDejnDWVDyehkCVkDCdv42eaVfHC6ZuuxjYhESMnD1B3Ce%2BZUApctsSCun5zDSCT3wGNiexQ6Vmn%2FpTKYhDpxcOBGlVW%2FvwdwJmspFFNvPo2g3a&X-Amz-Signature=7896997085acd3bfdc29afead0e32d8744c9d3c15eeafcc9e4567799faef24fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4N6CWWE%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCS8C5PyySOcoiTC1cnB5V22t5lGzRrV1nmObWAveQx9wIhAJBV04zGIO8DbcnBokpXV%2BygeThFMwwbqUuWYCRTY9qvKv8DCBgQABoMNjM3NDIzMTgzODA1IgwUJd3j0OFXGzv4KRcq3AO9bQ%2Be9A79lfL1X7fvki3Uj%2BjGhrQiPmB4qV1M%2FOnze884mezWoSI6bs9gSpwlnotp%2Bq9b05KJkl%2FmLYET8ekkUilBJnsy4qaKme7zyqs57UfoQHxeSB8fPVuDkfeB7Q06nCRgvETwMF0au69VOSXQAv4PW0aO90ulh7vvdUAoudJ5Qqk6qySKXUNWYNnzceS69ONFMpNtp2kk79VkkzxkvmTq%2Bbf38uhtULKQybBs1CV%2BiU4h3bUxdLja4KnPBQBVOp5eJdz9i%2FaDf9x6rDQp%2BjpUAAU5%2FVYPPWcXzDzrjPuIN94UDso8PkePjjwsHOsQZY7ijLC10cutcd%2B5cMtBTbUIkSU30ULVcaf9U6KirzM5PgmcISjSgVZu1gNW63t9Pt7B5KBY4DLNU%2BYlWZWb2kt2ydQb%2FGRT%2BLYakVbSqcKHJwys0lryuUR2VP2YqJtWhuFh0CwiEyhLyreWYQZBRf8o5Ti0q5hQ34%2BLoCeo7Fi2pX1c8eaQ3yGJSBeaJiPIrerP5TWjAe3NWtpxr1Gv24QzCRwLO6q7X0QBNX834EmpIQdqXRb3xvTlPXQ0CNJUPuuWvktl%2F75KnoLkTQ9Y2DXwaFiT%2FkyFoK5g2H8%2BqTxoOQBAzLhszOhbDTCYhf7MBjqkAe7Ddh21mm71EGvKWiAlrt%2FRdsSA%2FtWWbhSWX0bHXpufUkmeNnJphpzrFrHlrOH19Njm7wxtaxonKw%2FqU8n3%2BtbIMM%2FDs5Nh5Je54fQtm%2BE8mnDejnDWVDyehkCVkDCdv42eaVfHC6ZuuxjYhESMnD1B3Ce%2BZUApctsSCun5zDSCT3wGNiexQ6Vmn%2FpTKYhDpxcOBGlVW%2FvwdwJmspFFNvPo2g3a&X-Amz-Signature=88448e490bf6ab175dec3f4896743996964e174e661dc42dc8b816412fcf51fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GKWP46F%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIHZFJZJmJuaWqotsmkCUH5xHodpibrRI4ofiMb1HeUXFAiEAiR%2FBuyPtHzhfitwulLQfaiXuWo3wU1wJ0rYovURHqv8q%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDCmO8esdO%2FVsyu%2Bl%2FCrcA%2BnSw8mkV4dgMm3z4XtxVER5vOeWufkCPdNFnF79r%2BAJKq87lykwnsCYMaTnJugR6s2S%2Bgmy6D9jvoZtRZM1ebHUwMEHnwrAqDYix7uScS%2FeEA3IkSP4gllGU3QYfrbGdoBcQ%2B60PyfEdbH22XyqIkO4fjwH9fLKeDiJdu7lV5gpWkrf6EQXf553TMbKpGOH38KnODtB2jiVuUiDSHao7qZIFHXTQ7%2Feo4iURVQDHWQwYNUjjQ6YeGz%2BcllRFyDz3AVYoLILUsThr1YuUE8u7AP4zB9Pgna0%2FxMgRONWDTi%2BhFSMtqIpJVN%2F3tU1FBk8N05SVMd0q3c8CDHSdpTTr7TZY7CQd%2FfmXofIF3Nx9fwXwEU2ugb24WJJHmheQrQIS5t3wXtMtIosH1r4dLEZ%2FZdorZTOGtNvREZCnpEHwY%2BnKxyaNFAZBK%2FwNawK8OmtrWRMbIOVuVODfl5%2FZeOnljlAOOX6UKFQdWBumxQc%2F7Ks6yfZ5W%2BYNmGVi3I0rOULeA6ahNKJjiUqC7li3t9fS5qUUm5%2Fl00qjuclQMLwCpHPh%2BR5kRFjmc9%2FKwWrDfBhep%2F0rS6OsGm%2FloiODgfF6%2FU87MDlNVuZRYH9GTTXedhDBw0YzFG%2FhM7U2xDVMK%2BF%2FswGOqUB8nn5kRW%2B7fOZ9%2F7TB8F8tHwA8E5xtj%2B5pRe5rycJuGHJTmVpuizQUovqSlz8v%2FZYq2DHkgNdsenbJR36JwvgEm2Zt%2BJiK1zic5fRJjH1SEWfdXc7s2EPu3Np%2FSYIgN1vwHhg78FZOpQHekfGdw1F0LgSKqqBQU6vt2zcHFE79265oocMVuyta9Xe82dm5QLImFKxDl4E%2Bow3stbgGGbkLpbVnx73&X-Amz-Signature=ce1b19a8f9a322154fa39dbe67eea4fc8d5ade292a14f9a6cbb78003584cada7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3JUEBQO%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDDOD6GRsMfIOzw0UQqfgmkT5Opgsy3W7rn%2Bp3yLwK23AIgNhnYE6nYxU1amLsZ1fX35Z9OcqEPdsrezBlah9gW%2F70q%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDEMvbHaWIH2aj1MT4yrcA9r08jhk%2Fq%2F7dnfYj7VFEYvdBf9CNHVJpuSMUDrsRww%2F5Af1qbxOY7LtPmEXJwdtxjjj%2FB%2Bd7I%2BItvOYwwYufnV%2BK84jsGscHeSd8fMVWqLQLFSysbKztUegqolCHXKmbGVR6HnxwE0KUVLYpZB66JTRqEeva7zI1KjlUXpzC0ZIq%2FcMa5rFWRMcPZj1IcrkcxYJXLVthqlTeEn%2FqkLZY92Hup3QuiOsPKc6OqeLmPrq%2FeL2GAuvAm92NuS4PmsDzzhFxn%2FYiMqGFHQi1kCVMxavrxWDccmRZVumm3pDYF585wm%2BDuyLgHSzrtrVlk%2FrZPHg0rLoa0s3BtJ1NHtsYnSEoG9FnMaq%2BDw%2FZ2nLALeb458dV%2FeWzk8O231%2FBYpNapSCaSkhZlJJYV5HFM%2FIUXAMgytoypro8qeAGs%2FmB%2FYbWoVi24GMZfS4GYgnZujBdA%2BF6m%2BrRoKJsnC9eivkHH0kYiXqhgaIZjbfUUOE2D74zQtkYGC8MsOLKP4FjBdlGd8pJ7fYXSc1VmbUGqGqx2X3oT%2BBdkPx0gT3v5bL21H23Bw2EJBqmCFCEIUGrjKMTV4iZZSR7FU83Legjs9igZWSDRloYzIznJoqacY12c1JAZpFrS1x9BjNDxKpMO%2BE%2FswGOqUBzOrV2R4SSXpyTLC8hYp6IO0R4iH52vLNoA0YSScPV%2Fz2FZddMeGGwfOdEAoDIbv6p1q5PMvaAsr3gXL0EpBDbju0FHM4IegLTdciPI38bMU1nVbWNy69tiGNiJqpX65KZJ87k%2Bb5E6VqC9tudkLPQBBlKr0JzfDxp6uVPtTvJxzDBLOqEy%2FYo0VsibQ926y8S7lBAXfjh5EjP%2BKKjd9n9HAFUspf&X-Amz-Signature=8b3190994956e9c239565f68350e410740ab818a890b47b0a5a0765e8567a3f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SP3HV7JD%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDfjjSBb1z5pWZyScgVYDDLXdN6q4tWuvDqh8cKYUoO7AIgZDLlV602uwlrp5x7ho%2FHVwbtr3gqHjj4IowjfrVaIJEq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDDIM2aWrvmSON7jKbSrcA3TkL4zBYXNs3nJFwaE4MtO9rRoycVlI1O6M%2F5aWiRoVVgLdOLxdUPYzMsD02UrlM3zDYI7yily%2FRcYgnsbkZTyRZusIksFCYVMU3oT1OUR7t2JlKiwrvQttqMcLssJ0swgDPJ1ynC5wxMXjxcpzXW3ZfaGGYpi5A%2BPwG9OAdWmVjhQIeJdZbegR850%2BMOZMBdpwOTcd5poAbqxy7kOb%2BLZ%2FHADK7CSCDAR66UfudAdUexYoAvKl5bCNFAd0OMHUrJ1phKLLH5x0qUx0SuA7QZqvyZCj%2FXoUKG6KlaBUg8hZ9ZLnkeblaKwTWawdlu94X8ejtEyMp%2BKyuAoZ5sZ22IsOBTV8hKf2qpZh8OfamCU6awqbvra9R0eQ0aPzYVWW6hmzIFSZ2YMXkvc6tkRAcsPfOaDcuERWTSZs6nd5lWMTbeAlMWNomPWypjbgfPiNWL86zHmbBZ20VBPzJXvXqw7qRmNiEP%2BENKrxE6ndW87ouNKlcS6ZFqZ6KgWCCxuOEoEsRmVe6E5uUZDb1Xkv9YCpPAnYGc6xDi%2BXhBICRkGgedCAW61wavxuKFXhfIE95Hcd8muDtIe0f2kGHX%2F4Edf7VMVqDhJKOIna7OCVQKsnrqN6JlhB6kI6LiFIMNHb%2FcwGOqUBiJFRqSum7bbQ9%2BHAaBRO97gmlM08cbmCgx85ksR2GJDEeDdVUuSHsN1Cz59CurVksCBoHDxOrOsZr4zzG9pwWlrmNqnNOWaoFXb%2BlbYGF8YsAaIvNjqADf1sj7tTB9k5o4SfdD0hjRdhHNVSp28p3pKkzcga9%2BmThrhv4Ok56xGn7E0UDl1R%2B5vcK0azlh%2Bbwo%2BNzSf9Ed0W141WBWFWU5UANx4K&X-Amz-Signature=190d992ddf6123e4f2ce7ec1e0af7c7d75d419d7fd6ec6092e66a6d393b072c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWJ466HX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIAD7Qeal9D0yMkTIos3LjvHvwHjiEQpO0oRoRXXXow8aAiARjXFiSRrxIO%2F8U5LUjDTkWDIqbrgHrsmRC%2B690IfK6Cr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMecB9KHt15qvyOlzJKtwDbGu1I17yMV%2FvuLa90YIeNCtsPIKlLgnh4ri2V23VOoaOyapZkmIYyxuyYsv4LPEAwdf2EJAHZpu5rpIRtcfN4mnYXNLS4qLyc9IMpQkaKnMff3E98A8g9Wodcp6myp3b33RPwDJyTGCVzK%2FZEmTqdROH53SvuHyY5OCb6UEbj4bhBGXy%2B1kEB%2BDRNKIqXshMj7VG2CtkHTIIFI%2BHL5u19y3%2BX5Khv4yxCylwAxU%2BZypHfyXKJ3lyulPxooaH40pFi76FtQsWovAd%2BsrgFAlF5Gnf5v7ywqN5otNSGuAn6QrcAp8uFGjPoVdeWC%2FAccBnOJen9cRE1gzvpVHgzHoafTIS2fKBllv1D8DDAbXnW1n84XbN5cH7YCfMKysUC44AiA4TxaegkCBfOX9lMqDFZfkeD1N%2FWzjjdEXw3W0OQA%2FyKlWG7kNwNG7ewhRqaKEO2ZA1MHjcVd%2B6pYUC7nV9G1YqjSPgXsDYpwsJCb0hf%2FZSIGVe%2F%2FIluXjrqF%2FKPRxmtrshGH%2B9kg6Et0KJa57p4XsVe2w70uhuqG0ztdDxbgrFUsJq0umrnQjegvncAVPmSy5lrrTDdiIJI%2BRctpq%2B%2F1PP9C%2FPmGadxq2nyQ0a58GxAHTER9ivIOOQaA8wr9v9zAY6pgEjOX%2FkAwtFrVgj68aCDxQz0dFiWUWSwm0qUqJD6h4gZisITLY9VrXHGYBiTBsdHM0SYpTIFhORWpQypLb6hqyD2fRNNLL9cHs2kELctBuLXmS7DBcimc7AsbuXXZwX42eTGlLNQv9f5zPGEclHLseaFPd%2F%2F6yxJXrsiBT544nnEkb0h1rLVPnwlm6CfV6weHufBHcfJ0AHIKlfhu%2F3Q56rl%2BjmywdD&X-Amz-Signature=bc1eb9b3ec1f10a72d10a2bccf1b5ce8e05faca40c8ba8fdd5a76c7bf90c04fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWJ466HX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIAD7Qeal9D0yMkTIos3LjvHvwHjiEQpO0oRoRXXXow8aAiARjXFiSRrxIO%2F8U5LUjDTkWDIqbrgHrsmRC%2B690IfK6Cr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMecB9KHt15qvyOlzJKtwDbGu1I17yMV%2FvuLa90YIeNCtsPIKlLgnh4ri2V23VOoaOyapZkmIYyxuyYsv4LPEAwdf2EJAHZpu5rpIRtcfN4mnYXNLS4qLyc9IMpQkaKnMff3E98A8g9Wodcp6myp3b33RPwDJyTGCVzK%2FZEmTqdROH53SvuHyY5OCb6UEbj4bhBGXy%2B1kEB%2BDRNKIqXshMj7VG2CtkHTIIFI%2BHL5u19y3%2BX5Khv4yxCylwAxU%2BZypHfyXKJ3lyulPxooaH40pFi76FtQsWovAd%2BsrgFAlF5Gnf5v7ywqN5otNSGuAn6QrcAp8uFGjPoVdeWC%2FAccBnOJen9cRE1gzvpVHgzHoafTIS2fKBllv1D8DDAbXnW1n84XbN5cH7YCfMKysUC44AiA4TxaegkCBfOX9lMqDFZfkeD1N%2FWzjjdEXw3W0OQA%2FyKlWG7kNwNG7ewhRqaKEO2ZA1MHjcVd%2B6pYUC7nV9G1YqjSPgXsDYpwsJCb0hf%2FZSIGVe%2F%2FIluXjrqF%2FKPRxmtrshGH%2B9kg6Et0KJa57p4XsVe2w70uhuqG0ztdDxbgrFUsJq0umrnQjegvncAVPmSy5lrrTDdiIJI%2BRctpq%2B%2F1PP9C%2FPmGadxq2nyQ0a58GxAHTER9ivIOOQaA8wr9v9zAY6pgEjOX%2FkAwtFrVgj68aCDxQz0dFiWUWSwm0qUqJD6h4gZisITLY9VrXHGYBiTBsdHM0SYpTIFhORWpQypLb6hqyD2fRNNLL9cHs2kELctBuLXmS7DBcimc7AsbuXXZwX42eTGlLNQv9f5zPGEclHLseaFPd%2F%2F6yxJXrsiBT544nnEkb0h1rLVPnwlm6CfV6weHufBHcfJ0AHIKlfhu%2F3Q56rl%2BjmywdD&X-Amz-Signature=171fcf34f2bef62258538ca6140ee5a47d88a35c25d74d0d279660b7e8197af2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKALT2C3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIFfUeeE%2FEs%2FFqRM4Zr9jop4neDb69TxVqOOXclLXlrXpAiEA6EGnsJ%2FXPoZT9mRn0HV2SSFFhpBWnvUHKdJaVWiOUPAq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDOLbtdc%2F5lVYcVd4rircA%2FgNdh4qNxpMrkrLDsdCeLtv9iK5xXZ0Ew2cSJEtKLY6%2Fu9q1Ah8PpPRb4%2Bhw71fXiqbOPkBSwKaorC6EwIt3VqWcDPnXdGtcrARA6jLzC8tl%2BAaErwlDYydsOE0FF79%2Boe4cj2cfyJGWVJZ0JORHKD9pJuc6h%2FSAufx5C7W6GWJklmgXPmVTkCWT6ymn%2BvCO1WkKniXZH%2F1Ar8knB%2Bh3L%2FW23%2BPysVtA5vtLxtyE7QX3p91J7YXlJGRjSpU7W1Ev8kUziNh7HBwH1IRX%2FH99RvNcd9G%2FEyqbFfKSYYsechQZzrlY9HA7iHXa0CRS2RfOMTvQOtKsT3vTPElNrH17ZlfGoD8BHmxaBNHnZRS7MOtZ3L%2BHHUCeDSC%2BPuWQvlxD0tioUdFzMoZVb%2FvHVA0KxG4QMK0yrU0bKmDXeuNYLBoJ9j9Z3li5Hi2hUceH2b1AJmZ8ayzylYPpaJOxEPRaV61iOA8votzEkV%2F0qUTm6exZZQXZrr1Tji8Kw6adP5JBTaeb5qXOeR%2FW0VxgBsAezNeQa7EKLPOcJbzjc%2BV%2BKbFGKHTHoNaKyNfR8uc5GB74DpRmeFp%2FoPQNeJk%2F1vUgQ8PYE06rGAt%2B%2Bghqg6v8570b9peawZJ4Wmq1WmTMPGE%2FswGOqUBbktykN6k3K01Scst58YFhxQWcAiaL1hfg2mkHbFUGYUrD5aYIP0%2FNx2POE4%2BUAiNkqvuYqkFxvRjIxvlPBZoVQVp%2B%2Bl8bYKDUhqgC%2FTMzByIP7KUCwiNdf2r9udZ4%2B3qJMruViKTXmz3DZvXr7NB%2Fuvg1Gz3mUud1S3DwxKno1HxrtF1jBRRmtqZmIm0ReZVB%2BhcVTaKHPznyNazwdzFG946C4JN&X-Amz-Signature=4e492efd11a15063e371d26c7c66c6374949c1c007b5f993257b7391d9f98899&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URVDVATY%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQCb4NWMFKD7V54y9Qh0CyigIABXD65D41F%2BzxchowaGkQIhAMRXDrfCoM9GeoiYvnSJOiSQwV%2Bm0bRLzGGlukaPvD75Kv8DCBcQABoMNjM3NDIzMTgzODA1IgzUiuTwVKceDDxVAaIq3AOb%2FOXH2qSVpxVc6%2F%2FcOOoXxpAluEiiy1NUiFZ%2BwwEYnAVBWCtWJR7kXOsNPFKLdvh9ZYNCIf7lrns3SOv9WZ31Dq%2BS4mgdIROWAX7LqZ5x67AQvyt8T3sddFT2ItJkFjOR3huYWe%2F18ppP5yd05DGzbwmA2Zl7EG6nhO5E1WEaAlk3Tgh3ApTrNLOri7X5xsKFzHY8NF2bcloUCLz5V7OiRv6jWM8xinSKS0aYfcN7UYU3Grof9hH%2BiKaN2t5%2B1Ncv8nBpxuC3hVPOG1YiT3ubFClYgDD3iLOSM8RQcCmXWH%2BbN4mDkw7QRbihBaX0G3%2Fguu9RzspdckPhWfgW%2FKNZwaCh%2FI47TFHiYAXdIIydkIU1Y0wZQKKvN5C3XhW9QQPiRH74%2FYtY8cmDd9BuW4Tp%2FRZ%2B5uETum9k1FrzZqgE5VYEh4VBZ1OQmAQZGNbIlvQ9anOmT1ubk7z%2FxYQfIhZzWAF85XANg9Rr6pkghaPLgsaNBVvJR%2FIlkqwOOzOjT6fF%2FlpH6GsjPG0e%2BkH1FSjMu6x5GfAMQGaaCfQsdc1bhLCqormHOYD8qtW1ja8ZjBECb%2FwDR1Pct17%2FmdyIqne64Hbx2eNT9Xrf9%2FwgRNBcOQ1MGP2JHhGTZ2%2FT%2BjDF2%2F3MBjqkAW75uME5QMqDQxwzOxpUKztrVzA26Q8c%2B32%2F440GJKwOt9YnkRl9%2BlyqfW1yIyfP0415ksJS8Qb5nrNGf8yMYT%2F%2Fm88EdDnOPDOKOL2XK%2Fnil5WFSDGYXREwSwtaTTweMOlleyk4mEKkwc6hY8oTp%2FU9LjtRb%2B7hYK3P8K6mjKYJuYoMTmClaNXrg%2FYQqFsVyY19sodHI2UZUIZRj%2BorSmGx7JMl&X-Amz-Signature=cc1f76b40e8ca38e25fa6317b563ab2d6a6f949a499d495f17abededb63c1823&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URVDVATY%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQCb4NWMFKD7V54y9Qh0CyigIABXD65D41F%2BzxchowaGkQIhAMRXDrfCoM9GeoiYvnSJOiSQwV%2Bm0bRLzGGlukaPvD75Kv8DCBcQABoMNjM3NDIzMTgzODA1IgzUiuTwVKceDDxVAaIq3AOb%2FOXH2qSVpxVc6%2F%2FcOOoXxpAluEiiy1NUiFZ%2BwwEYnAVBWCtWJR7kXOsNPFKLdvh9ZYNCIf7lrns3SOv9WZ31Dq%2BS4mgdIROWAX7LqZ5x67AQvyt8T3sddFT2ItJkFjOR3huYWe%2F18ppP5yd05DGzbwmA2Zl7EG6nhO5E1WEaAlk3Tgh3ApTrNLOri7X5xsKFzHY8NF2bcloUCLz5V7OiRv6jWM8xinSKS0aYfcN7UYU3Grof9hH%2BiKaN2t5%2B1Ncv8nBpxuC3hVPOG1YiT3ubFClYgDD3iLOSM8RQcCmXWH%2BbN4mDkw7QRbihBaX0G3%2Fguu9RzspdckPhWfgW%2FKNZwaCh%2FI47TFHiYAXdIIydkIU1Y0wZQKKvN5C3XhW9QQPiRH74%2FYtY8cmDd9BuW4Tp%2FRZ%2B5uETum9k1FrzZqgE5VYEh4VBZ1OQmAQZGNbIlvQ9anOmT1ubk7z%2FxYQfIhZzWAF85XANg9Rr6pkghaPLgsaNBVvJR%2FIlkqwOOzOjT6fF%2FlpH6GsjPG0e%2BkH1FSjMu6x5GfAMQGaaCfQsdc1bhLCqormHOYD8qtW1ja8ZjBECb%2FwDR1Pct17%2FmdyIqne64Hbx2eNT9Xrf9%2FwgRNBcOQ1MGP2JHhGTZ2%2FT%2BjDF2%2F3MBjqkAW75uME5QMqDQxwzOxpUKztrVzA26Q8c%2B32%2F440GJKwOt9YnkRl9%2BlyqfW1yIyfP0415ksJS8Qb5nrNGf8yMYT%2F%2Fm88EdDnOPDOKOL2XK%2Fnil5WFSDGYXREwSwtaTTweMOlleyk4mEKkwc6hY8oTp%2FU9LjtRb%2B7hYK3P8K6mjKYJuYoMTmClaNXrg%2FYQqFsVyY19sodHI2UZUIZRj%2BorSmGx7JMl&X-Amz-Signature=cc1f76b40e8ca38e25fa6317b563ab2d6a6f949a499d495f17abededb63c1823&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPDQ7VF5%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T231801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDxpQK6Zf1eKoO9XSgqyJ%2FesWIsGTrCNdZ4HGei9wUt2AIgcZRCgFRRcd%2BZV9XVN7Wxe6O3e%2B5e5h9b6SaI1gSFrKEq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDGStrJgQkLgszCgMzSrcA4cusoc7AYLX3P9fZUmPCaH%2FMt4qcbVhQZU8iFXv%2FZ6U1m5SPDGWWPtGZEwJJueIcraFuGpuFgGU%2FHEyhAJmoqXNwjtzRq%2FYhdmJ6VSMhP2G63DGD4cC9Bg4Ws%2BsUgmwImv5cyWzC%2BBcqYpbhxus4HSQsiYajewe7o42Gc00WD%2FxGCfJbpBDCgZFW2N9zHQGA3jpoHMawSg7WCLmdvn3CZo1OxsfQR4r2IrMGMReqJtX26jZ%2By0RgEDumul4vX2zauJ9hvTW5lZi%2FtQErS%2FVLMm6OrYmwFzgLp6Gi%2FZudEzrps2eShgce2CN49amAmqgLcGXLXQD5r8B31Xlz%2BO%2F83FefWcx1PiCRUGbgJmvrP5k%2Fd3ltnPetU4Tw9xlmA2bO8hiFfjLbTv8Ea6ObV%2Bdp21wGV4oZyql%2BFq8vxOVrqOK7lAr7NO7%2B%2BB4SjVouGtZlIPu3Oed4x%2FoymMPV58lTa3eodrJUUje%2FYlVj9ZY%2BLc9Y3Qbn4gXJwlCPmZYm8kSdmp5kDJA6hZRM6GaXjLZH%2B4UuUL%2B8iixSTuQsE75KTYS4yKF12WywFt%2BSKbiuwuQq49LtgGtikaTgfLyVJ9LVq4fJOosSCu0M6FIg010dzcN03bnR%2BdK98WQCECVMMiF%2FswGOqUB4I32%2BZGfxDbJgeVMIeoS9KXGPQCngjtsqANrS2nbjb2JB7Trj6D7P3BedPWKuU1Ye8y5Lhj2mphhMAAcRK0H7sSWcs4%2F2bzL9L9urk6YBxUL7obfFKNJkUX4%2BTUOo8QlKGxer8RwYGyMkfUpSKQknxf7xqWm2gtB9qY3zFWyMxd5ZviwEXWbgcrY58eY%2FIOvt4KLGgYbvnmfTRHIngscTD1UaFbF&X-Amz-Signature=f1a5a01ac8b7a950241e1001ffeefbf17e8dfc35558333b231c7d2e1e1fa4ca2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

