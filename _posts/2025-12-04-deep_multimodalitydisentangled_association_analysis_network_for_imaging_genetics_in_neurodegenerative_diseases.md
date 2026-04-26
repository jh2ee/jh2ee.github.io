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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4ZP73SU%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDUBWRUlrPweJcygzFKaRXhdVYxeELDcRwWkZnWNYF8sQIgexPbCYthUO5V32zkKiJimFMxkQPx7DraXK2lvXLVtaAqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBlz0ilpjddzVBJC4yrcA3lRq9Zuf%2F7QCvm1XqomdvIW5TO6%2BK18W3uWB%2FXqT0nCiqcpyMb3KLzaSKlWVaLEeWzoJjIzq2nYz1hHd483qYNkCi%2Bdy%2FOscrFLFv7BCm%2B6OOvp1xv4WSdGaamRuilKgjqJOe2Hh6XKlwfRGiOw7Xe0WntGmvQic7XXRmqZWpmiCjYqWDZTek9H3PFFy%2FdkzWyNXUUAJ48nOsXc7b0GChMVK8J%2F3IeGlo4NazG6KCg8EigXour1PmD9pdeFxJ%2FUEsGqayM%2FZeXVxpZ8yEmPj43KhGjwWepJx6YPyq4YFbCfefrNMBMYlyeMa109VV2%2BvJn2at4Q8VKGuJVCq1OEwH%2BJEqbUB%2Fj%2FV%2Fqw7MLIKs2KhqEMO3oIPFSnMgXu1%2FZlsrsJTJTCo4dVSiQ0%2BjDhEjAzrJDKauZ3Bb7phh8%2FWVpY3S%2BAT5e3ocuTMfwyAonLD9uPTRXAxgQNMyKL73CmkoSwZfbmIc5TseyOP2%2Bo55ekaRy0nDbvikTX4ZrmD7ZWBqb54F%2FuaCgn5k82rxzWAvmgyskiTmkhqDn2GCJqGZCNhk%2F8xdG8edXtv2rISYU%2Bqw4smiSZYBTbAXOXj1e274%2B54m0BRAv36ZErnzEJBRyyDTXzfr%2FLO8j9VkNMMIOXuc8GOqUB1qsVKKVQ9E8dyRp%2BBpjc4L32haCh%2FazI5DPd%2FvoESaKEfnfaKiBRDi%2FBagSU1bI1XDr7IKiu8jK2XhS8To3CYouEGULerC7%2BNXW7qlkknKsFSUg2kHYPnh2be1jJ19bfN4hvvplhXQGlVYrcpp77h2Xu%2B3NDPyA6Wd2OWex62l7C6nX8z3jYQHYiz%2FsSHCX8MjdWbNsPF%2BeY67%2FHDysuhbWDE6t0&X-Amz-Signature=d2ca129a6894fbf8c845c1976ed3a9cf77ad106072af04a30f3b3c57bdf3426c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4ZP73SU%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDUBWRUlrPweJcygzFKaRXhdVYxeELDcRwWkZnWNYF8sQIgexPbCYthUO5V32zkKiJimFMxkQPx7DraXK2lvXLVtaAqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBlz0ilpjddzVBJC4yrcA3lRq9Zuf%2F7QCvm1XqomdvIW5TO6%2BK18W3uWB%2FXqT0nCiqcpyMb3KLzaSKlWVaLEeWzoJjIzq2nYz1hHd483qYNkCi%2Bdy%2FOscrFLFv7BCm%2B6OOvp1xv4WSdGaamRuilKgjqJOe2Hh6XKlwfRGiOw7Xe0WntGmvQic7XXRmqZWpmiCjYqWDZTek9H3PFFy%2FdkzWyNXUUAJ48nOsXc7b0GChMVK8J%2F3IeGlo4NazG6KCg8EigXour1PmD9pdeFxJ%2FUEsGqayM%2FZeXVxpZ8yEmPj43KhGjwWepJx6YPyq4YFbCfefrNMBMYlyeMa109VV2%2BvJn2at4Q8VKGuJVCq1OEwH%2BJEqbUB%2Fj%2FV%2Fqw7MLIKs2KhqEMO3oIPFSnMgXu1%2FZlsrsJTJTCo4dVSiQ0%2BjDhEjAzrJDKauZ3Bb7phh8%2FWVpY3S%2BAT5e3ocuTMfwyAonLD9uPTRXAxgQNMyKL73CmkoSwZfbmIc5TseyOP2%2Bo55ekaRy0nDbvikTX4ZrmD7ZWBqb54F%2FuaCgn5k82rxzWAvmgyskiTmkhqDn2GCJqGZCNhk%2F8xdG8edXtv2rISYU%2Bqw4smiSZYBTbAXOXj1e274%2B54m0BRAv36ZErnzEJBRyyDTXzfr%2FLO8j9VkNMMIOXuc8GOqUB1qsVKKVQ9E8dyRp%2BBpjc4L32haCh%2FazI5DPd%2FvoESaKEfnfaKiBRDi%2FBagSU1bI1XDr7IKiu8jK2XhS8To3CYouEGULerC7%2BNXW7qlkknKsFSUg2kHYPnh2be1jJ19bfN4hvvplhXQGlVYrcpp77h2Xu%2B3NDPyA6Wd2OWex62l7C6nX8z3jYQHYiz%2FsSHCX8MjdWbNsPF%2BeY67%2FHDysuhbWDE6t0&X-Amz-Signature=d2ca129a6894fbf8c845c1976ed3a9cf77ad106072af04a30f3b3c57bdf3426c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LXZRR2F%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFUtqZMccECPMX0afuzudXcs%2BFeDsglGG6ywpn9aMlM3AiEA5G3vM2549yekqNu2clGoF25tiiM8i6zSBbzyDk5Q5jIqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCpIT3Lfdst9jj%2BzMSrcA3RkEPRpDFbqNS7PDtZsUZ309euGTSg2eNVYjgnubV5uwsp0sZkZq6q3fbJtFhPpek63PeV5qMEDzQViLWNP1fXXgWr0L6cy4JckCr7JKzRgmpnnLdREHww%2B09Y%2FbJsYofXWmNXfX2kOThbU%2BSw%2FPSPTQ6kiXxSMCLEDUVF7qW9FbzvF6lWdXJVKkGsfb%2FI3pQGbPsYLW4j7ehXmuucoXqK5%2BOlM8Xou1jvibW2yQZ9W3vBPSRUhq6sUjPCTzmmqhWM3%2BmeIePLcqdmMit4xabxzQ5yRLYl8iQw1AtYQzgF0ESdOu1Bq2lXjFukGURAR6H87KyAeEX7TnQ5c5zBDfS0DTX4fM4IaxuMU43e6iB1RbQk6etfdt%2Fyf4UxdTmGd7Sx6rq8rgvPxmiDOGnomh%2Fr0QksRhcBHhF9n22qs8gFBm2apoTVCMqZ6Dx%2B2Kpz06II8FehKmKAuF%2FfwbUtEmsRxUmqe4X8%2BP%2F98pMwHpo2r5PEmVY2qq1loJYNx8MLB07jNOqBSgt1cWP0%2Fpe95YokGJt5SH7Mc%2BRHD%2BY7S1Y7A7S9GexpBncrUPTdSDZn7G2bt2f0BtJ8JankyD8GYT88%2FxoQoOj5NFssL4Zh6EPhDcdiMjo6E3OvnidQfMLyfuc8GOqUBAdbgZfkRJr2ZbaVsD7uwkNVgC9WVbvHy3W7d1kurgxo8RvbjPISgZcwns45K3yPmwHdW%2B%2Fo64FzO715M7hOvWEfLCGfxwar1w2cYRyg1Ksg0hsjFX8pJ70135A%2BEc8RD9MNPOt%2BbUqa22nVbLr%2F0CZM75ueDX4yWhfXKRPQ51AQgp34rCkBwpqh2HAnT3OBd0wz20mL4wpBOLwIbRZyq6vMuXujO&X-Amz-Signature=f441c36095471f3b894e669991920224a7f3c27d2a14cfce1903329568808c9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGGL452N%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDwArnVhyN5pajsFSpjLYZwKAu9z93f%2ByFf6eWG%2FoaZjAiEAkVs%2FE%2BnV5HyUauBYDsCam0d5P%2BodogJNgD5QIIHV5dgqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI7GcXWPeu14tASN5yrcA4dyznVzpMCzMa2dJg3KkCACkI7OhvQKZ8uDEJnn%2FXnYI%2BFrzzQiB3dHadZeYm1C3M59FFGDPqBhhqZ%2FAFz7HdMyRKg2Amt%2BLywA8hxb1XOKKCJCUjqxHMIZcMGrEfAcxoUAFNxx3K1lL%2BEnsGmZ%2Bl66h%2BAiYf9dvl1Df01gpTueIedScveiqLuKJwh9tYiFtG0Oq1IsYsSxeENaWEcOrE56VqOWGOGn%2FPpYOkvKj2SQJozfSPUi%2BSbeqdbRubfFuwJYcWfvEH4spJSAch8jlelI6i%2FL%2FAjv1FLI4K7eLn9HNAAWlX1E5s4uMzfXi7oQH1gv3TwZEz%2BcoW3MJJQyGxPpWfMp2EiGRnaDMMCHcp4ZwA7%2F%2FPQKVJyqbTI2aH%2F%2FVO%2FcaPYwY28xHE3hz03Vo%2F81TGPWcFSO5zFRceXusKosaEDIxODp1lXz9pIl7DoUEJyNxhMnHcU5mblzyrKU9z%2BzuFNEktdrSaPuYa0CZnk7TSa0GFGw7ZLEQOFbVAEPJ3nYGDWfMbEVrrPJsjK1QJZDXgpQ5EyXIni5Mbw%2BR%2B5gtauRYAgrWb7mRwm0OP2XWTjZ6xRGwL%2BKfRFjQw7p4zGbATTRHQRW13nJTWP90iBWgCrrt8ERBX2%2BKFYdMJmhuc8GOqUBXTOn6q6nhpa7RjUvkaXTZNSYi63odF2F%2F9Kx9JFs13GPvYSlbNM6Ga1I7ZgmPPwll0H1oHJnyQbcBKpeK7VHGSj%2FWYlHXu%2FSNyrSUxLBozY3dbgnoJ2KD%2BAlhLN3KSCCylJnGmUC82p2akP%2FRi28u3wYx4hnj%2FKBz3vyMZaw09KdRKXQaRUxnzxMjMQ4uPiJ9Bxi6vE5t6hLYlt0AS8Mn6pl7Ghv&X-Amz-Signature=a8c2c9751760373bf4635b80d3bce088612f40e0d485d36d2699686f559aaa12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGGL452N%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDwArnVhyN5pajsFSpjLYZwKAu9z93f%2ByFf6eWG%2FoaZjAiEAkVs%2FE%2BnV5HyUauBYDsCam0d5P%2BodogJNgD5QIIHV5dgqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI7GcXWPeu14tASN5yrcA4dyznVzpMCzMa2dJg3KkCACkI7OhvQKZ8uDEJnn%2FXnYI%2BFrzzQiB3dHadZeYm1C3M59FFGDPqBhhqZ%2FAFz7HdMyRKg2Amt%2BLywA8hxb1XOKKCJCUjqxHMIZcMGrEfAcxoUAFNxx3K1lL%2BEnsGmZ%2Bl66h%2BAiYf9dvl1Df01gpTueIedScveiqLuKJwh9tYiFtG0Oq1IsYsSxeENaWEcOrE56VqOWGOGn%2FPpYOkvKj2SQJozfSPUi%2BSbeqdbRubfFuwJYcWfvEH4spJSAch8jlelI6i%2FL%2FAjv1FLI4K7eLn9HNAAWlX1E5s4uMzfXi7oQH1gv3TwZEz%2BcoW3MJJQyGxPpWfMp2EiGRnaDMMCHcp4ZwA7%2F%2FPQKVJyqbTI2aH%2F%2FVO%2FcaPYwY28xHE3hz03Vo%2F81TGPWcFSO5zFRceXusKosaEDIxODp1lXz9pIl7DoUEJyNxhMnHcU5mblzyrKU9z%2BzuFNEktdrSaPuYa0CZnk7TSa0GFGw7ZLEQOFbVAEPJ3nYGDWfMbEVrrPJsjK1QJZDXgpQ5EyXIni5Mbw%2BR%2B5gtauRYAgrWb7mRwm0OP2XWTjZ6xRGwL%2BKfRFjQw7p4zGbATTRHQRW13nJTWP90iBWgCrrt8ERBX2%2BKFYdMJmhuc8GOqUBXTOn6q6nhpa7RjUvkaXTZNSYi63odF2F%2F9Kx9JFs13GPvYSlbNM6Ga1I7ZgmPPwll0H1oHJnyQbcBKpeK7VHGSj%2FWYlHXu%2FSNyrSUxLBozY3dbgnoJ2KD%2BAlhLN3KSCCylJnGmUC82p2akP%2FRi28u3wYx4hnj%2FKBz3vyMZaw09KdRKXQaRUxnzxMjMQ4uPiJ9Bxi6vE5t6hLYlt0AS8Mn6pl7Ghv&X-Amz-Signature=48d5be8c7f4e716efd40a21a26962e25cf7ce5aabf6dbfa1ca29d48ba50f0cac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIN3PDND%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHGEI2Pa%2FKZ10lCc%2F%2BuKjQBMJ5Fpa7RabBqJJTieP5bIAiAvwAPypJY27a%2F3n%2Fl6opZo4Yw6pzwwJokOrAvXjJbwZSqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmGEhxX1S3ofQFcj1KtwDs7%2B0E2mH1luRfLFlf9Zoz4THkPJRhp2SyG57DidESrHG2DmdYdal4%2Frn%2FpM2FN%2BWl7ZVNOCuPMFrcgKMRi9NPTS0J4b9dCU3l1teWQFE39KIndDSptX3aysnkIGDbrsdtDBYTRlQ513RFojUwfVThsNmBZesyI%2Brqsdhl29j71%2FoSnJKYpNdPX0q0BuZaZWU9be7n7O%2F7DA9FtmT0PMdWqst6KibtZmM%2B3u3uYzaEiBZ6QEBDGJeXTtzkDuu1Ht5paUzne%2FJTTHPGDfccZ1i%2Fq7BY5ucbn6r7owK4u6HjpIvLt4EeR5Iplmc61z%2B8Xb%2BFrNu2D2UYz0PjnGBIeZ%2F6WyCDj%2BUQMMjT%2FNtFSZg3B%2BbkvrRPgnunJ5zauBZR88nfBl5y85f8yhQ7Ws2M6Xlu4WAImu97uDEFnXl5nEpDgZzM%2BfLwcGsKVKA1Fi0XndGg6fRRGomVGMfNxmeCNn6NbUasvVhfsbma01SZrAiA71rTIUlpx2yRHHlmcYT1mpAR5u8gL%2FyjKkHpIGIXyNC4d0pzX3FYpA0FZJ7MAgR8QYDTgjd%2FokPi5MROp1GmW8TKYIFHNGE9rua%2BiJg%2BB8Sv%2BFuzfn%2FwmFBKtvhdXqRjuU0txJtc0jVeTKZgQswvuG4zwY6pgGgzZdDqk0%2Fe0u2wATCAPTggCxJdiG81Y1r0ivxs7uVBjCzAwGWXigjH21HWa4L2j9WGL8fxyjnM%2FeG9nXl%2FZdnBjU4tADBfitapcNwB76FVpoDdgVvJCb%2FSwlidxj%2B1it0G9%2FtrVwqtlvlB07VBrwNAP8Lf%2F2D261hN2BQohBTyc42us3P%2B66i3230Jy10fIYc17cvr1bCbES3aKerZ7pV28YQRIhB&X-Amz-Signature=2f984ff45b01c2000e43a5f4c184190a23de290730166a96e147d88f2a4b6d6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P3OHIZD%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDnX0SZm6JCEkVpzoNvTiQxZmhhUbTr3zzeQt%2FKso%2Bm5AiEAqosaEDotGyi2izyoxI9nauSHucd9snpImBLXRDD8WmsqiAQIsP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBkzaWaw2%2BV3YvxbLSrcAyDsVLkpvTW6zzmsIpR1t%2FlafOFi78xUUk3dMAtY0rAsAEbiI7rIXPQba5ABX3JLqVsSq1sJukJ2%2BxcLsQCCETVY9RUs8TW3smPlsE71ss1Cs9jIUuBS13u3g0uQBLR0wssEXRRfsJpMASyYwxNMj1iKvNnMoqi0EgzkZiLxuF4p8iEKgjlw0wGLfGSY2Mn%2BEg8KG8RXsiQOBYC6WDL5Jp%2FU2IzMWOzpbAOWIcRN0GElfxQQvPmtyWjx66y8z1NDod%2FhfApSw8Q%2FZP%2FKrTOCeYn%2FRpJRPfh1kOhdNBAfw9zi8lSwLUtm5ki3Hc5BlumdddzMD4buyokcfGxoHZBUI3WGO8J8%2F7PReTEQ0ylxzJQykCDYs3O3N81pjK05CPkaukRvWQt4WQf8FOIW7h0iAgFAeLGDC%2B5C%2BWZd2ItZxmd3NsQfDUZJm9RbkBDvsCWggL19aPXT7RQVJ5cux4EDdylCDXsPqQ5PAd9l%2BRPfyvhQIRR5Hao%2Fmi%2BcPQW2nSgRnE18bEYDWlSi5AmrXj1sXOBJWDritgZ1UeVa6VbJamg77uvCa1qG4pHbuMGbXUOjzOr4tM%2B8PDEnbZHQMa43RZYMFu%2Bx902JdPLHvV5IQqGWr9jfhMmyxn6kq7ciMOXauM8GOqUBSg%2BwFPJR5EgpKqX5gkVDc7Zz2efvMVIWQYPmNGQqxK%2FfELyqZ28oQ1fPhPn%2FfvH1%2FvfXOSc44RSstzuwq2jHwavp9ntJRNUd%2FyWgh1guU6VhB%2FQRYNNp10dlYm8nritLJLktaq7BkZ834HiIRC5j1CLKGT0BpR3Mym7Gnl2hpsGKwzI5qHSQ3P%2Fo2%2BZwU61zpJ0vEGbrpoWIDB3Y%2F%2Fz%2FwB%2Bgwrcl&X-Amz-Signature=bed5b87eacc102053c5be63a10b6047cdd0f7c3d197655d865e86226dedfca1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PNW2BGJ%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFQ1ffK3Md2RaygPl%2FWjgrBrnYLh6ENj2YdXVHyYVg12AiAuBGbZ6sT%2BKJAQk7%2FVAII6zsTRTM0FynElgO0L2briECqIBAiz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMItTk%2B2XzjU6k25lXKtwD8AfHlsEq4M7qDdocnMEa1q%2F%2FAF3swCm56eUfMxWR6PZ%2Bx0WCH08NrQiaJHCctJq97aIsLUoKErCyc3paTehGAshpJFvu7hiJ%2BPQ4sm7p2xxt6RNZbL%2Byi6mFne7SsosvZiX4KpSRHm9CJ9ZSldIIT%2B9%2BRtWvXHawMrQQrm40jkacGFGJ8uZFaSUh3AjpxhD94hb%2BiIYWaLszOs1odq4muY3aQSaSLs5pGeuhpfeR0g92mrgAc9ozosdYL6U6eI77hTdILqWmYl0uk0LQUwfIjD2D5hXoo78qIbFYFSfRxXJfhOOut7k66fq4Ync9Yr0MqFlAf9dpF2gx8eYK5gbB6gTRTijWlui4dwx7K6Mu1gn0pRg6hD1gCnnl09LW4Uz37UQUT1d5VzdJWG9Cl8DHB6p1MbyIDOMADuLQAzBqY5dtsGHQOpdLji9knf1uSEEeZNrx3jWTjMDJjaVYtxou3L8A74QBCzO2M1YrvJOE26pWIuunFCjwJb1KOzYXD5dY4YXgymXU%2FKo3RLIBjcHphe7mihYK99DqiCIABVCz6cbQT0d7R%2FFB0s5JcATyr89R7AJQWXL88c5kTJXR%2Bta%2F2p26POoWtWiO6obk5leOlrqEjVSG8ms75KkPgDww%2F525zwY6pgF%2FTZvefFWychX9K%2B85MWSwGhraNWSGWmxDXfB6xOJJi2lWsKeJUydQ2oBgDy%2BNtdDb9Wk7vtCYExZTBtjIH3l5DIOt784s3CWGQUJO6A3dBBZKF3f9yMbBYhafcEODtVL3MENpgmxBiRdwTJoG2nJ1v24K2RUz5yVKCb3ZGSJN%2BnCIoIeI54%2B7We820nbCyFBQE79oUdWixQG3fcmt0cnwjT9n%2FCea&X-Amz-Signature=98f570f20348f321a5dc77847ab45abf00dcd9c4554416b20c12b020ba2e215a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYG6VWPI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCnXwSbyt4wNa%2FHBzfx2Y3LxIB39BXCpYRfMCuPa2T6zwIgehtumwpb5ZdgeqzkaFFpaZI0HmOBxL3vwT%2B71fjlnGQqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNcHWLoKqa%2BpdomOKircA6gyYJBF6WD17CDjEfpNjAcfzEOJqtjPorAlep8oKLEMcQpTxOM91BEn277cVkJzvI8ScR9eXlkGQ62drIpzIAQvMNQmwLStuzpfnG7PNGHw%2B6t6ZWa0imhSdC2apBQBiAvT%2BMVirAjSkrznVQFt%2Fdoz%2BMnuYmdpzNYfZmykcDGDaTQWRmB7UaX9Gl40r6D0MWcE7ci%2FeKibEQPka3UqVnnwO8vwl18W8uMiMVW%2F%2Bg7DZCzXOPlIo0NG79Zsn3q0Re75kQOnuDlMj%2BWvvN7NEjaVwvBtWrw8A%2B%2F9tpCwTNNJaPdEVK0lpFH%2FNwIxxCoAsfbqf2xNe2ty4MQ9HrM2kW%2FfvDPZCjrewraZEE13wuH0rzeTpGLK1XG49WUxepQUAOG1JasLw4vmPHLw2OQL%2BxSw8ZG8ai3992LrO8tPJ%2B6Ms4loOpaKZk7gdag3ujv4F%2FYnvKx6pT3mwoYXnFna72o8Mj0J7znLKeENl3T9PU6esIdQsKHUr3Ud5xblVT2WnBn3yZ9uiNaRpJ7BnVdPShQjgsb3%2B8CvjoM6i4SwLQx%2FRKbobxeWls4iLCqK0ueIWrOFfqpf7qPkaDb3XCiqaT6Fz2gnrfhbKa6yTpQrrhl6b%2BbOK8ZAE9dTVQzmMIyUuc8GOqUB43Npo4I4t65J%2Bbsy0YNORMctLBRi7d58lCON3DCuobQjoV7T2Y7p0%2BeaiVYNtknVzxN30jqihp9JnC5pfxmmDNnF1LXFAKLrmiHm4vF6%2BWLORcXRe90b5ar27o1eKGh%2FxAvGK%2BkPnWa45w%2BLTsH0bifomq%2BAG%2F9YD38jtWo2EsJjkZkHcrH%2F9kR8ydzlnvfwIS9Q6KMgdQdeyK2cYiVXfcX4PpX6&X-Amz-Signature=66ff53c6b2d970f2ddd34d289eb6cc5a189cffe5dd001cd8fca7f2584b5256ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYG6VWPI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCnXwSbyt4wNa%2FHBzfx2Y3LxIB39BXCpYRfMCuPa2T6zwIgehtumwpb5ZdgeqzkaFFpaZI0HmOBxL3vwT%2B71fjlnGQqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNcHWLoKqa%2BpdomOKircA6gyYJBF6WD17CDjEfpNjAcfzEOJqtjPorAlep8oKLEMcQpTxOM91BEn277cVkJzvI8ScR9eXlkGQ62drIpzIAQvMNQmwLStuzpfnG7PNGHw%2B6t6ZWa0imhSdC2apBQBiAvT%2BMVirAjSkrznVQFt%2Fdoz%2BMnuYmdpzNYfZmykcDGDaTQWRmB7UaX9Gl40r6D0MWcE7ci%2FeKibEQPka3UqVnnwO8vwl18W8uMiMVW%2F%2Bg7DZCzXOPlIo0NG79Zsn3q0Re75kQOnuDlMj%2BWvvN7NEjaVwvBtWrw8A%2B%2F9tpCwTNNJaPdEVK0lpFH%2FNwIxxCoAsfbqf2xNe2ty4MQ9HrM2kW%2FfvDPZCjrewraZEE13wuH0rzeTpGLK1XG49WUxepQUAOG1JasLw4vmPHLw2OQL%2BxSw8ZG8ai3992LrO8tPJ%2B6Ms4loOpaKZk7gdag3ujv4F%2FYnvKx6pT3mwoYXnFna72o8Mj0J7znLKeENl3T9PU6esIdQsKHUr3Ud5xblVT2WnBn3yZ9uiNaRpJ7BnVdPShQjgsb3%2B8CvjoM6i4SwLQx%2FRKbobxeWls4iLCqK0ueIWrOFfqpf7qPkaDb3XCiqaT6Fz2gnrfhbKa6yTpQrrhl6b%2BbOK8ZAE9dTVQzmMIyUuc8GOqUB43Npo4I4t65J%2Bbsy0YNORMctLBRi7d58lCON3DCuobQjoV7T2Y7p0%2BeaiVYNtknVzxN30jqihp9JnC5pfxmmDNnF1LXFAKLrmiHm4vF6%2BWLORcXRe90b5ar27o1eKGh%2FxAvGK%2BkPnWa45w%2BLTsH0bifomq%2BAG%2F9YD38jtWo2EsJjkZkHcrH%2F9kR8ydzlnvfwIS9Q6KMgdQdeyK2cYiVXfcX4PpX6&X-Amz-Signature=a9594a8ef099ca6cf4ab82f7f39f8e308c7a5200b7ef58fc8fce64a6bcaa5001&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S42VVAOU%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGi77V10zvUr5SZOgki7rMAUU3HnieBBOyTEqJ8qhpkSAiEAjaMP3Z68l5fW411FJl1Og5h74ZnjPfqDFZ00sFydkbAqiAQIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIM92Pa19vxh9n0ArSrcA70gV9aBaWSUs79oT2pDfP7zkbRJK105AP56kC0G9QTkkbEGAfCFTUr9Tg5n3sL9PH69416QkcKHtaJFAObyc9RUSciLUjdYVNkAvQM8pvve5uzIqvaKvnkhE4xuRiVW1UqJTE8%2BOwJBYZHF1OOxssu9hXt%2B1q6plwBY5BtTgmZTt9AbASAHdJY6RzQETsYf4J20NpbKavzU12gRAifQhH34wUDOlBtqv4qeaWN4Ti%2Bm9Z5%2FhyFznsVGXwxfB%2BQ8To4vK3XLigI%2FK3GDpSzenJ87dz2vm31OMTsIfbtue7drTBkQidZo2i5uZVgoxOqDEreotn9rHpAU%2BJqBAhH7qhKalKa8GenJNMwD8LLbYzIWPbjSu2huxpjDX%2B8Do2ivRpcs9q%2B%2FZI7U0QkYm3m0h3zcHkakRL%2F3df980P4dlfiPQWODPRUTCZe2meivP28dlS1PpcSP6reEeEG6nzrbloON1ZC0hV91FJ4gzWOFssWBGj%2BYb52mCrTfd%2BhwBozui7JZOCUFJiyxtyjHSXGZlZ8D594zCYxDVgG%2BM0bjcDvMjsBmASKxz1X%2FaE1FMt05lkZd2OTINJo8j%2BKV6FW%2FXYU0xw9PNkpFgyfh9OgPEwuMxk6NpxodGQU2Ng7gMISVuM8GOqUBhuz6mybd%2FJvG5K8ISxOp5jMfK7P9jW6OFnMiXsW%2FWhKcZaUVef062IsGRHgnR%2Bz9H0wuZAcDacwu65khZnRvb%2BoqpzLdXMSgc%2FHGyiEkL0e23rXMTCmbDrwzTACFBcK8VlPCzt7jg%2BsEievKEhWtiyYhJ1afNIXgizvobzpFAdYBlZjWSCbkVjYoPrwIAe9OmZqK3stNKtfaQoU0F4Ns3ZrN1DfR&X-Amz-Signature=0f3bac03f16ef013ca5be296d09ce9967b4a1fdc84ab069fac414fa4f953c4e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBQDEUB6%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCgNyAM9OdGnBDHwOU82KGbxhF5cYo6M%2B%2BzMGfhwQR4qAIgNBdr9ROQHSMhrmF3W9PuhPkEypqBR5NtgXr%2Fn30ETYMqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFLhehnDQrOS%2FtLC5SrcA4S0daHLsyTpe3Ks9IXyZU2DgTa52WOwJi64l5GpM9XDTb8Yj%2BylY68ISCbXUeZeXr5iH9KI%2BRWSlzqxs%2Br15dfznkL9kgDHKzkXVa%2Bt3EJeub1D80wiUhhRwjYpVSXbIJ9q3hbShKRbQ3b9pHtG1b3lwIDb7t51nNaDcUbCZ%2FIjPZBOngSip8i9u2KNUFmbWGi%2Bo2gEfICCtl7lkQS2qHrxsvuxR1PNe7QvgsLY2mG3yt96vPG26OJRHDG5L%2Bbq2kjijfPxsP9iSjo0QmdWLmHM81JNuZWffj8IhZd0bCb9DLrtKwG%2FSFzZ06ymiv%2FysB0Q3tKy4%2Bw0KaB27RgLK7H5LkAGeUZgJGwAjQzzAUYNdS%2FqUCL1K1J5VmXAW3lBfYlPpmQDi7nU0QCJUN%2FxfeMgAeK%2BVLXuwGSVqO2xLrzhIwAXY1iGwRYivUqOc8rJ9ir%2F5ANeQJMguMlta97nIfsuue7IBKB%2FuM45FH%2BSvBs3%2FZ02AxG7yXvoW%2F7d7eTc3tPdGl5Svot6FqOHvj7ROHF6xyahHdPWQdKimE%2FRgYqug4Xfm7eQaFEQNUEZGl56ck8Lu%2FCFfjJL575oy%2FbXi0iPhYNW1FcY%2FQ4%2F75p4vI5J8FpMrWolbt648ayNMOSjuc8GOqUBMte514tn9F%2BYSf2WAY935soM7CWbQ1N0yy1lCN7jYd3k4BMn%2FdaM4%2FcttUR4V6goz8kdpDD1nmcb8n3PF6UyQaSxpdVKUBkK1puGw%2BJeoYXdwiXr26rl9RNY4jeHLuYt35ODNSLiNhKRrAqgvDcNnmufi3yWyf5t8G5aBticfNAophn1thX21THkTutCUEPfLkSjfQQLlbA8iZ%2FltKHsLyBgklGZ&X-Amz-Signature=65a54f27c780641e66e0c52191e07fb84f3447e439425cb91b9ee12991669131&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBQDEUB6%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCgNyAM9OdGnBDHwOU82KGbxhF5cYo6M%2B%2BzMGfhwQR4qAIgNBdr9ROQHSMhrmF3W9PuhPkEypqBR5NtgXr%2Fn30ETYMqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFLhehnDQrOS%2FtLC5SrcA4S0daHLsyTpe3Ks9IXyZU2DgTa52WOwJi64l5GpM9XDTb8Yj%2BylY68ISCbXUeZeXr5iH9KI%2BRWSlzqxs%2Br15dfznkL9kgDHKzkXVa%2Bt3EJeub1D80wiUhhRwjYpVSXbIJ9q3hbShKRbQ3b9pHtG1b3lwIDb7t51nNaDcUbCZ%2FIjPZBOngSip8i9u2KNUFmbWGi%2Bo2gEfICCtl7lkQS2qHrxsvuxR1PNe7QvgsLY2mG3yt96vPG26OJRHDG5L%2Bbq2kjijfPxsP9iSjo0QmdWLmHM81JNuZWffj8IhZd0bCb9DLrtKwG%2FSFzZ06ymiv%2FysB0Q3tKy4%2Bw0KaB27RgLK7H5LkAGeUZgJGwAjQzzAUYNdS%2FqUCL1K1J5VmXAW3lBfYlPpmQDi7nU0QCJUN%2FxfeMgAeK%2BVLXuwGSVqO2xLrzhIwAXY1iGwRYivUqOc8rJ9ir%2F5ANeQJMguMlta97nIfsuue7IBKB%2FuM45FH%2BSvBs3%2FZ02AxG7yXvoW%2F7d7eTc3tPdGl5Svot6FqOHvj7ROHF6xyahHdPWQdKimE%2FRgYqug4Xfm7eQaFEQNUEZGl56ck8Lu%2FCFfjJL575oy%2FbXi0iPhYNW1FcY%2FQ4%2F75p4vI5J8FpMrWolbt648ayNMOSjuc8GOqUBMte514tn9F%2BYSf2WAY935soM7CWbQ1N0yy1lCN7jYd3k4BMn%2FdaM4%2FcttUR4V6goz8kdpDD1nmcb8n3PF6UyQaSxpdVKUBkK1puGw%2BJeoYXdwiXr26rl9RNY4jeHLuYt35ODNSLiNhKRrAqgvDcNnmufi3yWyf5t8G5aBticfNAophn1thX21THkTutCUEPfLkSjfQQLlbA8iZ%2FltKHsLyBgklGZ&X-Amz-Signature=65a54f27c780641e66e0c52191e07fb84f3447e439425cb91b9ee12991669131&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RIEDAFF%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T183159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDZO8hyXtCoIj8iLpHSp0LpdTmc35eZwXR5a%2FK%2BmLLpEAiEAyLTkcO9WfzP71mXY9n6lYAVhQ2MMEmJT3gXPZ%2B3Y4RAqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG83DxhsIbNqaKCCTircA3QPM%2F6y20gu59PBwU257V7gSPum2sc32SwpCZahv0K2leyeuhFSsCL74Wqgqpr4t6nol2%2Fsv9yT1PJ%2BszSIlnxeWp2sRAUa00qtytx%2FVtrgsm7iNqvGNTgt4OHePA5PmPVtGsZRgHMwP%2BSGGjgpBXnTrASMLFplt5bDonPncFQjR6vdWTsoG%2FKA%2BAvr6GRppj1qxhbvn8gpKTQLhUT%2BoebyrLqhz%2BSKw%2BpfErUGsNunxjiS%2B5o%2BtqA9ZgQ0AdyOYITJZwMO4a0jle4sgjQfflYFi6kQfTnqhvI6Jd0ZIXnR69%2FtNnrHtuZza6Hy6Z%2B0nIbrgSwbEvfN0OkPWdjL%2BzYynjvK%2BpO1odCes%2FY7Daw2FnVw6mRtAZQxw9b%2FdKTE6t3NxziOxTR6UGcZFXvHBjSR0I6O3HimxvwYJDQYt0L606Ph3JCg8Xt2X2UFFiW649OKmIb7%2F%2Bn8Bl0BIJA7EHq8OQaXyoCuamtUfhLNcKndv4WQH5XDzFY1KQV%2BOYlwoENK7ovLQ07FJxsXS4lCXD540%2Bb4GJ%2B1E4JXAjnwtNqcd6dK4GKBvTFerODpb95USN8pcU0MTuiInzs2IRfATJz3Kl4Mq95tM4SIJTDaWVCVezZYrvsYntruvmG6ML22uM8GOqUBX%2B1lyS1L4HzjDaWHcc06gyP5OjmnCK%2FHSeGeJoK486%2Fe1lPC9xUechsRz2hkRdiA56rIWxFNdidi5ywA4dvn0k8so%2BFqmdX4xKCGrO1MWUrFsBaoOuMSwYp4AEL5NHVXJ3gsSam3vQaUBHLD8bMtfo2IsdVqkYXSsOI72lh3k8QmL43DphqIJSh8fFrXyhFIP0Ta47ZAx0Eva9upi6gsf6ioxg%2F2&X-Amz-Signature=7201023eb62288c921bace17593bbb4fa64926ad4a3c81f57a1f95fb679b215f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

