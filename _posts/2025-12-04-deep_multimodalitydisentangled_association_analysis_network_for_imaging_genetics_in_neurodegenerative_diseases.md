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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIODQQ4K%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCICdo3PZRoR78%2FXkOQOopQA7HFmWigTi2J0Q9ZS%2FYbnlzAiEAzCKOJk0r8eLroGZskSBCfdbTneLf5l0PcfANGtrQFt4qiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGHQ1LPuwT%2BVe6M6CyrcA302f%2FfST8zXOxEThSQxPnrf91y8yjCR%2FB3%2FyRhM81ChQ8kyglCUwWBSaOi0zhcrp1emufU32JGEG79r2JOThcY3wm%2BOVp4D8E0Q0iNf8eIGLP4%2B%2BlmK%2BMk%2BIkc7IWwZ1JdgBJeVbN6WRhiifu08u23Y7Jry%2B8q7PkTVi%2Bd1PklFDKg%2BQ2PZArsb1NEzUdtyJEZ4vP44rkMAUbRxr71YzTBiivFenrm6GRYZRDPFLdvaT%2BPdOxKmCB%2BT77BJEX%2FINnN0U25UetkQgHZWmSgTcGhpXhVNkOIzgPm9Rv1CUEgEDm8dYDgre4yX%2BDWnP9YzrigiTqBvZn%2BJo%2BcNTAUDqZUVnwL0HSli1HkddLnv077aO9mKm%2BbKM9F%2BT9Ap7XCqWACzZZFYnWBAfzf7Im1XLo7xyJhZUymiVW69m4RksvCt6kJ2h7Qfe%2BEiPpI4xUWXjyS5DAqaOVi11%2BYpybUAD6cmFVGP13n0uly4PEXGYXnVCKhPxCpImmuoWjbLvsn5%2FRO2DLE9DXcjZoWXl90DOUMLWxWynrW%2BXjbOW4PcfyxFKp%2BPWFNnAUJDqmt%2BwUcLD3%2BIbJ4nhEJropElOPlNOBhNbxpLw3a6ZOEyLaYCP5zib3BS8aueLFq9eb61MMXorM0GOqUB1mixsEwCz0QfI7SsKOra024umAGdo%2BZiTlJh2Qd00xSSFohjWott44iUwOSBN9LgB%2BlcJwlCumJxf6z%2BcfZPOBB28E%2BKe2THDM8oHWRM%2ByyzNdTC6sWmSedqlgyvaT1R7OIo9gBKbrtzmwM5F8YIUf5ZVlR1Y8mran4UTQ5fI7iOpNzkTgzfWSYX3Ptd2DjbdQ70qPLG5ZfWwjfdmc8xPgbPwiJY&X-Amz-Signature=38291b2e460a394a6dbbc99c9a67114fc79273100b91731eeca566c44c2aedb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIODQQ4K%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCICdo3PZRoR78%2FXkOQOopQA7HFmWigTi2J0Q9ZS%2FYbnlzAiEAzCKOJk0r8eLroGZskSBCfdbTneLf5l0PcfANGtrQFt4qiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGHQ1LPuwT%2BVe6M6CyrcA302f%2FfST8zXOxEThSQxPnrf91y8yjCR%2FB3%2FyRhM81ChQ8kyglCUwWBSaOi0zhcrp1emufU32JGEG79r2JOThcY3wm%2BOVp4D8E0Q0iNf8eIGLP4%2B%2BlmK%2BMk%2BIkc7IWwZ1JdgBJeVbN6WRhiifu08u23Y7Jry%2B8q7PkTVi%2Bd1PklFDKg%2BQ2PZArsb1NEzUdtyJEZ4vP44rkMAUbRxr71YzTBiivFenrm6GRYZRDPFLdvaT%2BPdOxKmCB%2BT77BJEX%2FINnN0U25UetkQgHZWmSgTcGhpXhVNkOIzgPm9Rv1CUEgEDm8dYDgre4yX%2BDWnP9YzrigiTqBvZn%2BJo%2BcNTAUDqZUVnwL0HSli1HkddLnv077aO9mKm%2BbKM9F%2BT9Ap7XCqWACzZZFYnWBAfzf7Im1XLo7xyJhZUymiVW69m4RksvCt6kJ2h7Qfe%2BEiPpI4xUWXjyS5DAqaOVi11%2BYpybUAD6cmFVGP13n0uly4PEXGYXnVCKhPxCpImmuoWjbLvsn5%2FRO2DLE9DXcjZoWXl90DOUMLWxWynrW%2BXjbOW4PcfyxFKp%2BPWFNnAUJDqmt%2BwUcLD3%2BIbJ4nhEJropElOPlNOBhNbxpLw3a6ZOEyLaYCP5zib3BS8aueLFq9eb61MMXorM0GOqUB1mixsEwCz0QfI7SsKOra024umAGdo%2BZiTlJh2Qd00xSSFohjWott44iUwOSBN9LgB%2BlcJwlCumJxf6z%2BcfZPOBB28E%2BKe2THDM8oHWRM%2ByyzNdTC6sWmSedqlgyvaT1R7OIo9gBKbrtzmwM5F8YIUf5ZVlR1Y8mran4UTQ5fI7iOpNzkTgzfWSYX3Ptd2DjbdQ70qPLG5ZfWwjfdmc8xPgbPwiJY&X-Amz-Signature=38291b2e460a394a6dbbc99c9a67114fc79273100b91731eeca566c44c2aedb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3UY6X4I%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCICYH6dtJUagPGPCcUjG7Wbi5rF2jykecN99jYg241zoxAiEAqU322IT2X%2BdXEqBfZkwcrvHLmHewOPqGpLpINUq3YBMqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDfNarj2NKIMb0LNuCrcA9ckmlIMR5vLoBooFy7l%2BV1UXX0YcnZiwwbMuaBJxi3nMgAeNU1wFEcvsNz3Y6K%2BvZBNRlb8ugO540LwGLBUEPugcM9cejutePj5Ej4PaQWaJvoLolNl%2F95KasEfO%2BUw9Sypw72gTczSFP8E4fM3viVkAithbQafhlI1OH%2BjPuoOT9SKhNHCn%2BQstwltSG06TvbwMk4ULsaY7wzNQskuJ5iH6MzSf1eWIqzQRVKegYZasv1%2BaNRpgZvU62aeXYKoX4es%2B6uOoKzrRcOQ4m%2Fd37EGRJHCkw08%2BGCTFrT19l2lCS%2BqRKUUIabRK6LYtylW4XNXD3USJ84sUwsgvTAskZVS2procUkTPHZTUre1DtEP6k8sAKr9kSfLxTLPfXqGjm2s5TWKtRy10RGCzJOp42AsCGX0usJdouJe22ckajZIH%2BZQmcJcTivlm98S9b6jVPxqunkOwNaeBtmEQlNVWin8akrxvLHLMivxs8FnDdcH%2B0Lk4tbZNk0MWJpRd03TIVXun7epQHq2JvsfG6j2d4g1jp3HVUtSb3P1nMR9%2Ba%2FfIny6UZ8pMmqwdlFuNK%2FmD9PTnmlyDmuIXPMrjSrQSVMskgzhJSnENQ%2FgealtRf4i%2BL2UHY%2BMdoCzZ%2BmeMNjorM0GOqUBinS3FmcVEZw8VLE9MQokwJ4YkESDv2KNRLRw2Rl7wv8BU6Xur%2FghVV2R00vwS9XRRvteYxUrqvpkZwjPt4Tls8ZqW2vSXg1pWUhSyy3slZfGuDo7nCWzOg6tZelws2SqsXjhqYF21RsmFqTlBzslxdiruEoP3d0KlnxmDbbPwNLVwEZPiHJ9kBKcarY8E6XzxaPJ3heCjvQgT0cSAABO6zk05mb1&X-Amz-Signature=c7b9183ee73ea66777a31c71c7ae281d0a70dfb89cd59f9b2e7021eeab36ce1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLZJJI4Y%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQCmTUKrvwUOWZsdB1wXvw26nUG63KBq3MrBpd4CS1bu5wIhAL478sOWB8cSrsgN8wb5UHvFvmdM7hPuFqndovWnm%2BczKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwo%2F05EwtAvwUtov8sq3APDHdt32SIpnBagpfsd4EFUJc7jiDrVACjWxm03vPADqq611edoZIzpI3feeY8R36xjqKja6CoDo2GqAEuZqw%2FISclD9c%2F%2FFEPGzejy7EatIdHQKPO5cjrtBDTYsN3zsv6XYMkc2mc48f3SOXM2npUwJZSBYVHtJdQh7vqnH2dbrm%2Bg4rukNLS47fZxQrXetbEesXNImz0wdsl6LmZPG99HIk3AUrqascKQEnYNtXycfnRGpMSdFfNu8Wbga9q98n3DEcVZQ1khvkf2EA7A%2F1tK%2BmbCByRYU%2FooHzQTRr8y7kHfVJwZr1yWUcbMsTiB67knYr1%2F7aDtCobF1M8wpWtt7HQ1nJSh42hvOrgaEanI%2FvrAY0bdpqGeBLvkGsiibmGQOLSopATKPDCtSrK27tExZ8kpRuoVV8XKKpPDiM4v6OBY4hnEgL9WDUYAsWRgVXuprNyEr2sgjzAoaXeUYEqXvANDke5FVM540BUVjIuebLGMjxcJBRewacFdVkMSNjZhO1g%2BV%2F3ef0ddxVSN9A4zFIHqzGiY%2FKavRxwmyDqx6fs8ykSNaKSXQf19tKgcGF4TOqtXURDd93gQwGy1HfkzRn00WGNnWGI7cdtxFHEBUGWGYW9uScgfvxO%2FrTDu56zNBjqkAT%2FuW4IyUCRkOU4gnf3qiveUBDPY2PJLj5dCQxv5K03c9xirP09VlKu2UOkGpMgxDsllA2CtHHU7PHolbh6K8H2OSZh1S9r1ZDEFTOADGBgpzMLALeXSjsE9GLII%2BsC6GRQ%2BJFjX4N3AM4puQQXDN2QZ6K3RQV776Z5jv3zZ%2BWpsAq198WtW00NcDIhpApvdCW6zq7RqM1ExGrwqkedBlVUeiY%2Fy&X-Amz-Signature=5e9417f8b3eec3c251bff2f02a84e3a2003ce84fe4425a37d48365e465bf5cac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLZJJI4Y%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQCmTUKrvwUOWZsdB1wXvw26nUG63KBq3MrBpd4CS1bu5wIhAL478sOWB8cSrsgN8wb5UHvFvmdM7hPuFqndovWnm%2BczKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwo%2F05EwtAvwUtov8sq3APDHdt32SIpnBagpfsd4EFUJc7jiDrVACjWxm03vPADqq611edoZIzpI3feeY8R36xjqKja6CoDo2GqAEuZqw%2FISclD9c%2F%2FFEPGzejy7EatIdHQKPO5cjrtBDTYsN3zsv6XYMkc2mc48f3SOXM2npUwJZSBYVHtJdQh7vqnH2dbrm%2Bg4rukNLS47fZxQrXetbEesXNImz0wdsl6LmZPG99HIk3AUrqascKQEnYNtXycfnRGpMSdFfNu8Wbga9q98n3DEcVZQ1khvkf2EA7A%2F1tK%2BmbCByRYU%2FooHzQTRr8y7kHfVJwZr1yWUcbMsTiB67knYr1%2F7aDtCobF1M8wpWtt7HQ1nJSh42hvOrgaEanI%2FvrAY0bdpqGeBLvkGsiibmGQOLSopATKPDCtSrK27tExZ8kpRuoVV8XKKpPDiM4v6OBY4hnEgL9WDUYAsWRgVXuprNyEr2sgjzAoaXeUYEqXvANDke5FVM540BUVjIuebLGMjxcJBRewacFdVkMSNjZhO1g%2BV%2F3ef0ddxVSN9A4zFIHqzGiY%2FKavRxwmyDqx6fs8ykSNaKSXQf19tKgcGF4TOqtXURDd93gQwGy1HfkzRn00WGNnWGI7cdtxFHEBUGWGYW9uScgfvxO%2FrTDu56zNBjqkAT%2FuW4IyUCRkOU4gnf3qiveUBDPY2PJLj5dCQxv5K03c9xirP09VlKu2UOkGpMgxDsllA2CtHHU7PHolbh6K8H2OSZh1S9r1ZDEFTOADGBgpzMLALeXSjsE9GLII%2BsC6GRQ%2BJFjX4N3AM4puQQXDN2QZ6K3RQV776Z5jv3zZ%2BWpsAq198WtW00NcDIhpApvdCW6zq7RqM1ExGrwqkedBlVUeiY%2Fy&X-Amz-Signature=c9cae6cb3b93d34b5ae02cc297ec8e0dd10521f615256fde24ee95dd40172461&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SB6NLCRK%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQD0a9CVXQ793q9oQi19uK%2BajiaP%2BaF%2F6YrflQE8GJpxOQIhAP%2BBJAhxWv3yMBkNZ0bxavvdce9tl94Vl%2BJBSNX3lhMtKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwMkZXeRaPIhQYfthgq3ANfW2l7nF3FcZR01RhRx9R3D9fbH8z7IQPzEPD%2F1n6kHDUyITU2PPB2wZOrrE2rE3zZ3WzhcKIaQBuMpn3LyIeOc16SumBDrGJVyp0V%2BilP5wcssdHCn60xXUtBfwiRjIkkYet%2FdaGZ7bzaeyahv49auNwBs2oVEpGYEOokoOmRtB8IDoNvSfKk5e9b2qyXUwqpNe2TJGZwRt6%2ByZJjRplV3p6H1o1xreF5G3NIwbu%2FnKlActeRSRrJ1L7z9K19oHA1urewM2WNLfy7bz5aMFHi2cQFknbvTKMSHmohPdpcwXIRkoHf589LT2%2BrBP9cFNIBO58cBFMc%2BYulSnRKO8FMauzcATp416UfRVjcHVDP0G7ZHXjmUJr1Tw8tEQbxUvwBHht4Y00P%2BvfXIXfm212uSoU61iFbiXykBcvJbTjxLAPpwVFCuE%2FmMVAFgLPKhmAsrXlrrVdPISV3ypBlIsLMJ6lwDKgXGIfekFm13NjGnVxO2kSSWpnhR8gykCGoRJY%2BIMvQE%2Fp2hlPnG8mO1ZGq1oY9D%2BJueS5VZi5yUEaYJsjTqnyWsklOkJ%2FEjTDRcWd5nDc162rJOj0pCjsLIWa4gr%2BCbDwkfNgM%2FxTyX9UQfYg51p6MZZPCO5nfrTDz6KzNBjqkAcwRPdrBpEYslpnSCEBNVfcu9m07TNGOsCzTURrx%2BnDTdoJ%2B8EpUpYOuRqPj1SaeWB8GgyuLmEt%2BzSaiI1tLHAv9riEOfPvdpiXvYcAsHadnudcceIrZ06p7YXwEu7HOz7MgXKmr8KiOxAQK0t8JoTGicYb53BrsWaKvU2iuwGhWRnpRoA8%2FHvzfCX9hL10DF3Udw4BdcvAwh7oV1wkXaLUA44Vq&X-Amz-Signature=0d9d6aba16eee31573520641ac2683edd6178c54c039c1b7e9958521339a25e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNQN7RFV%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQC9J5bOlpquo5IWaFB5KWZSIQqjFbr0XtJA5jAW9AddEAIgOk4VqSXKIXRL%2FWioKZV08XZRp0QRyCKCitlzTb5b20oqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOxtJmenTfUN2iHeJSrcA53aSMr4qTlgLhjfFPSd4ZqEs%2BR%2BEkyIFOfY8vNA4r5Eg5wtWUY%2FQErF00XDwIFt1XHHj5I7jHAtbpzINwU%2BAdHcn2USzI5P6XNWJB6%2Bb1y8lZ82xts2Xab7W%2B2rxgfDIEunQYWYVaVStwx1RyWINT%2FJf5YhCSoB6vqYhIO4iTVsQ%2B63k8k6bbm7nlGXP24sXAQo4mRTIJbCugECCxsr2UDT16BioSVDpeE7hNn0Nzq2l4MEbUuFnRTiAwq5YmlrTb7TDFng9Vl1kQypjAi1HwFxhEEN%2B7h9bfeUJuVSiP%2BiRqQ466z%2B74%2ByN0OmFPZ8LfvRA8SgVs9XylfoUesxyzrbDzxw%2FrU%2FeXxRZcKfufthSTk1VraravKvXjgzs6iwz6k8%2FPVBHvekzLKEWW739yrk4OC1PXSrltkc2AfyahbF2DHRaUoPZpSVub3NXp2kjJOQlxQeXO3FkWmL50jNPmr8kDD8EVltb1Ote3HU2nk%2F0m4Lb07c7qgMEq66yGpl%2FGvCkqie%2Ft5Ab9%2BgINMCaz%2Br61l%2FBnh7WetiWCbneXXsgIAEkbjObkDzTBc%2F5bvfqQp%2F8Veg02OUSRyg5DiisI1MBeUAy1ePSEXT6j%2FBfuZchSfw6zKTUj9J4zn2MIHorM0GOqUBQF68%2F0NXulLcoUGjl72QmmgEs5cFjS0bj%2FK5w4BXvfVF60vYPDjsk1J5ZanIZlUPonR8FcadwZkbiJ9dGm%2FBQ1xhEDKS8DQ4%2F6xdPRc1DLQnHsu9TH9HwdltXcOFJwiG2jvHoq4o%2Fo2xxk3zFGaaiurWl3H%2Fhim7PCxDBb49XotO7H%2BGuwpzuN4%2BPqgJs155MVzqa7i%2BR4irv7VL7GJMeVyKWrYX&X-Amz-Signature=4d2ec835587a1c5735c6c7ac97bdc63f124e51cde6a8ee48726ab786934aa589&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TL6YBIAZ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIDNIZmdC7l9b4J7fU7kTEivA70SoKYfyaPU1f6wBzxSHAiEApPBaOCLk2xwcpb7KwFAl%2BTI917V9HB4G%2F2iqgRkiRHMqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCEq6NsCCPir2VnJ%2BCrcA3yj%2FO8NaQXM3yzfuAqVNG5cBh9bs1%2F5wJCIQCM4bnnCbzfj%2FzfYJzEuCmFWD7vORfTZ%2FIQ52FtWzjLcK88FUxkASitPLSTSPuF072RsA94oi%2Bg0T6cbcXjQOdJ2%2FftZ2wgF4zpiHmykxdKR0qR%2BPVkTbBYhPv%2BJDPgqbuWkF7AYtUqEV4y%2F0dSRrC5fnDgLbsnSBQSQOo%2BIw7%2FqTbucOMr%2B90Zq3MkirSWksSQlQDfRdmAVIbuf%2Bw%2FVo32xLssHBc6USAhwyLxTkDqvzlw5nAq3Shvv3jY0dE6T5YSDgsOtoBSSqkgd1wPTKAOYG9tnEOR%2FqCsYJCEKWj3B7%2BxCnCtkCK83pV70MPbaok1IBs8tlSF1rxxOH7j3Bm0vYWfNtnrcEIqdQT9jMVtBjCoEkijFaxd4pnFjw8S7bJOne%2BuWVDRtZy3554OivFEdwgokbn4TAbAWbU%2BJH882mQa%2FW09iDgb42NpTmERIVWjnzwwsEef%2BVP6ZBCXm1UuFHaItg3xDp3lWbSuzxQz73gYzAfAxqb2sUIMzi9Lk0WsPTBY56oZ%2BwR5gSfqISPCzsVXcanUOUOPpFCxLOXRaYXS9ot9cIwuvDNw%2Bg34jXwoJm1%2FhuzDOk2JleXAmH%2B%2BNML3orM0GOqUBbED91zap3X4HiSyR%2Fui7mSAL0DYj5kuTOPHQNCBYKNXfVWRbhSswY9L0tXxitWsynrHdwRtVNCZmVgkzteFqEPlbsP3oCU369d97TPAZ1TCAAXjLu81JbhHubfECTJG3Rg5oPygu3vHQu6ksLasRZYmtU%2Fx%2BzPGJTwbkjc8xjSarMysFtQ%2BLLVedpd020qpBO0AunorhEEt7EFjhYujbo6pvgb%2FW&X-Amz-Signature=16cca29f1fa1ab9503829c59546ada8b4a0ed657270633d0a96193769d83c61b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTQMGBFH%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQCW7h%2BeRDF3MG4TM1QuetH4iQDSyarb5WBqvGQOLKIPaQIgNwz1qqszII7%2FB93H2FfnP%2FaXV6HTGRlak02x7EdA0xgqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKSJuEqHisQiS0B9MCrcA9Y2pMrjliMcvQAiSwE5MTWLjiMqWcHkEbCI5mEJfxl1bp0YqP0JJmWVu2jbs1%2FfKOm%2BUt5pluZVmeFSvNpUmXXx9xd5zfpm4w69xGe%2BjoRImw6OBl4bEurZeLLL0Io8Cb0CSfIaxEaA2FRVCvo19abUHjJ4uBP88a0C2lftpZWIHJBY%2FlFFg9dIWq8hglU%2BJGQcCrC69EpW7Oa1tO4X87vbLMSdM4CjZAA7ADU8uFo6fJe9sLz0D2ZfmGHoS2i0bA3f7UDOcmt2VgGL8GstwNsKxZ0ybxajfntkYztamCMDEiviTRvRL%2FZllzDjvF9nP5pQQNfQVRuc1fWi6W5uRmmy%2FgzNPoTfEYAjUNJLflkF2W4WlnGkj9Z4L9P5GHcrJP1dlLCjgmYccyi1DXBsjCA5Ez2bcXQioVize8Qov3N54IOj%2Byr46FrRRbExS63HfTFVX%2F4a%2F7MimoJRoZl%2BQ4c%2BbqrkpWk01DL4Oe2ovmIZsLyzFcqTuI3k%2FsTEKzHUrVn5t2mcylVN9uqCfI1AyJ8MFpnXV%2Blm0pJ%2FOGeGiAqny1CVWlz0dYFN%2FPlMjMDOWYHQRRJQqAfwl48563Mw6bfCnZ%2B7l%2BCt8uLxiDwZIppcwKTEJNMNjpiW9OxmMI7prM0GOqUBtyvkp34aoeI%2FXXB%2FIqrcRxaRSUnl3rB7m%2BV%2B7axNd6mKNpdLr38%2FqGvT4JmR%2B9MsypoZKaC2ebrKkDPJztrAkFZKz%2B7GsmZirk5wjdK%2FuFbW3fMldixnAJRppkb%2BL%2Bt%2FeMDG1eaKOtSAOkr3CZQzkj6w0mmkFTrwxnV%2BJX9yrYY0L1D1XH0FtIJm51Fr237iBQF6gOnVgxcLJTD7CimKdQh0NhTN&X-Amz-Signature=0885cf2000362265306d0cb75978d68108d1e68e855154072471e18e9648ea2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTQMGBFH%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQCW7h%2BeRDF3MG4TM1QuetH4iQDSyarb5WBqvGQOLKIPaQIgNwz1qqszII7%2FB93H2FfnP%2FaXV6HTGRlak02x7EdA0xgqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKSJuEqHisQiS0B9MCrcA9Y2pMrjliMcvQAiSwE5MTWLjiMqWcHkEbCI5mEJfxl1bp0YqP0JJmWVu2jbs1%2FfKOm%2BUt5pluZVmeFSvNpUmXXx9xd5zfpm4w69xGe%2BjoRImw6OBl4bEurZeLLL0Io8Cb0CSfIaxEaA2FRVCvo19abUHjJ4uBP88a0C2lftpZWIHJBY%2FlFFg9dIWq8hglU%2BJGQcCrC69EpW7Oa1tO4X87vbLMSdM4CjZAA7ADU8uFo6fJe9sLz0D2ZfmGHoS2i0bA3f7UDOcmt2VgGL8GstwNsKxZ0ybxajfntkYztamCMDEiviTRvRL%2FZllzDjvF9nP5pQQNfQVRuc1fWi6W5uRmmy%2FgzNPoTfEYAjUNJLflkF2W4WlnGkj9Z4L9P5GHcrJP1dlLCjgmYccyi1DXBsjCA5Ez2bcXQioVize8Qov3N54IOj%2Byr46FrRRbExS63HfTFVX%2F4a%2F7MimoJRoZl%2BQ4c%2BbqrkpWk01DL4Oe2ovmIZsLyzFcqTuI3k%2FsTEKzHUrVn5t2mcylVN9uqCfI1AyJ8MFpnXV%2Blm0pJ%2FOGeGiAqny1CVWlz0dYFN%2FPlMjMDOWYHQRRJQqAfwl48563Mw6bfCnZ%2B7l%2BCt8uLxiDwZIppcwKTEJNMNjpiW9OxmMI7prM0GOqUBtyvkp34aoeI%2FXXB%2FIqrcRxaRSUnl3rB7m%2BV%2B7axNd6mKNpdLr38%2FqGvT4JmR%2B9MsypoZKaC2ebrKkDPJztrAkFZKz%2B7GsmZirk5wjdK%2FuFbW3fMldixnAJRppkb%2BL%2Bt%2FeMDG1eaKOtSAOkr3CZQzkj6w0mmkFTrwxnV%2BJX9yrYY0L1D1XH0FtIJm51Fr237iBQF6gOnVgxcLJTD7CimKdQh0NhTN&X-Amz-Signature=c60a8e410c5035b9bb951d6a06cc06755234087a4e1e94f7f1015580969af5bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCIUSHRC%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIASWSqctp9QI7z5AnFsmvgJVXaUdui82ehv%2B%2BFHhUWwzAiBDOFD5sUeasEeKVu%2Fu5XBce4IYm5%2FUO%2B8%2BQVADFS1mjSqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxMI5Yx3oldJmR5xeKtwDXnvObGrbyVGxhiBCsenUNqD3hmEuQDSPF0jZAxVxlA2KRSLxDXR0IJbqFyDOwTvXCCbBFkHFdPcdN4KeTVrjqKIxXV4xGWY4Sn0lwuye6SMXEdKrQCrH0KoOqkwlLf9blbfgICU2zvwPIx8FmzWuCRSh08JS9K0WLl2FHl0dCcahXdrE%2BsZWL1UP02DH6mLZCVSiEclleiDf2MDRhUWzRyCFQ%2BtHjbfz4XAOrrmukH%2BwiO9maLxRK5C8RliMMUr%2FJz144ndHTBw1OfdhYgtnfFVnppeGzwFciii7Hc1P6ZtMzA8BO%2BhtFeKq76hpZ4gIi5OC9WcxQfkOipoOBK6jEElIZ3U0xyYisYZjzzFOVX45zF0yEhOQsXdYbPrvcmMr0kkbl6lx1IASfVDtsh3W2xxwQs3GFI3X2kiCBYF3KuWG1MgsDBsg8gOsfgA7wbmcTuUcJ52PcxJFMUqcyqiKV4pBiddRZd3pF7jsuosBJlqiob6Z8RkobxU2yLT9SyNAZ69U9pmUpro%2ByQc%2B7YTyUnNW26mVN%2FRe1hNAH9vZj6sjhcXEocwYl2B5EEqzI5VsCZop7MQ9w8JQeG8VvO%2F2MlwuS4SOc5VAWCCbmhJbcliUIVQdrjlD0P7vZcowtOiszQY6pgEn41ltvvKkfym%2FldEAHxlgrZuE6ypXmqi0345hOZxCY6vHiOigYOMBBvKDw1X1Ycbfc9kqY8zV5BFr0la70JpgcRc6yes%2FBgZiUro%2FvyU2frcau%2FXS4sQGhseAo3Usfl%2FtiMIei9YxjkvU4NPxU7LNrJ5bWSFea75hYfIeWxpT%2BqHZUUqqQoCC7Lo24gK3CAF86nnB%2Bqrbdp0w12Tjb7wAW2NGRZ2u&X-Amz-Signature=a7226be783cbcba1c55624244447b10701ecc0eb1b70ccfd0cb2999654379419&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FULDAMZ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCICzBEiAlz0%2BpF4Jmd4FvOLI6qkQ0XZO670d%2F4XzmKrHDAiAbkKSsVhChuPFXCwO8ApViIT%2FKCa%2BTz6CbhGkd3TIfmSqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0ZMEVYfDPj098Ii2KtwDS0av3g0AzcS3kukMskM3SIggYl%2BsDzI9HV5jcYdSCUOViSCDHuF1QIKJ9J8EeF39HL1hMgWWWALof2FVYp9SH7hL2ZGz0Dmsq0x%2BNZNUZSW2soQFQU9ZVlxiie%2B5Zz6LoxcDZXygekyT7DH11MXh9ANxC7ZbVpTC4nmDkVzCwYnbsxLSWvI2tbcGXw6TDkfTzfZvbHhWZ0YsOO6F7XYx0uKY0VtyfIpp%2F3nd4wVdyI%2BWLawtJkBUdpLzZUomL5CAhvqQoLI%2BTKwmp4lEZpZXfcAQxSvpEdniBwbM18pPV6LckaZA00esfKHXsYsk4jGsVgIseYgzuKCvJd%2BbTT0Pi5VYENgXVcr4OwOqUoQJe6GlhzhKed%2BTd9WB7PcL51LyI1f%2BAmxMlPjPL8SmYVjwFsqXMNlTmgbD6sM6wonltOafI98908AfUanjEMt80UctYoVEQ%2BYBQyWWs%2FgKVwQ13X49%2FHosz4pmDK67Zz64RqeTRHez%2F0FzGMNqYzYOLHAM1cxYGQxfUFbfCXDqs%2BSOX3jDWVwCzbiaXCRUnnflrKlGF6OhvGHJOy5Z3%2Bsgl62CwmOYdDNDORAL%2BfgIjXyaFCKwOXZpOX9Y1crAFBNnSQJwYdILfho8w9Rv0z4wqeiszQY6pgFmC7qRhY8LcXKxD84RsIS%2BVrC1dbo6XFvm0TL2R8BuSc6m2ST2YJbldMgMBw5te0qYCpMhB2IGY8eZLUfFWAUs39o76GAFCBtjeTBDt%2B7z12XrSOYM%2Fpjrkt%2FOlEXbR5AITM0NBAKkX0mjBJjI%2FZHdhXTnj6gerE75bO1ABKDLhiN9zeIRD5PhGB%2FpOZMcv5IiV6PpIGejcX2YtI%2FwJwS6RJ7EAVIP&X-Amz-Signature=595629e00e19b11619bf935767bac1bfbd29e8a80073cbc85a2a0f76d097e299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FULDAMZ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCICzBEiAlz0%2BpF4Jmd4FvOLI6qkQ0XZO670d%2F4XzmKrHDAiAbkKSsVhChuPFXCwO8ApViIT%2FKCa%2BTz6CbhGkd3TIfmSqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0ZMEVYfDPj098Ii2KtwDS0av3g0AzcS3kukMskM3SIggYl%2BsDzI9HV5jcYdSCUOViSCDHuF1QIKJ9J8EeF39HL1hMgWWWALof2FVYp9SH7hL2ZGz0Dmsq0x%2BNZNUZSW2soQFQU9ZVlxiie%2B5Zz6LoxcDZXygekyT7DH11MXh9ANxC7ZbVpTC4nmDkVzCwYnbsxLSWvI2tbcGXw6TDkfTzfZvbHhWZ0YsOO6F7XYx0uKY0VtyfIpp%2F3nd4wVdyI%2BWLawtJkBUdpLzZUomL5CAhvqQoLI%2BTKwmp4lEZpZXfcAQxSvpEdniBwbM18pPV6LckaZA00esfKHXsYsk4jGsVgIseYgzuKCvJd%2BbTT0Pi5VYENgXVcr4OwOqUoQJe6GlhzhKed%2BTd9WB7PcL51LyI1f%2BAmxMlPjPL8SmYVjwFsqXMNlTmgbD6sM6wonltOafI98908AfUanjEMt80UctYoVEQ%2BYBQyWWs%2FgKVwQ13X49%2FHosz4pmDK67Zz64RqeTRHez%2F0FzGMNqYzYOLHAM1cxYGQxfUFbfCXDqs%2BSOX3jDWVwCzbiaXCRUnnflrKlGF6OhvGHJOy5Z3%2Bsgl62CwmOYdDNDORAL%2BfgIjXyaFCKwOXZpOX9Y1crAFBNnSQJwYdILfho8w9Rv0z4wqeiszQY6pgFmC7qRhY8LcXKxD84RsIS%2BVrC1dbo6XFvm0TL2R8BuSc6m2ST2YJbldMgMBw5te0qYCpMhB2IGY8eZLUfFWAUs39o76GAFCBtjeTBDt%2B7z12XrSOYM%2Fpjrkt%2FOlEXbR5AITM0NBAKkX0mjBJjI%2FZHdhXTnj6gerE75bO1ABKDLhiN9zeIRD5PhGB%2FpOZMcv5IiV6PpIGejcX2YtI%2FwJwS6RJ7EAVIP&X-Amz-Signature=595629e00e19b11619bf935767bac1bfbd29e8a80073cbc85a2a0f76d097e299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DRYP3BP%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T211722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCICj0IQkn4czCHjm57zzTx%2F2OILET3u0lXrHXCPLjM3QZAiEAsgVx55zjxIMHV%2Fi3iXOmBQVX5Crb%2BISUzoWDFRXSWDYqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEYVkOJEg4UWwEKEpircA%2FhbDuRUBucCZo6IpsN1Altbgn4G13hehALpQ90iV0uKiVpdosr73H66DrNOAOrR8JwMCX1m7CHR3cvLQdpSQVDx05WlySK8sUFl3z0K1NuNUhDsS3Ej%2FxqYiahGe8FxJ3%2B3SM45n6yUb%2F%2Fj%2BYSb0YETrYW1%2Bz50wlwkYKxye4C4427z4lV1kiu13I%2FBw0KIf6Hfg%2FF7fdJ6zLkPz07dj7Tfzc2XJOVXu84HDOE5dhZlqdXdnz38%2FqS05jxLYcG3ekiOrwVcv9BRafscWcoT%2FcgwQNHsN5c652%2FhjYaCmv04nnrVaYiBqm%2B6%2BuDLMAoNjZJ%2BqMAMGGnqvjHcIkoXhAa%2B3giIT1XY1i9JkZQ2dH79vUR1uhfDZ7mCh9Bo6CnCOq8RZPbBQI4YB5c%2BYkPipsNig2jwPwh68joZq0PhMY0iWAWpRmQsCweKBNwtuaxinvoPRkomQpcqpUCTG5s4GEcqffjjXB5JWVEZqECreYXhPkIXQvM8j0n7F3W75KFS8HjCprrtRIARI0Gc%2FiTwZ2NbqfSKKUK3PRP222x2jSNxVdI5vcBheh8CDUEOiBb1hh8HZ5b%2BF35YOSSKbJXL2iKNL676YaQRoET6zGwcWkts8d%2FEQNqdgBIdtQDyMKPorM0GOqUB26rZookVPnXag7J6t02YojYGIHY2yHqiXCtnpii3F%2FIbK%2BOUWRtruI%2FV0D%2Bw%2FKv8AbtZ4J5HMKgvb8togyPW%2BuPVqdiZPndTT%2Fq1VitZEjOP2AZeZW4dNaTiySvIapp1xNTr%2FkFUKupWBQTeRQWcZusnE%2FKwBkxFmtZnwspPL9%2BOpi3Hgq94hJNZphrvpua9JZYj6eH8wCi7lxciU0hIYvh83dZG&X-Amz-Signature=276e5c7809a0cb07709360998912a79d4d6b4b0f3433e32ad0a0d8d55645f47f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

