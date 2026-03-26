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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MDBSB3Y%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDl0bnluzUzcjbmKXECbNv3LvAIovHh07eHycLILml9%2FgIhAMQyXQpo4a7Xy6AfTZjWgUKb7x1Ue0Ah6nficCyfh%2BWUKogECMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgznqzXN81LZe65B1uoq3AMZ44OxOhYJ7H%2FcZm%2FUcALxHW6Lbprr2r0jJItt0MphOxFtimHLFYBCcFz63ZLmWqJNrDYNuKJCcuryO3z7AC2EgCGK5d7VJQcWU0ERlsP8kvShrduLUcAEQMWupKFIJTkhrgusQZwxkMg4s3CLWbB7%2BEFupxUFiaET3GxK5k8AxCd9XY3NnA%2BXsIRz6C8aHHb3XICvpSIMNHGEszUzwgIRg6HoocQG%2F4aRae40xT0d2ggVYsuGg0Ek%2FFirv82wdu%2FB%2By%2FKKoG%2F4wYAJrEJ3d2e8elDxmm9AhmXgBn4o6bZY6D8y%2BhTAT07V%2BVWAcI8aoG3eXQAat5YbdJ231xaaqPI%2Bd9zmdq3irf8qKSzCUsojY3CbZ%2FUQ7SNWVv%2BfbySoz0PPXWlZGkx7QOVrFvb3%2BntUCTs99DdUBdCGBtlO%2B2BvpPX9Lz8cBO4Ua51ZC3xnhNmkzPVAabDrtMw5mgLAmrEKvWxMEzNkBLBTGUTIU7fSpSe1yG3IHomWLRH0lqc2i6tZptjnYNx3LQrGrEOU9zXDOhpfUDCwAwSiQRZhyQkypYkvGf2PUHu4cB1XCt8e3Vj9yaG%2BRV8Sd5eT%2F3Tgl2eZD9q0vHTwBD2NKkcYWfIYN52rIidYmAoqg1IkTD2spTOBjqkASmLVvXyF6nYiVj%2FOjRFk2Ovh3zyZS%2BfSnXOtzZf%2FS6pQaIPoTaRO1idYGvRbg1BZ4aGIDdwx93noLL8se7ZANVJLqAB7BgAPp4ieI9Tm4VSbbm7M%2F5n65LhzoKW%2FNJz3Gjgbmlrtv9FbrIWW5QeSzQvdT7f3SQD7p6W7CelWtm3AA5ugA2QOu6ezRSpch0D%2F0XT0%2BCANWufn5HqMjZ0MextdA80&X-Amz-Signature=b6f252a1fbaeed80e7797482b07eef0d45f0f585294b34d941dbd7dd55540494&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MDBSB3Y%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDl0bnluzUzcjbmKXECbNv3LvAIovHh07eHycLILml9%2FgIhAMQyXQpo4a7Xy6AfTZjWgUKb7x1Ue0Ah6nficCyfh%2BWUKogECMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgznqzXN81LZe65B1uoq3AMZ44OxOhYJ7H%2FcZm%2FUcALxHW6Lbprr2r0jJItt0MphOxFtimHLFYBCcFz63ZLmWqJNrDYNuKJCcuryO3z7AC2EgCGK5d7VJQcWU0ERlsP8kvShrduLUcAEQMWupKFIJTkhrgusQZwxkMg4s3CLWbB7%2BEFupxUFiaET3GxK5k8AxCd9XY3NnA%2BXsIRz6C8aHHb3XICvpSIMNHGEszUzwgIRg6HoocQG%2F4aRae40xT0d2ggVYsuGg0Ek%2FFirv82wdu%2FB%2By%2FKKoG%2F4wYAJrEJ3d2e8elDxmm9AhmXgBn4o6bZY6D8y%2BhTAT07V%2BVWAcI8aoG3eXQAat5YbdJ231xaaqPI%2Bd9zmdq3irf8qKSzCUsojY3CbZ%2FUQ7SNWVv%2BfbySoz0PPXWlZGkx7QOVrFvb3%2BntUCTs99DdUBdCGBtlO%2B2BvpPX9Lz8cBO4Ua51ZC3xnhNmkzPVAabDrtMw5mgLAmrEKvWxMEzNkBLBTGUTIU7fSpSe1yG3IHomWLRH0lqc2i6tZptjnYNx3LQrGrEOU9zXDOhpfUDCwAwSiQRZhyQkypYkvGf2PUHu4cB1XCt8e3Vj9yaG%2BRV8Sd5eT%2F3Tgl2eZD9q0vHTwBD2NKkcYWfIYN52rIidYmAoqg1IkTD2spTOBjqkASmLVvXyF6nYiVj%2FOjRFk2Ovh3zyZS%2BfSnXOtzZf%2FS6pQaIPoTaRO1idYGvRbg1BZ4aGIDdwx93noLL8se7ZANVJLqAB7BgAPp4ieI9Tm4VSbbm7M%2F5n65LhzoKW%2FNJz3Gjgbmlrtv9FbrIWW5QeSzQvdT7f3SQD7p6W7CelWtm3AA5ugA2QOu6ezRSpch0D%2F0XT0%2BCANWufn5HqMjZ0MextdA80&X-Amz-Signature=b6f252a1fbaeed80e7797482b07eef0d45f0f585294b34d941dbd7dd55540494&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SOSCE6Y%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC29FEzZN4dmU7dWMIC1Vt6O1987EZa1cNaoMHb817OOwIgEr0r1kWonQxSEUfnKyLnPmhWSfCLXNGaD3yizCZ%2BnzgqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOFYV4I4CSUa6i1npyrcA4VqA%2FGXErNNGdVXDqCPflmENXerZ8hwnfkUUaSh2tU0SCqqMEj2PoVYQn7Zt8gWRpprmN6nT%2BwqcxGTbX4rs%2Btt1GXJvey6lzT8YUunmVgxKO1C%2F3yo4n%2BSXZA16CaEvH0sTBhZrEzv0hKUxg2oHvkvNU5%2FwOCIo9y4wflMEx1QKXTjUzzPWi7Boyjcp2U2ebawLY8qyW%2FENsswFUsjqv%2B8OO1g191afeZIgMxvPiqB1rhn6I%2BL6ls4ujfnduFeGn6QcxZh%2FpB%2BLP%2FGNTMapE4wA89tvjOFXbIvMWDqs89e0nxb9IIaTtHzsPdh3sS4jjgfvYtmdSb5ostlCELWKcVx1L7tXfn7EcmfCPzVHXlmxwzQTcJ4UoW1Da7gwi9dTNm3BlU%2BtauU5xaQWDC8FCGoUjTDtRWkviY6R91RxblbhiGfA39MVDzhBTAvHqfGbzcIgem56RNJoK4K3OOlQdYXRNHpL5iBE6F6b%2B%2F97wHxe%2BkXrWj9EWtPyXX7q0WvKOh%2ByM1Ewz0oej4%2B2dlsmJ%2Bbj7a0tbIrhzfQ50m0M6F7v0mIEeWQrDVdwF8mfDdT2aiG230D7IU6plcZ%2BsE6zKXWgPgC3l20wTbWb1Uukzo3%2BolfQS22vtcJJTaJMLmylM4GOqUBeDQBQhr5TJ6uvAzDajRH4hXVCxBoyvFYkj3oF1QYCSvvhUd14JGLCzSFkueH1fzpEnYDRGruF23jFrpvrKsYHZspZkBl%2BcVvk2dri5tUF7xiei2lTzpB9DGUbqUfn95%2BppK7ma7v6WjCGqokzBmiNAvFgLXoW2ry6S7Y4%2FE9mursLq16tNvrYOCPvzG95Aufr6dYh2kmDjCD4S2K5RNo9icWUOl5&X-Amz-Signature=7d6387c2f51d6b69ffda8edd5be5c04ea32cecdf310b201518f1da59ad614934&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQ4ETEXR%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113840Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUTEB3z%2FyzJexX0G4evrxdAckz926Exerp8sEIglo%2FUAIhAKP6hB9%2B%2FyR61ZTmT5D3kUFraPJBM3Zu3uCsd4KR8Mb7KogECMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx5l09ljXThcbCNY9Yq3AM4VVZOhUY4QEVBVFVNIZCeKmT0iu3PSgmOrQost3i6GZlEtq6un3YnYfPPDm9n58j23%2B5RRGDG%2Bx%2FnGyzdgBzk8xqSH4z0oCAvw%2FQv%2BcWTKHxaZAnAa7LmmIMxNKuCOpHYbRYS0ix2Alms5EjJNZjjxD5p6B83eyZENzBSiEOMnqUj2W49kTvyBsV%2BH1%2FK8g9ZoNbnAG2C%2BE%2Bv0O6WwyttLjib2G4119sCU1s4c1cbSfj%2FnG3aox%2BaNpXct7WURJ%2BCLIx4AiGTAQfWfR%2B0XzAdBjamz08F8AUnVqeKcLo9EZd0N0PPod%2B23DAnlW78E9%2FtrIK1VRob2IL0IEkMLTaO3Fq6GUeR2QXdYSuq%2FyfnKBunve700BWoGjprHj6bN%2BPPgLAMzPwAKQMke48H9Sx05UlJCj7xolYlKrq53CT%2BzY0Ab%2FjnWaX4P%2BN2AMMX%2B%2F104IrDCAZxMkNAOWVpWTnUYlW9Ado0OnJraZrV2h%2BLnp10hhli1GonAYpFdEw4Kz0g89Zu22gcUy765OBcTlfsbfBn9Q%2BfozExYuYd%2FYW3S0isxtTm%2Fn5iMmLKv3ORq9aWtO8muQ74en7efsxITKmWi2mIKjNZOS1EUUtkE%2BHZllW4u5riEkicLRH18jDTspTOBjqkAb9LZdniFWlsLJmvJEZ7vDFoiE63XEIjnUvBC20gn%2FeptxMpkg8Rg97q6yjdTy23nWV343t2RwLYusENY%2Fp2Kc3jlMSKzZO%2FQt3HULdhjmCTxEqLvFhQKfjBcfOaPBmGVMgBza7mPx9txrt4lyI93Fmm84Q%2BI%2BpEHnixR4NcGVKRYU2YvTUuxPok2%2B50v9K5OW6xkDgmKA%2FePjN%2Bl7LwNkWMI017&X-Amz-Signature=4cce08e732dbdfbd8f3fafa99288f62e14ea0a171ad263da0a8eca3466a84d4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQ4ETEXR%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113840Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUTEB3z%2FyzJexX0G4evrxdAckz926Exerp8sEIglo%2FUAIhAKP6hB9%2B%2FyR61ZTmT5D3kUFraPJBM3Zu3uCsd4KR8Mb7KogECMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx5l09ljXThcbCNY9Yq3AM4VVZOhUY4QEVBVFVNIZCeKmT0iu3PSgmOrQost3i6GZlEtq6un3YnYfPPDm9n58j23%2B5RRGDG%2Bx%2FnGyzdgBzk8xqSH4z0oCAvw%2FQv%2BcWTKHxaZAnAa7LmmIMxNKuCOpHYbRYS0ix2Alms5EjJNZjjxD5p6B83eyZENzBSiEOMnqUj2W49kTvyBsV%2BH1%2FK8g9ZoNbnAG2C%2BE%2Bv0O6WwyttLjib2G4119sCU1s4c1cbSfj%2FnG3aox%2BaNpXct7WURJ%2BCLIx4AiGTAQfWfR%2B0XzAdBjamz08F8AUnVqeKcLo9EZd0N0PPod%2B23DAnlW78E9%2FtrIK1VRob2IL0IEkMLTaO3Fq6GUeR2QXdYSuq%2FyfnKBunve700BWoGjprHj6bN%2BPPgLAMzPwAKQMke48H9Sx05UlJCj7xolYlKrq53CT%2BzY0Ab%2FjnWaX4P%2BN2AMMX%2B%2F104IrDCAZxMkNAOWVpWTnUYlW9Ado0OnJraZrV2h%2BLnp10hhli1GonAYpFdEw4Kz0g89Zu22gcUy765OBcTlfsbfBn9Q%2BfozExYuYd%2FYW3S0isxtTm%2Fn5iMmLKv3ORq9aWtO8muQ74en7efsxITKmWi2mIKjNZOS1EUUtkE%2BHZllW4u5riEkicLRH18jDTspTOBjqkAb9LZdniFWlsLJmvJEZ7vDFoiE63XEIjnUvBC20gn%2FeptxMpkg8Rg97q6yjdTy23nWV343t2RwLYusENY%2Fp2Kc3jlMSKzZO%2FQt3HULdhjmCTxEqLvFhQKfjBcfOaPBmGVMgBza7mPx9txrt4lyI93Fmm84Q%2BI%2BpEHnixR4NcGVKRYU2YvTUuxPok2%2B50v9K5OW6xkDgmKA%2FePjN%2Bl7LwNkWMI017&X-Amz-Signature=1abe97bb01b178004ab5bc9c0a429d0955d29b6b2bba01ce2e74b19145bf08fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEQ5OXFV%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID4obFuXL7IFZZs2Td0nxn3o7BSxqXstCcKYHZCSf%2F0%2BAiAPdl5AiEF0ldDu29l%2Bmt9FhbMFWcPcX96lFwKYu9sbPSqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgYLBbPTXxrEo%2F3DJKtwD9qeTZnNNSGysqGoSNec80fS%2FLr6n%2BXGSIgHWN%2FfsjEox7TZ8khvJXco0DOkMC4nobY4voVNtEsOGBZqEvlnQW4RSstX9CDAjatvtOesgdo9lb%2F48UOkAhiY7u8eQfPtFDECWhWPDM%2BOwtzc2kbTdNUC5yJA2auz2%2FFP9PJefy6ic8MA%2FWHUU8GULkws77CXWWFdh7HjKIpKOtWFzNaGScusabgwjpZa4srVBYCsfYTdcXOaXH8pBv7pG8wbJoGZBmSYLxFh7FVk19PiL4i6uEJF%2FGuiM2nGyijBGrey8%2BQbFZk3mKSR7w1zJgSFaRAHIAaR51seHkJmOQGPzFeGztVpOJiXUsmLunDk%2BC7ye7VkmGXdHiVS2jAm6Vo8cB%2BUaJvXgdibwLgKB%2BumHDE4h6431rXO396R6URPLd2fhjIElqJAFZJdEFix6aA%2FN7hwQNDZpn2X3hRTkG6aSkuddyjifq9uTryb2sEAZPyrzb29DplKyBUnkJlqnb8TadmrTtYcrke1kLdlgUtfasm0Nz5llvT1MmBWCS2I48iQEdNtRQ0zvA%2FnAIG49oA%2BkiM5HFGxUII8nSd67bSasBe1j4W%2B%2BIbS4Ip26Um6EJgWzuifx8cPaL9yY8G5r2Jswn7SUzgY6pgFVbbQli5h28PtpgE4qmCDBB7br9rG95YaSrdLROTIPCMD3TDmVsJJ%2Bxg2a7MougP21kWnDiHKUnAUwSAcqJk5cylFX%2BCBHiw5K1VmXt6kCHMqoiIBS6jQ6SuNAmRP5eHzafp66rNeiLEPhqSgImaEbCSbhVDQyL41dEetf81sRlHK3Hs1VcXupiGonaS57yKcOpfw3b5t5lWGekx5O9Lm92BgfcVTI&X-Amz-Signature=f9f84b7ea435e2d24814079048c0698f0cd0ae669a1e98c9cf0acf1db9105ed1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AU6FE22%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9Rb7IgtBeTOLjGqVQ%2FMx6SlI2tcfZ1YBuVYKL7nT5XgIgPXsy9HkZ4Aq8t3syIFczCmEIQNJJIX1LjXnmIUV3SaUqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIQy1Q0fjnO6QIbLmSrcA4PXM2nnCz1ZfmL7diiP1pdcugyZ%2BvmF49I8kpZaVt3NkAGJrUlEIo6qVwaAF7w4AxVCOCZq9d1Hcj9RvuGM6%2BLNdrxAye%2Blu%2BFmrr8U0EYy00lL28FFX7x375HGvuoBNz8Kvjd2crhxItMzcm2KU8BokH0wRpYRoXkqXfhvLnH4BghXqt6Ev7e4Bjce3wj0gO9Pu5eQn87e6h%2BApuR2Tx3%2FNpXAH%2FXrKTZvFtje0A50s8BvBnbiK9EXvOSSQXYVqP9qVj%2FdwxqHo8f8dOufQ7CpCEos98Pb3qgg1ZxIX3V5nOnXanIplriiILF7Tws%2FLsI83%2Fi26oxGNypG3SnUX4VAdrfQ2WsUW9LBmF16T9yud%2B8%2FErygwcwImlEucjXfpt1PxGosEpsL0llrh6LnZ4VxaIIDBtHF4uVumcWrbFZEaGqkplxE1rMbdq3tXIDm7tATN6P4rfiTDHlEWYOKFNofp%2BvddhV00pLjlwG2H%2F68BoasEYeZBvr%2FBx3hdtrvkA%2BttwoQEMOc8ARjqjLxa1egaPxTfZqjbyL7Ar11lmGVT5ZlKtbyg33pAEOIGbpTGujqzy8jxbwmkHj7BbHervUMFhZ2ZhGn7MIlJk9er2gfQq5Jc5r9QrjrRyZcMPGylM4GOqUBSbSbA6ACoxhNG4lGb29eDoHiK%2FGbcqut2BCsZbbFQpiqzBJLswRSWiYNzXq09hBhGwgt%2F%2BqDCBy750sOEszYktikng8c5ny1pXwKPHUDUA5tFCuQSz4zWB6Y%2BsZu8LEtEQQXQzY2eDUCDipfCodFc7TGTKG2343WlmZK7mmUSbxL0YcjC3KMtz6EFQ76brYXZ2iIO4NrELsxITDOXZtv4UyODPZp&X-Amz-Signature=3284ade77ed77e80d746006d3d0272dcba395169c67a91120aacbf93f627853f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTCSIGD2%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDCUGHfMxdDf%2BVffJYwp15Q18xSjBHu86qj61f7pkfjcgIgIxD4tKFfRZseMj0Kble601sql2hyXjWEvqvobJbEVxQqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKTz87bFUxIlmKtWJCrcAx9ODh%2F0q27rPuSB8toeQ8mJlcI16cBrNu1t1bbZ3bzxs3kwSEpE6%2Fo8dJyueSmYbOp3nNsuT73mKZNUZef8NvhOjWI0kA7AahBs8vquKiXTXXcocabEKu%2BSWA2I9vck8snILgaTARtNkWpAICeatqyGV9G5x2pRFLkEIgzXR7HiOBs91GZ7RuH2buUKMlLsiua%2Bot8exp1ckyJEHPL%2B3TUPTQsJbYb6%2FlSQY3klsonVuBOFAHcYRcUAps6OOxV3dwv%2B6deB0tnY4YOmkBh3qbF6hjWPgBsB6DcOU4pFpT85%2BOK2iUhv%2BtdHJhnCe7w8KLMoBwFO94DuwxmIKryd20fOv7KtiI%2FCOZRgWOgX8u7by8tFm25cWodPq8JnTDaVhLEktYSr20n6sraSXXdWKMKIDA3%2FwvS1t7FTTSx6eFXUiB95qS7FoDeT8zlRJB0BEiHZJ5CWU6BYWqCEx1BxXgv%2FGuhOpiWFO%2FIxGwdIai%2BfWEhrJ%2FteMmITFVGLp2haIq%2FL5c%2FtVxsEq10EcAyOEg%2By%2FO%2B9tNVNf9gkKLclhLK928xqzkwjyo3pSV9rQjIavQqWXPz%2BsUp%2FmjjYE%2BMZPcyew44MmK4zFthbXpvYIIWvWzbKwujjsmVZE2XeMMK0lM4GOqUBgHjHLxTd5QYTE4PPDvxP%2BWzTdh35O1WQc%2F0HSLzfDO42yNH8LpUkqQkTRUgDtoVhtJKPnBDLSvmSpZkWhsSSvDHseapczhuatmov1IHgapJ%2B7MbG%2Bx8xysEnD8nRngq%2FHp%2FVHjzuqKP2YFMTBLY33%2F%2BTcTG6XQhwIic1Lgdh59fmPXQ%2F7CwAwigRk06eP0HDDqutmGn6R8bxs5kBRmMTQ5Aj%2FTLj&X-Amz-Signature=0f30ab66b648d3fa69fa16c172b5000d4bdfc258868ed2a27e226e744cce04f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRD3DO5Z%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICYqE2YU%2BDcZwBHo%2BCTeW%2BxHOtC6TXuMNDkvMb5HT4azAiEAieY6SIDr%2FHsrmojMTYBah9gQBCXkeZiWwd2j0AiLFjoqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKGITukxOuoqqXQlFSrcA6ZTWCmlLFi3trJBukaY2XLqEFQTileAkoahVBLuVw8SbCao%2BDPXWNzQIP1xWMvs88oPrWjJ57Fr4EitWrZEoyupAzsXJXZZVLOEHraOde42smjGIf7OGDd2YpVJdtlomHxLsMj4tF8AW4EztNNjpvJfIkCjOP%2B80pH7l51qGOlRpBDfe5Ihy3TmN1CgakexLYSXFfpU8FugYv99CxQMT3nkcsY7hJfXkKUVZo%2FVdzoJVti6oO73jm6xrHPkBiFyQxS6%2BiLprGW2Sf5B2NHb0ZohRbjLyQ%2FKAKIG7fJ1v%2FfO0IxyP0PBXYrFJ6Ft2aHJaC4PsLeT3Mzhs5xDVBAg85Y3JIMpQlrnDL3zKItyU4x6Cv2VM89iBY3hZut%2BGTSaXscGYW1cZizScgSJCvArFe0qLZZOcHNshNc4lpyD1srFGCbtqx5zPoLpp9YBmsdDPgHSoRfspVFHdvUS5FS9GP4gwuqv4f6pHyfIxdayk9ekb1k%2FWyyXPlOEAzExJAXg4OYdHekfjqRXxo5%2FbsbUOPI2W6hpYwtQ4%2F34%2FikL74cYkshOn6xDWjF9j0nMn0DVckDbdiA3RZpmoKYmPrBF52hdZi22r4bVnLxO1wvVKmY5k0rEPTXdrKXpCz2EMKWzlM4GOqUBum2fh6iTapG1i6Hw1YBGsGU3J739il1L11lCzfJiqwTA9ML%2BD0DbZa5XuxmcTRE8bl9EKjeecwQd88CdEJW8zQ%2BDzQXr%2Fhtes6H41zgCEkdmFLqGunxqqO6wapDeTqc1Q0YCcnRZ8HzAXwofoWXiXr1OpTFtrbgM8A7UhB4PU60utWqegRRBzAjyL7qvZkAuPXQ4OSWJtpf4nvP17zZuSa8x1CZ4&X-Amz-Signature=575ff01de01f460e63d339719351f5b9d1c08637eb53898fe635020699ba9b1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRD3DO5Z%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICYqE2YU%2BDcZwBHo%2BCTeW%2BxHOtC6TXuMNDkvMb5HT4azAiEAieY6SIDr%2FHsrmojMTYBah9gQBCXkeZiWwd2j0AiLFjoqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKGITukxOuoqqXQlFSrcA6ZTWCmlLFi3trJBukaY2XLqEFQTileAkoahVBLuVw8SbCao%2BDPXWNzQIP1xWMvs88oPrWjJ57Fr4EitWrZEoyupAzsXJXZZVLOEHraOde42smjGIf7OGDd2YpVJdtlomHxLsMj4tF8AW4EztNNjpvJfIkCjOP%2B80pH7l51qGOlRpBDfe5Ihy3TmN1CgakexLYSXFfpU8FugYv99CxQMT3nkcsY7hJfXkKUVZo%2FVdzoJVti6oO73jm6xrHPkBiFyQxS6%2BiLprGW2Sf5B2NHb0ZohRbjLyQ%2FKAKIG7fJ1v%2FfO0IxyP0PBXYrFJ6Ft2aHJaC4PsLeT3Mzhs5xDVBAg85Y3JIMpQlrnDL3zKItyU4x6Cv2VM89iBY3hZut%2BGTSaXscGYW1cZizScgSJCvArFe0qLZZOcHNshNc4lpyD1srFGCbtqx5zPoLpp9YBmsdDPgHSoRfspVFHdvUS5FS9GP4gwuqv4f6pHyfIxdayk9ekb1k%2FWyyXPlOEAzExJAXg4OYdHekfjqRXxo5%2FbsbUOPI2W6hpYwtQ4%2F34%2FikL74cYkshOn6xDWjF9j0nMn0DVckDbdiA3RZpmoKYmPrBF52hdZi22r4bVnLxO1wvVKmY5k0rEPTXdrKXpCz2EMKWzlM4GOqUBum2fh6iTapG1i6Hw1YBGsGU3J739il1L11lCzfJiqwTA9ML%2BD0DbZa5XuxmcTRE8bl9EKjeecwQd88CdEJW8zQ%2BDzQXr%2Fhtes6H41zgCEkdmFLqGunxqqO6wapDeTqc1Q0YCcnRZ8HzAXwofoWXiXr1OpTFtrbgM8A7UhB4PU60utWqegRRBzAjyL7qvZkAuPXQ4OSWJtpf4nvP17zZuSa8x1CZ4&X-Amz-Signature=8a15328e8ff7a26bb32c39d53b9e16d4b392950d03d8eac32bad0a3201e2083e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMDZHPX3%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGMts1IbTwPTPUxCO3%2FuoRMVCfrHwTULrjf6Rr1GgAtQAiEAlW4ezIpL%2BDYK6EzzyS3s6pNn4C5fgdFN%2B4FdxebQxBwqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI3Q2YSfbUttZ71pvSrcA%2Bj7iFF9VfzB%2Bf2VfwphTeV0d40tW02qf4s%2FEy4K7wu%2BCkDto8LU7k%2B6OS2Pk6%2BjURx5vvyxhTZOOu%2BNlcwx23CfkNLI9S%2BS%2BEkQy2lr%2BXVRBKikK3KVB7%2FhTr6ycSju4vNaT%2BCydVatp4Ha6s9GoRg2FmSdnivZoCl7LXWjawmcogQpN0wFPJU3FaJZZPdifj2hjV563%2BsQh2%2FYpJPlkFyKGOe528Nmy0%2BluVIZsXjPPWcguCaiTyZpHJ7Eg9aBN%2B5T7XR3dx66ZLh6%2FVLlm6pNqT8BnQXshPa%2FhUBjhb4kbq4hPb57EbKkClXMZ8FogGO3wiU1NcXRlwlw5%2F6LnJsQz8azs%2BM6zHmqq4uO6XIUpU%2BZLNdyeqyRbHpdgRKK5zZNQcV17sDfC3J9AZRYzffiX7GXYZyshNwTmm1J97yyVM1ViAaJF2mKe%2BGB9nD%2Fbk75PhLLihRjGbTe1PRjJi1aGVEjBYiX9GfX%2BJC58D%2BZ0a4H5b6RwEbpxGMYedn73Z02rZJWifbgvS3lx3tc9XAUa52UtNPJzDtYjDMPXn9qfpnA5DLr0sgdQj8knMniLaI3Xy%2ByJ0a66PDHS7upp7wC1%2FHuli6GSjLwD22GUrvx%2Fm8XNaRr9L1qV1%2F2MN6ylM4GOqUB710WL8fbeC%2FoHkK%2FMhZZyhgbPyfSt9XIeNWoy1ZUEubmyCCofmtI7BSAkbDRTW79rpgN%2B8yXR9gKiliBgIO%2BJ%2FqsicibyIA8Yzt3rEhV%2FVC7Ee3ZSio2g5CE6e3sXO%2BpeeYN53owfo%2FZq43WvQVZSka%2F1J5ZWLK8W%2FQqYPYQ0WKoE6XXLhBEplK3SJpPaPMJ04%2BIK9E288oeShrNqqz36IjAL4e9&X-Amz-Signature=9b638f3b80809b56837dcd1024f8bd77e4b231413d5c8fdde7083f86c04cd006&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZ4IVNZA%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH64EApqKkHHA6pcLYr2edbau2AemhbX0gsgbRo%2FQwFFAiEAu1uqmJUip%2FPUuTVlQiAjPH%2BoWZqRWM4wPNrdxt1wRRcqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCTNY95IDAJ2Sgy8MyrcA3DNp7l5wkL0Uu8n75F3QSE81zfxiI29YeA3f%2BWY13AO%2FYWUM7s2skefqmWtFVoxm2B6pm5Z720w%2FcH%2F56epa8RYGFCBi%2BE6CqZy%2F6jusmT%2FEU%2BMRxSINj%2BH7YGY8ztq8t5LgW7qDp9Eqi%2BCf%2BTUzK%2FpcoMIML0C8A0wUCyMqlre4Pc85Hvq7NLCsohmb9x3l78U6u8FEzFSbl4RUXiiPGiMMECztgRlIe5aEkrO75bCxLfJZUYJ9wF20MynXW0BKpfibu%2Byyw%2F8vV1s25ulm%2F6ZhENan64JtMAg5%2FHjJd1gVuXu2MVKeg5X9tuiTlRqwJ4uudH3OwPU%2Fp0oZ44fzTK3ADV94dz4klFvsXmaCoDIND5ta64hvFsCEUyHusX19l5GO01ocjx8tODQeHtu%2F3m%2B0t7ujz2dW%2BtQhCLjHxp7YKjy58uUfynfGLb39dAkyYQ8ulyDdJSnfOPB7ItPNcIi8tTFXu0Fbkknp6uRWU%2FTReYDNQx%2FQy6Ob%2Bm1NOZH5h%2F%2FvRm%2BE328STyzNEx7ODS7BYEGu%2BvUcmyhASCOMvBydII9JkGX6exLXp7SW7lK21YpYAKwN6mLwWciiiINOobmSbA7L2ETEWFBGIqi2gbwYh5tzfy4C%2FptTW2IMMyylM4GOqUB%2B7Zxdhrbje19NYBFusJq111g9ycyF8ByLPuAIelI8zoS0saemQUnyVen5%2BjmK25E1w%2FjE2okottwmcYNtxrJAaIDNwD841DXtRTWL0mCLmVGIRmvljN7i2f3L1YEykg0vlXs6HLnNGNowVwGirgMctW%2BL4x%2BiCDOSycqhytP%2FoqL3m0G3qQsZOJqjJEPPgzvO7oXctIoA%2FrfraMax5IXROGAc26O&X-Amz-Signature=3d34cbdf8043fc8ae6a4beab9f0ca009839a06b4e1236bd389374028b9f1e2ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZ4IVNZA%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH64EApqKkHHA6pcLYr2edbau2AemhbX0gsgbRo%2FQwFFAiEAu1uqmJUip%2FPUuTVlQiAjPH%2BoWZqRWM4wPNrdxt1wRRcqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCTNY95IDAJ2Sgy8MyrcA3DNp7l5wkL0Uu8n75F3QSE81zfxiI29YeA3f%2BWY13AO%2FYWUM7s2skefqmWtFVoxm2B6pm5Z720w%2FcH%2F56epa8RYGFCBi%2BE6CqZy%2F6jusmT%2FEU%2BMRxSINj%2BH7YGY8ztq8t5LgW7qDp9Eqi%2BCf%2BTUzK%2FpcoMIML0C8A0wUCyMqlre4Pc85Hvq7NLCsohmb9x3l78U6u8FEzFSbl4RUXiiPGiMMECztgRlIe5aEkrO75bCxLfJZUYJ9wF20MynXW0BKpfibu%2Byyw%2F8vV1s25ulm%2F6ZhENan64JtMAg5%2FHjJd1gVuXu2MVKeg5X9tuiTlRqwJ4uudH3OwPU%2Fp0oZ44fzTK3ADV94dz4klFvsXmaCoDIND5ta64hvFsCEUyHusX19l5GO01ocjx8tODQeHtu%2F3m%2B0t7ujz2dW%2BtQhCLjHxp7YKjy58uUfynfGLb39dAkyYQ8ulyDdJSnfOPB7ItPNcIi8tTFXu0Fbkknp6uRWU%2FTReYDNQx%2FQy6Ob%2Bm1NOZH5h%2F%2FvRm%2BE328STyzNEx7ODS7BYEGu%2BvUcmyhASCOMvBydII9JkGX6exLXp7SW7lK21YpYAKwN6mLwWciiiINOobmSbA7L2ETEWFBGIqi2gbwYh5tzfy4C%2FptTW2IMMyylM4GOqUB%2B7Zxdhrbje19NYBFusJq111g9ycyF8ByLPuAIelI8zoS0saemQUnyVen5%2BjmK25E1w%2FjE2okottwmcYNtxrJAaIDNwD841DXtRTWL0mCLmVGIRmvljN7i2f3L1YEykg0vlXs6HLnNGNowVwGirgMctW%2BL4x%2BiCDOSycqhytP%2FoqL3m0G3qQsZOJqjJEPPgzvO7oXctIoA%2FrfraMax5IXROGAc26O&X-Amz-Signature=3d34cbdf8043fc8ae6a4beab9f0ca009839a06b4e1236bd389374028b9f1e2ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJAPLSJ4%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T113848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDoWuVSShnH6NFlSJQTRose25f4KglNz6oq8KXILnRCIQIhAL9rDv7bSySmV6%2BeQJX9qNcyRSvtnW%2FYq4di%2BCOyfMRMKogECMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy1osMU%2F1bHYmKV%2BX8q3AOa%2BU3MeeUzslT%2FCO8fE9hJZjRa9LbAOk6GgyM1SFWjQsJ1X0cmJqR9MGgPoPvpWBEFawqUVyyfK6BASPsif68KwWM6rRHJkk3mXPgjrTlz1Mi4%2FQBalUEFcRpEpKpIqvdmQAA98r1ftqxPa8RdHs7t8SYRQq%2B8mXzFxF6m%2F2WEz3F01PJ44vwW5MsU01ln4dmt%2FvUavuu87rOgw3u4k7pyCX%2BxeBf7vx67u1Tngv%2FeDMS92TemrqNnm35qRqcAGfu00yBPxv9OaoD9kcFcCqgOYdKKOticbQPFVi0XOZzzOtOfpfYV4720%2FSQh7FsGpONZvL%2BmFiMyVaqBjPVEdZruu1snwRKJdfBcnUJJ0uUe%2BdpCANJ3tIT4SbF88FPY570MDJoD6B4Xb4ec8CWghomHVlzdK8GBOKq6Ykbsyxd2fB2LphpaMEGOKtlNmUXM53yTM%2F4OG0uJmfpB9k3mG6qQIIfxJv0f6UcVrjVHszLX%2B4czzGUXSzn7r5vnlTfiDkHx%2FflKdMWTrLvkLXl4IOzJUK%2BUAxKXm%2B88RkOJIOIYTgXvXduEpWM7Ee1gsEhcZW2CAmzFnwGEx42y84kVFwVqSKNfig7aw3MilLBlrlLbYDm4Z1WDibfHGZLAxzCwspTOBjqkAQTXyZRnviUEzlZsVDmndGlHU0iCnjZumZijXJgn4gxYuay9y76weSmtT7hkF2VEe0nXlqBwbBwJ%2Fr13WXpyfz5pGSSVZu8fWr3iTvIyMzTNQGRr1LOqehXpvLLho5xoYFfKDawxBfZNZhFIQJNv4rctGcPlfGemj%2FU7VdqfDhoTcSiijEZDXwCpIppUSC2EBvQ0NOJbTmLc4%2Fu3XfLzuxv8ZcOH&X-Amz-Signature=ad9a6f1498f1288521d562488198d32a4b5aa59512981119016cad101ea43ec0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

