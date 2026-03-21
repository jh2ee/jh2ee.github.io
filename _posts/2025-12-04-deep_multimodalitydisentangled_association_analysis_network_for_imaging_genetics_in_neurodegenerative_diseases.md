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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNJDW2P6%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHeVpZNXug3HLI3tzqoC6GpS3gJ9kUo9yl6tdUiZSwvYAiBU0%2F04LRVGPPfFKFyqAo0vJyf9U7p78iihZ%2Bm2TSmqKir%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMda1d42Yl0qOlut7GKtwDuFsyVFhPRgFRmmvMmbyP9%2BLbtLni7gCrxT9ecfd8%2BgsrpdKqRO%2FuYP4Ngt587ys2%2FW23XM2BzUoSP2Vvm6T%2Ft7CRdcpW7LEbN2B4NdKjjlFuQFat6NpbLcswyuSHnt2C%2BjQWBJFEj%2FZu0XoaYDIRmr8sJeJMWjYNju4hhSIfj6yvhBjENEbQn66%2BGgZr22F3ApYLE4fvSzNGiCZyu47hALLJwNR%2BDY9AUFmf4WIwQDZGa4frU9MpvW00S6Xy9aSXFZVWWZCez9MBik40%2BKZN4Iaosqyx8ohqO0Ro%2FRoKEqjDxwkBkjISfQ7jtfV07XktC0c9Hfo535mBAZmq1HJ4dCNarcbtjmQh9%2FbKEQZ9iL4rLUr6S5FFB2CW5badKBh14pxlSToBKNCxVPXRvjsHXnTpqWujjm%2Fq53GrxvWWV1t7giFQNdXO9Xy7y9tdJgwJEGJQ5TM2EliRPtbwJ%2FZ5GQGgDXeidEMjeAr581hjyEZ1POHdr1qI5BfyrVE6LaAkcLijtcfW2u3ZWGh4w3Cab1P%2BfhHGc8twTS%2BsKlIKupFI8ZOKq6thuliM1SUyU7Ak%2FvLJrCe3%2Bnga1BeYOw8i2SrlHHQl1QnXMap%2FDBhAVTxu6lpHbrB5i0f4ZwEwvqL7zQY6pgHPYovQdG2QxhGkULzSTseYryMx3pU01yN2f6vg0VUtkKLZgK0dW06wCzHq%2BYWT4zo5Da3USLkfS9F%2FGO5RPxJ0yXaQuOMYXqQ%2Feh7NgLJr93GyN1MEF%2BNycOds%2F8ox38trvSRP83Ri0XsGDRThUAyrU5jQFnxi8aRFI2wcgsI9TDs8cza3xwWQ9or4oiLOeQPNZ1uBrDFmb559qJxwNUufzeAG6JLW&X-Amz-Signature=052055ed4ae758250b1d970cbfba70ffe72c8b22f64990296b3c1dafc2a9a31b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNJDW2P6%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHeVpZNXug3HLI3tzqoC6GpS3gJ9kUo9yl6tdUiZSwvYAiBU0%2F04LRVGPPfFKFyqAo0vJyf9U7p78iihZ%2Bm2TSmqKir%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMda1d42Yl0qOlut7GKtwDuFsyVFhPRgFRmmvMmbyP9%2BLbtLni7gCrxT9ecfd8%2BgsrpdKqRO%2FuYP4Ngt587ys2%2FW23XM2BzUoSP2Vvm6T%2Ft7CRdcpW7LEbN2B4NdKjjlFuQFat6NpbLcswyuSHnt2C%2BjQWBJFEj%2FZu0XoaYDIRmr8sJeJMWjYNju4hhSIfj6yvhBjENEbQn66%2BGgZr22F3ApYLE4fvSzNGiCZyu47hALLJwNR%2BDY9AUFmf4WIwQDZGa4frU9MpvW00S6Xy9aSXFZVWWZCez9MBik40%2BKZN4Iaosqyx8ohqO0Ro%2FRoKEqjDxwkBkjISfQ7jtfV07XktC0c9Hfo535mBAZmq1HJ4dCNarcbtjmQh9%2FbKEQZ9iL4rLUr6S5FFB2CW5badKBh14pxlSToBKNCxVPXRvjsHXnTpqWujjm%2Fq53GrxvWWV1t7giFQNdXO9Xy7y9tdJgwJEGJQ5TM2EliRPtbwJ%2FZ5GQGgDXeidEMjeAr581hjyEZ1POHdr1qI5BfyrVE6LaAkcLijtcfW2u3ZWGh4w3Cab1P%2BfhHGc8twTS%2BsKlIKupFI8ZOKq6thuliM1SUyU7Ak%2FvLJrCe3%2Bnga1BeYOw8i2SrlHHQl1QnXMap%2FDBhAVTxu6lpHbrB5i0f4ZwEwvqL7zQY6pgHPYovQdG2QxhGkULzSTseYryMx3pU01yN2f6vg0VUtkKLZgK0dW06wCzHq%2BYWT4zo5Da3USLkfS9F%2FGO5RPxJ0yXaQuOMYXqQ%2Feh7NgLJr93GyN1MEF%2BNycOds%2F8ox38trvSRP83Ri0XsGDRThUAyrU5jQFnxi8aRFI2wcgsI9TDs8cza3xwWQ9or4oiLOeQPNZ1uBrDFmb559qJxwNUufzeAG6JLW&X-Amz-Signature=052055ed4ae758250b1d970cbfba70ffe72c8b22f64990296b3c1dafc2a9a31b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV7Z3U2T%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGe%2FK7ITRuEIJF%2F2Un1wS93mG5a2MmWY1eDAfK7FLsNPAiBA4Y%2FcOnFzw9i4z%2B1kPfuMaFU6Gi2LlU7HCAcfY8c3%2Bir%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMEeHLGt0vd%2BPYEmaRKtwDgaueLVH8Km%2BiZZBAqgwEAdHB%2BaFhpgyCS7pVKsdgilSdDHJDiLBx7YYM47cFURi1Nqvz7nsRKIs7vTghEMJXU71VdcKXcshoh9dw5KgFId3hfgjoBcobrnAgCA%2F5KXeiBTGpuJwDnz7Fqycez9vepfG8dndVAEu7TIitKAnMBJ3Eia9yrrZuzLjeA93vuGsnUJmfSW09a6IWdL8OUUY11Q3t%2Fm2unERewx8Bz9RSnlXYb0EQxltOanxnEGPzaIILGAKWaErggV4ilU%2BU1tbKntgwv%2BMgQ30T5fYTaXavJuh6LsGYyqQhScNpQ%2B2IBGDtBNe0CkJG0N92mW45zPYNP7OumazcKoGWHs%2B6XsvcNtRNnZFRFANg0KvEQarlKEpmseFi%2FoT8RjsfuQG1nJpzfOuRSo30wsQrQBkJqMeJK1HpOVnH1y28LyWnSIGo7ckWPMpvPVLqO3Je3q2K6UT7B3aFb%2FOnWB4cUoL5bZXVNLcZnyaVIDpPl9vuxTQ%2ByJtsGCaw2DSaiiiwL9bMibPVnYVJaZ1ASzD%2B3uE2SAoeZNReKVAxSGe%2F%2B05dFaKuyQtbxzbW9bEIxeBwZzfi8ktap%2Bc5B%2F3fsltQCzLAbre%2BHpnHWANGWrqRLuXOH3cwj6L7zQY6pgGS7aJb80dKKGR1TR2ClPzBqqKKVtTbY59XqnfUeiVgJZ2GOIZR%2BeoZVas9XCOFVg04W2tnaoMrQuSdpzVlr%2Fxy6dQpnT8LFFNIeB5Jge3vLoqs5zI6xOVJjgfwaXKEuGqepHrXL4wpIDPLy%2BlQoQah%2B6MrHghfeLL5xKeZ5HWVRMnwnvfbWNLosCrk6%2Fipxm%2FFGAxAaEMr4G3JgXBPhniZoyWNsbg%2B&X-Amz-Signature=bf3e9db285e83f4d16793cb13ff4ac155f4021732c710ba430977caed4321678&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WES7QP23%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaK9KLKFlZt%2B7%2FpklFy%2FK%2BMsU9OK3gK7P3kqJ9iaRh6QIhAPidKBRYAjJg1lppSlJ9O%2BdvXlvZHFJGQa%2FXISrvBFoeKv8DCFIQABoMNjM3NDIzMTgzODA1Igyuxi4wGkhyr%2BWsMH0q3AMzgA5yKAWRxG0M9czLziP4L4kpPms2HuvX%2BIWaKWlgEct73CTToY979QFdooJaUW7gKF1x0sUdSMxSJ%2FmiM9PG1Jg7wXL31jJgDTxTklG1KQerGFLTcd%2FRY0QqkbME881q2JaXIlfpyrq5nk%2FFJ2hxQo3zVyaO0gIWmWEahW9QiyAa9KetsCWFBlXZ1hXFBZGa%2Bx0iwm71JpDtWUqsQDd3Qgb7Z6eRfB5Dg3kb3wWrW%2BHqXZI2ZhkX%2BD5iVjCOEiaAl9RvX416hcd%2Fb2kMtJziEAZoYxRtfTiO4hWEJ3o%2BMRBdTILr0tAwbywBGGkrBnYGvY1F45IyNL7SpOOwksW9uo5FiGjJYXXFG4OlD4KSpnADVG8qKj5PNVHgli47m%2BP74DypwV11rHcAfmkV0fwWYH5k1WUNqVmAeUQcQi%2BkOBBuLLU%2F7pnJSgM1NDTEz1HHlyVZ%2BsyWSxqTTpOVmyUQwuj7hyPUPSqMLE%2FhQdkVLNwZqQq0WC7F8X69nW7NWtnXqPpV7Pd2si3WPXj3Q1klcvrr5xFTcuTxTA%2BMQDsI%2BZHuFlC0SazYcELYRNuVY2HGOjmF1HkeePYWaCk2L%2BfQVloeUSNBx%2B8itx96Z44rGNJezndfJBUGmbzrvjD4ofvNBjqkAZFdxXIuYA5%2BVywSPPO%2Fd322TYm7AOIx4r2nvprd%2Bw4F07rXkOmwzgVX8Og%2BPzx2C71CJKwmpijqlhRPX6FB7DIT%2FKtMgaCZyBVldVkpUVFtIZk9B3QKe7IxHxi5S92QL0HG7dff9QjBmSKiVNT46fV5f7ZQcJTIjs7Rk8v2yr831uOgV6SdiRR8iKK%2FJ1%2BbFWO44q42eVTp8pFseamzbdW%2B7FIn&X-Amz-Signature=7e777e1aaed5539d2cf44f225de603c2dd20dbf0dd4a12315bf65bbeec3d70a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WES7QP23%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaK9KLKFlZt%2B7%2FpklFy%2FK%2BMsU9OK3gK7P3kqJ9iaRh6QIhAPidKBRYAjJg1lppSlJ9O%2BdvXlvZHFJGQa%2FXISrvBFoeKv8DCFIQABoMNjM3NDIzMTgzODA1Igyuxi4wGkhyr%2BWsMH0q3AMzgA5yKAWRxG0M9czLziP4L4kpPms2HuvX%2BIWaKWlgEct73CTToY979QFdooJaUW7gKF1x0sUdSMxSJ%2FmiM9PG1Jg7wXL31jJgDTxTklG1KQerGFLTcd%2FRY0QqkbME881q2JaXIlfpyrq5nk%2FFJ2hxQo3zVyaO0gIWmWEahW9QiyAa9KetsCWFBlXZ1hXFBZGa%2Bx0iwm71JpDtWUqsQDd3Qgb7Z6eRfB5Dg3kb3wWrW%2BHqXZI2ZhkX%2BD5iVjCOEiaAl9RvX416hcd%2Fb2kMtJziEAZoYxRtfTiO4hWEJ3o%2BMRBdTILr0tAwbywBGGkrBnYGvY1F45IyNL7SpOOwksW9uo5FiGjJYXXFG4OlD4KSpnADVG8qKj5PNVHgli47m%2BP74DypwV11rHcAfmkV0fwWYH5k1WUNqVmAeUQcQi%2BkOBBuLLU%2F7pnJSgM1NDTEz1HHlyVZ%2BsyWSxqTTpOVmyUQwuj7hyPUPSqMLE%2FhQdkVLNwZqQq0WC7F8X69nW7NWtnXqPpV7Pd2si3WPXj3Q1klcvrr5xFTcuTxTA%2BMQDsI%2BZHuFlC0SazYcELYRNuVY2HGOjmF1HkeePYWaCk2L%2BfQVloeUSNBx%2B8itx96Z44rGNJezndfJBUGmbzrvjD4ofvNBjqkAZFdxXIuYA5%2BVywSPPO%2Fd322TYm7AOIx4r2nvprd%2Bw4F07rXkOmwzgVX8Og%2BPzx2C71CJKwmpijqlhRPX6FB7DIT%2FKtMgaCZyBVldVkpUVFtIZk9B3QKe7IxHxi5S92QL0HG7dff9QjBmSKiVNT46fV5f7ZQcJTIjs7Rk8v2yr831uOgV6SdiRR8iKK%2FJ1%2BbFWO44q42eVTp8pFseamzbdW%2B7FIn&X-Amz-Signature=e164235677f3aab8c2aa3c0f238e266f9ec639f57a785a10dedb716879f6f9ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPEJTIOR%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGNucoVUK8yXf14g184YJwnPGvFLcqepUF6P6koZCPxQAiEAjHzRKZQ8zzmxuDiM1Lwvo6wm4TOnNmfilngZnwe2brEq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDL1bUtNht%2F%2FCf%2FgjCircAw7lYWYMn0qXf1b2%2Fgj4SLt%2Fkz0Ha%2BdWfE36StSZptjoW0maAnPgNWFUEgWrxzjKeas%2BIxtcKzwNu%2BGvfNemGlQP18VLTNfPDDCWFgdITSoWdJYcPpO2Nf1GFtVIFLt4Rtlpj%2FnjXOumXFphhtxh%2BiVKc%2BqpGZyrt3np4EDS4tZlqzIfTrU8D9wwC7VhtIqq8fYzC95ezGpnkzGBnOnwKYWEsxiRYWvyfNui5ce0yOsZ1mJMgZUWo1qU3vlVqdSZbkOcLm3jKVoGqjCGjCam%2F8SAVDHVbMfBAPG42o77jSf6daf5PClOAWhVatfsvdFVSR%2FFBHZkbCXpuIctMTu90loaUQTo3YQ%2BUS7Q2kyd9%2FM1m6NSiG%2FRhF6X8Tn02AthvoeRSX%2FKDg67NNVnpJE%2B39NbjanCkWIcAylzYlEqrOus5ShJRrS%2F2dtRzFoSOxmqRCPyekDYnHjxvPdP85b0DovWuETqwY7EbhCZXI2gh%2FFO6AW5MXDNrAZeSBC3K9BKSF2hfClWyFhEfsw9P%2BxR2UTLrheJXAeMDPd%2Fxv91i%2FEiRnCTNka1OzkWCy4XZ6Cge7UiN4%2Bfhd8wYzLZCIjwsg11PlrBPy6R5Km5%2BIU%2F3vteUfCHhOrmMsWdX%2B2bMIai%2B80GOqUBt3mlTevTBYje5W%2B9RDbSVfQsSeUD0tyKsiq49odcY6TeJISnsYcO0z3WkHxugM3PqDk9WxN9VqOyJWqqEffiZdmmwvKNmOkihTJ0zOGS%2Fc%2BS4olImzF%2BIJHLfMtxbg881vj%2BAJyEtUz4CopfOUbwFZdoGDoRJw6n2XShq97SqGjsPqh%2F3auY3Qoie2IcyJ3VO1cbFy%2BELzmKUkse6ihYabkPV8or&X-Amz-Signature=3124d503be830387e8ca5156071c5cc1ce6cbe1aaa97b1a3433910be69394d55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466466JUUHQ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDXL%2FszWjhKAeghKib20nl6BU97B3VBBdRG0EhwSy5lHQIgIZAGU6c64jRiDZFgDYIN7gDpjcnii36hd%2BWd8p5qdl8q%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDOF0Dv3WWueTdAaHXSrcAxRQgbakxkx4Ix2AGolJgZ919ThMicRgSDRdUguG1eaHujSMx9nrWPOva9mTslgiX10PU7RXe7ksIYKoRRqylJXqwUg0zkTSx%2BKOvcUP%2BAft%2BSm0nLcHEHFOeYnVMHdY1SXCimwkepjKU8ljeAbYXDWc6VDtVefu9hq0rPwyh%2FG4A6MyA0Rp%2FsfrRVQqtIxzmYlP35PmdkA9BmPBooj8l0WjWnnp4nCu9qWxrDuT4F%2FyPBfUtDx1QhH7wtzjFfvYy%2FJaSzWqgNJoP6txtf71ZVt4NXaO29eAKmGAd%2FGb72EPs5zUeM8ReWuXnct9RD0mVMK%2B6dTWAm%2BI8FU4oqTFZOyAVpTKef5TycbBlCSeCDNGDan7%2BsuA0LFjvp5ynEnw7H8gY8KZl%2BK1RNIAlH3YLY9%2F44rCtzbDlGO4HdlPr2%2F5ycNG8ZO%2FIa3JCbjc3ArPVsGRzuWo7iXNeMHlc8IgXUNT2UIqLakQbDtGlxA%2B4oQtTPdGQ2KnbzwqTOV0eFbCrOC%2FpIlDMVLE%2BtgYcyRHlGtaR8LlK7hQ02h2%2B919I8isMWl2Wo9yEUqOxSufZ1N61LjubRQMIts199wqtFmdOWZJh7eQab3jX9k%2BcB2c7hHjBRxbyiL31m54vRpxMJSj%2B80GOqUB5pOZDp2JDSPo3cQP3vR%2Bh6w3WsKDAM46ybzbamxhZC5BOzoO8%2BSgvsuDPSSsGw8BkzeHcdeHedyARNcgX7ElX6v8eepQBmU9LdIil7H%2FnAayPgo8U1nsNd%2FFsVF7jh%2FKv%2BchHG8z0k6DPu8Yc%2BRIYZMYXtQsme5DyHzoZDBoFRDLNX6zHLdUayZqn5hmlbAfrusHS%2FuYSrVb8Rg21ItmNptZRMO0&X-Amz-Signature=24afc5c3d803088f5919fe0c4dd3e92788c60b916384682cb7b450e59d7dd2f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHP6HLP5%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICSEE8XY%2FG9a0Sy7WfG4A02wZcD4VnDvP5G%2FMXHBDhM1AiBrxHfsZ4T98GLjWOi69Ojklda%2BTVuHqJLPhY%2FF6V6yKir%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIM2kw8zPhpgxjpCQxLKtwDW4z4eR3LIwCkqlJsu7LjiizSP8zREBWuKPDc2CmmZohOURPBicbS8COb8OS%2F%2FXTywKv1uj0%2Bc60ezkaUHQvD1XVNwgElJrKUjs%2FXSju4nzv%2FixVTAj2vUUjniAhmBGn%2BT5LsCcMEMC51UQ33ADz1w9CMYig0k1jEXaG%2Bmz%2FJ03aoIY7DwnjCjRYDRRXmtCxSQxvMpJKgZY2Myp%2BFvpHJc%2FMQaDUBFhMnk7ueVPavDZMm6Gkh2x2yQBPEMFdu9AfazR9mMYYLh%2FIfTY2MdT%2F4PZB2r778U9tpsjjIekKa1%2B1vKn7F%2Fc3w4Twxd0HJGkD0r9gZEWCcUbqi0LJByoW%2BQSZsaTY2p6SIUMQDApMxBCgxFda5FRj0wPTJ6w2etjQrHcC%2BK7kArVra6BqfQ%2FLUndiqj6E9mPwi2S02o5%2BfXkOEAR%2BI%2Fh8h76FQl3eSwy3Flyp4jChh4b7Hs8BhlaYmM4JdQw67ugxKJjQTjCi6e9fRNxZv9Q%2BGGj%2F%2BuM9670Em7EDiXHoBSLgWwLTMlkXZzqOK9y7XDwDv0LjFtVQCHndfnWKIe9K%2BgkbB9hZogiyHZAw%2FhtV%2FDrt07urp3KMLml%2FPsjCgmQhnCc%2BfxK4EnUmrEMZyq4OaqwVJkJEwy6L7zQY6pgHgMu1aplnp9aaAUXMS8AD%2FGLikn9OXmDFJilhMuoakwXkQ7yLI05CeTBMtn5tOIRahE%2FZ6grzfCBU5hy%2FA1E513oQ7hHEspqwep9BSBuAvVzHwbY%2B1l%2BaPfOjSS9tCS6%2BLLupKKIzJN3BE%2FPWzpJqRIO5QwI6PhKCmj%2FE2jpINb%2FRyeDY%2FcWNPP%2FwjgI7H%2B%2BmbsNCeqaRz6yTL5F7TZXrsMvkDVLjO&X-Amz-Signature=53a10e14e64978e3f6ffc2505999b0de3d5988fabcd6031f388c02a8299b3a2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QA3B7HZ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRlHUmwcfYgWF%2FXSt84q2FRjiW5T3JfM5UI%2FUcmV9U7wIhAMqSlC80nAXwAn%2FLbDNOp0GX6qh%2Bz9i%2Bv3HuJxumIEn9Kv8DCFIQABoMNjM3NDIzMTgzODA1IgzmXurNnR%2Bp3E9IY0Aq3AOU9rRAZ%2BtNK6557LPxjMqt30uqbImmLI9VpptojQ43%2BQ3CX%2BfIqAOo3LPr2M0rhqt6LTpFu1FlhqXlJfggkNRKQUsYT0YSR%2FiByE5QUDINTbeD57aJyAoNLfDGXWLmUpVSl9ydXbb6cDOcbUGJa3NCaFJ0zpk6lMzlEG8WHrbeukqCS16vp0slY64I5mPR9VggBtM6FCnOP4CIc%2Fnfj7qim%2BF59wg17bEUj2yujk494p9f0KNIva4kBXSoL6XnL8s%2FcTg3pMky7ILt29A0PiZk%2F1Rmp%2BFcguVzONTddyPBBasScW%2Fz1OZ4y4snu%2BjWxY6VpVCE8HGmvbXAabitrWFEdxTr6f49%2BmSiQGTEfE1AfyIhSC5NI3O7%2FlyvyNIXBSr5Jlgl3DAVGF4n2GWAOczjR%2BDoLK6jfkxyUKkevksESsGnMtPo6y1DvGDb7ae5Bgr7G4T3qkVyB2eqLHecf583%2BsOVJImPek%2Fo0dMYjrFu5%2BPDE%2B2671YeroRjWTwU8A2OqkhIj%2FE4ca4CymN4KcMMYeqw1PdktGjTGvINNOW1zpwWJ9583SmRtvcYuRbeHYHorhvg8KXD8SBkRDhqQbEGKGr1I2N9T5NDHhS17snSQ%2F%2FeJEnftwXSmlq1SjDXofvNBjqkAfrUmCZ6FfcJoZsI%2F9m00vQAb%2BM03BquwWWIC1hnOrSf0Fc8SjdSpXw44ivsUE5eBxx2mwgx3lk0TBbXE0b9pbqtwMdHwhPVzRcD9bJ6P9NpS6J5gQE%2FbV7wYN7AkWBbwiBhqSqovw28%2FwiB2KLhjnCnfb7tB6%2Byt8uRWSZZJm6e4N%2B0a5oGItrj2kiSC9fBA1mPJm971KZP9%2BJ26k5WWGko1akX&X-Amz-Signature=ec005939a037099994d88b2fe52ed2cb074017e87870638b394ea3b052078cc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QA3B7HZ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRlHUmwcfYgWF%2FXSt84q2FRjiW5T3JfM5UI%2FUcmV9U7wIhAMqSlC80nAXwAn%2FLbDNOp0GX6qh%2Bz9i%2Bv3HuJxumIEn9Kv8DCFIQABoMNjM3NDIzMTgzODA1IgzmXurNnR%2Bp3E9IY0Aq3AOU9rRAZ%2BtNK6557LPxjMqt30uqbImmLI9VpptojQ43%2BQ3CX%2BfIqAOo3LPr2M0rhqt6LTpFu1FlhqXlJfggkNRKQUsYT0YSR%2FiByE5QUDINTbeD57aJyAoNLfDGXWLmUpVSl9ydXbb6cDOcbUGJa3NCaFJ0zpk6lMzlEG8WHrbeukqCS16vp0slY64I5mPR9VggBtM6FCnOP4CIc%2Fnfj7qim%2BF59wg17bEUj2yujk494p9f0KNIva4kBXSoL6XnL8s%2FcTg3pMky7ILt29A0PiZk%2F1Rmp%2BFcguVzONTddyPBBasScW%2Fz1OZ4y4snu%2BjWxY6VpVCE8HGmvbXAabitrWFEdxTr6f49%2BmSiQGTEfE1AfyIhSC5NI3O7%2FlyvyNIXBSr5Jlgl3DAVGF4n2GWAOczjR%2BDoLK6jfkxyUKkevksESsGnMtPo6y1DvGDb7ae5Bgr7G4T3qkVyB2eqLHecf583%2BsOVJImPek%2Fo0dMYjrFu5%2BPDE%2B2671YeroRjWTwU8A2OqkhIj%2FE4ca4CymN4KcMMYeqw1PdktGjTGvINNOW1zpwWJ9583SmRtvcYuRbeHYHorhvg8KXD8SBkRDhqQbEGKGr1I2N9T5NDHhS17snSQ%2F%2FeJEnftwXSmlq1SjDXofvNBjqkAfrUmCZ6FfcJoZsI%2F9m00vQAb%2BM03BquwWWIC1hnOrSf0Fc8SjdSpXw44ivsUE5eBxx2mwgx3lk0TBbXE0b9pbqtwMdHwhPVzRcD9bJ6P9NpS6J5gQE%2FbV7wYN7AkWBbwiBhqSqovw28%2FwiB2KLhjnCnfb7tB6%2Byt8uRWSZZJm6e4N%2B0a5oGItrj2kiSC9fBA1mPJm971KZP9%2BJ26k5WWGko1akX&X-Amz-Signature=7ae58026ba4d79ca4f950757d6e903905e8327960e4cbf3401f3652d1422bb23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS3BE6NP%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDzQZn2Lf8KI5kBIoUU9NCvMFaosJafdJqsGL8WMn0hnAiEA%2F1Blo816u7lmlDbMZ%2FjpeK0tewYMntrBSGmS%2BXx8QkUq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDF6zzU1%2BxN1Ff0p9MyrcA3ci0UMIbar51ri1T2Y5DsKMZZKR5o4tN0Kkm7qlYDuBNPBIh1VuoDcGxJl6CEDz3L1xhYOPOoo75dDaljwpRhEkv1NxRp%2BBKCP%2BfTMnjsNWt%2B56%2BecQQzeNnds71GUNGi5YDP23gw74bX9rDTRkMUuBOnbyxI1rYEaiNeeRNTEy1rMdzCcwp44e5zK52WbolG%2BdEjhTmcV7gws4Bay0EdlysBI%2FAX9r32uApmO9cYf3cgFtQxgbaF56zJGsYSTWlj%2Fu2hSxZu797RyaRuasGp0tBkJVvurrJxoLhbigr9ZVt3Ne8PyT1q87H5FZE5khtBKvsNBPgEsqCOO1Ln16CZat58zBWJeecDp%2BT3i2Dwo3bOqHyGS%2Bfd3FmtSrznItLOqcsSaL0K09jr7OIZtv5oNz4n4jEe%2FVC%2BHzyRIUFKtM9s2bMHPx3S4AaBWhm1tLBSoL6Bd14xYrISmbZjULouoRpZShZcXtR6ccsl8%2BgLZOx1cypEELuN1jRPH14v7k7MUoUxob5WmYj9HluaSqe1ilGkha%2FNAu%2Bp1n6UIwVLR%2BYHpnXWCwUryXHk4LpavepWK1wksT4Zx0c%2Br0Y5pN0iBbeEAnNTaiJyL4XbidDrpH7qkI0MsbZu04KWhlMNyi%2B80GOqUBrtfdL4CJ3tTtNQLqDsL0MudgNVhx9qLpkslbq%2B9rZ2lCLXTwd%2Bkmj1GdJ3EWTbkC7JzagjV0XTUdCUOgPGfcrsaI9O0YQgC4VVBTpMDOXLHUfasSmAyMLdz68loDbKOKIyEocz9v%2F4RmsI6c7qPSHnVU8aIg6WWHUSjnuWn0h2FZwLG6YlOqlRAI4Ju8iggUVG%2F268UZkJhNeycQzUYPOe3%2B4CfB&X-Amz-Signature=696d2d6c4f1bd4102c252a24e4c3411a0c6b3db4adcc2fe35e8dc6e810182dda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSCIMEFV%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjpcnDMr%2FtR1msQDlcdpSKjlRBp7%2FYRdfwdBGczY513wIgOI6IrqiBHq0OYaambBAXABNs%2FUfoT9RC%2BvJJPZqeHqgq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDBGVfwvF9%2BLozQwbpCrcA8qsSjGN06mFv6k2DoMS9pkXEfV%2FdVRmBxChRxGFglK0joHHx0%2FUEknrcrY%2Bs3iBReACjLz4ZO01LQkaYw3PKAMhkaM4GtovvD0qVndqPTw15CQQdOkwflWwAqVKqMUEPwQ%2FSLU9cK6WZaA%2BGXm7KBjJHb2B64pq1nw9GuzAu7zJEBWipAPdOr7f51uSX%2FjjmxVi6UdlMOfFnGIbyvGKc2l6K4JW0Lc3Df4u7M%2Fa3Lukjiqj6bhkRbblHuARbOws%2FnlPoIMBDIuLFkunHxjGNJpSnfmaVMbhSogYDAQl2onpF3Ubs8V8JT7QCyNscFuNhA%2BZgVcZo0K4PivmInmIE45mqOQre7izazm53B5JJxwOJX4DJjANvVjwuJsoHpait9N%2FHEqXBBE2YAdmnX7KroWHzKqvKVfmUzWGEjUEWvolhqlvz0exrt%2BJ2T%2FqblaJ75imQ3ltYX1chAW22klWDtyaOId3h5j75sMYJMepMz6DFzUXgx5jVtInZttPizizL%2FTmsVBNCQ%2B7JwL9xr7BePsY3HPQhgUC6R1sSbmeRdZ%2Fb16UXxLbPd4S20P2TRQkqvwvadYQOvqSpDA4XWF8eznax2hV1F84f1eTE4lWZeEE%2BEPpHxBsbniM8hhUMN%2Bh%2B80GOqUBiV4fTT1%2BRuGH8%2BCRPZ68qfXKOXXmj%2BTt4mboISaMy9Ey%2FbYFThZX8BSYFZPT1LyyFyiQNInkIvXECmkW7eKE%2BjXa1R2Gt4VIA8eLQohhU833zso7L6R9EpmgDzhjmeM4iLYOVTah2f33z01Q470DPBVUdDsMSI8oS5L4MtWr8G05OebTUSU0q%2BBcrL6Bk9Dzdlg7SvirQ%2BRgaNqhOsGsgZMNN0Yd&X-Amz-Signature=c9b88ff1c79b1649f46a1a9348d5a03e2a13cfd84dadeb1adef6d3beafe892a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSCIMEFV%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjpcnDMr%2FtR1msQDlcdpSKjlRBp7%2FYRdfwdBGczY513wIgOI6IrqiBHq0OYaambBAXABNs%2FUfoT9RC%2BvJJPZqeHqgq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDBGVfwvF9%2BLozQwbpCrcA8qsSjGN06mFv6k2DoMS9pkXEfV%2FdVRmBxChRxGFglK0joHHx0%2FUEknrcrY%2Bs3iBReACjLz4ZO01LQkaYw3PKAMhkaM4GtovvD0qVndqPTw15CQQdOkwflWwAqVKqMUEPwQ%2FSLU9cK6WZaA%2BGXm7KBjJHb2B64pq1nw9GuzAu7zJEBWipAPdOr7f51uSX%2FjjmxVi6UdlMOfFnGIbyvGKc2l6K4JW0Lc3Df4u7M%2Fa3Lukjiqj6bhkRbblHuARbOws%2FnlPoIMBDIuLFkunHxjGNJpSnfmaVMbhSogYDAQl2onpF3Ubs8V8JT7QCyNscFuNhA%2BZgVcZo0K4PivmInmIE45mqOQre7izazm53B5JJxwOJX4DJjANvVjwuJsoHpait9N%2FHEqXBBE2YAdmnX7KroWHzKqvKVfmUzWGEjUEWvolhqlvz0exrt%2BJ2T%2FqblaJ75imQ3ltYX1chAW22klWDtyaOId3h5j75sMYJMepMz6DFzUXgx5jVtInZttPizizL%2FTmsVBNCQ%2B7JwL9xr7BePsY3HPQhgUC6R1sSbmeRdZ%2Fb16UXxLbPd4S20P2TRQkqvwvadYQOvqSpDA4XWF8eznax2hV1F84f1eTE4lWZeEE%2BEPpHxBsbniM8hhUMN%2Bh%2B80GOqUBiV4fTT1%2BRuGH8%2BCRPZ68qfXKOXXmj%2BTt4mboISaMy9Ey%2FbYFThZX8BSYFZPT1LyyFyiQNInkIvXECmkW7eKE%2BjXa1R2Gt4VIA8eLQohhU833zso7L6R9EpmgDzhjmeM4iLYOVTah2f33z01Q470DPBVUdDsMSI8oS5L4MtWr8G05OebTUSU0q%2BBcrL6Bk9Dzdlg7SvirQ%2BRgaNqhOsGsgZMNN0Yd&X-Amz-Signature=c9b88ff1c79b1649f46a1a9348d5a03e2a13cfd84dadeb1adef6d3beafe892a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBU23XFI%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T181750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICz7VbHq9YkVJBQVcmt73IKffDPe3JlkVb58ykODmHYRAiAf62RY22%2FZt2QnQjjTbh3G%2B7j2zCjgubI3HqOzMH%2FVBCr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMweFx8wGXH7hxC2C5KtwD2n2w5iRMBrB8FJdmGLw82zdqPcUBZMgWguN1BXaj4BNuFmuPts1%2B4gQAW1ndRlq028lVezo2br5%2BnP6UTyjvvAS8nYdpwOlIjs0XZIfsE9jy98Wx4Fw11mUA%2F1NRrKwWIdnftcQJIy5pwJ2TNyUdkxQRJWQt8KD9MelXXTtzkE4uhz2rkOsYk8t13q2%2BusB8NvceePl9NYDeTilDvO06p9itgjf0xRogGCLpmgOK%2B%2FDc4mqC7NfqnXHn0lHI%2FHQjx4FsPT7Ly36rdEA8wiBKrdPy%2BL5RDafwJ%2BnhoO4KL78xa6HrqFPY9RYImsYWoALt9SR2PwPRqpWHUzoDwkVgIpdJT1HoOZ8LKJAD6wYOIo9Dac7uJ%2BKM%2BcaQX1tIn3j64vlWmPlzl59kQ4Z2oPTeNyQ5W7boSBzBq6Wl09JyquuAEqQAiN3kKcgw%2BYUzZZhILHD2j2T23guFrCErFkauW9H8XI9Q3jPXH1QCPWgQKh5%2FFSUWh8f%2Fh3tnHlQdaBmK%2BqYTmf9CxDZ7gTpIYFSa%2FAFl2GC2fmWfI6OFVg2evFbM5lKFk74q9U%2BWZwcD0lbVyGYilBvnhldmlb9Fsof5w%2BBxNckshMW7j6HFEPNdAoK8I4Ms8OpOsdAEI2Yw5aL7zQY6pgF866Je5wWONyqA7JXS3syKeETSMG1JJC0F7WZp7Q15U5C0OVT40qrrN5IDL3d%2B%2FBZntL2atA9OpKoaJNAPQNplnGkhZFjhiGCCp00zPX5EwRnpuv6nipmUEKDw0PAh6vnlkJ2R86aOBlhAG0raYeUlE8F24KrSYt%2B0ACErASv9rRlTYpYClkQ9bn0%2FJwjJ805Ud2j7%2FoIxMfSMXTO5bN56Kte5BvkF&X-Amz-Signature=5f2bde3f501913871c53d031cb945865241817cf471661d1e0223db1c55b6b72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

