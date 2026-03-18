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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOLQEJ4K%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQDnI7DvGqc%2FhbwVFUeNNZ7nFmjuXWHnK3aI244F2U0NOQIgA%2FUuOg9G8RASlssRvnHpDYu3k1lI57FvSa3rzz6AgJ4q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDH4kkDP2qxuo3QF79CrcA%2BLd2YtxmFsUNRsTRUCefjB9LpVbGjv6DibMh%2FVH6Kh7eYYXh2jt1sIjvpkLR6n3l5xdjT2xRvzxT8aclG3NPGAX%2Fq2mchCC%2FD2cKDXmaXSR1CbHMPh90976yWKhPfQe%2F5SutWi66AkQu6JtRE%2BgczXYuf%2B6dcXdTnXW%2BTVkv1PStDylcIk7EMJBm1uGbqwQvQNgfrPkStT7WSGShCdaWxtOQB4wyNEACk3iuJJ8vYdJu5yMQTp%2F9ZhwCL8OeynwWwujpe%2FOOHIqQiYKLGuRp5g6Q4A5Hu%2BkDE%2BuwrQN5NfG4JhoateUQ5DbXA47Ytwp44%2FeMA%2F5gWf3xwrwEdrfrulDUxx%2FwgU3DDNR3kWca5Fi601ozKn4wuP7VHZvg24NTmwBzLAjWpiv5noxNe8WQ3kdtHj5bvIt9h%2Br5dYOmIl9GvTGy0MhqpWoH5xpmcvsOpkOA8v%2BsZF%2F%2Bn%2B%2BMUCVriZjDpbK9c1mjz0Re6bsqVbyp77r8XKdcEAlY4dqmsureH0P1iIsJWrEAd%2B56OgdIPpGotyx0W9ONixWv5e%2FuQCALGDzl1bjCUdjOny5k%2BVVlq0MPVl99trJaTr8XE5f043isIkWkFDbF2QeSpqH76Ryz9mhrUsFiMiWWvH3MOqy7M0GOqUB5zFIj%2FRQafhKG5%2BqAbLMMFcBN%2BtJeg%2Fo5dR784rCVnHUJk1X3EbYhvJHrXWfQGcHWBIhlvRnAZBAihMG6Wu1F53wieyvetSFH0Qc78XIiD72VDi%2BL8NtwAORTJ6A95pyr1G3ASQB4VGUioDNYHsrcd3g2HqZyBT3ZZrYBD1fVNzTpFymrCJ4HMRuncVMoQPOoY9Ex46bcKm1k0YWo8RZxitTbQod&X-Amz-Signature=24bc943f0052f8acd7c3f1e7aadac1050b60a95e316245ef2fe650cbc598fb16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOLQEJ4K%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQDnI7DvGqc%2FhbwVFUeNNZ7nFmjuXWHnK3aI244F2U0NOQIgA%2FUuOg9G8RASlssRvnHpDYu3k1lI57FvSa3rzz6AgJ4q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDH4kkDP2qxuo3QF79CrcA%2BLd2YtxmFsUNRsTRUCefjB9LpVbGjv6DibMh%2FVH6Kh7eYYXh2jt1sIjvpkLR6n3l5xdjT2xRvzxT8aclG3NPGAX%2Fq2mchCC%2FD2cKDXmaXSR1CbHMPh90976yWKhPfQe%2F5SutWi66AkQu6JtRE%2BgczXYuf%2B6dcXdTnXW%2BTVkv1PStDylcIk7EMJBm1uGbqwQvQNgfrPkStT7WSGShCdaWxtOQB4wyNEACk3iuJJ8vYdJu5yMQTp%2F9ZhwCL8OeynwWwujpe%2FOOHIqQiYKLGuRp5g6Q4A5Hu%2BkDE%2BuwrQN5NfG4JhoateUQ5DbXA47Ytwp44%2FeMA%2F5gWf3xwrwEdrfrulDUxx%2FwgU3DDNR3kWca5Fi601ozKn4wuP7VHZvg24NTmwBzLAjWpiv5noxNe8WQ3kdtHj5bvIt9h%2Br5dYOmIl9GvTGy0MhqpWoH5xpmcvsOpkOA8v%2BsZF%2F%2Bn%2B%2BMUCVriZjDpbK9c1mjz0Re6bsqVbyp77r8XKdcEAlY4dqmsureH0P1iIsJWrEAd%2B56OgdIPpGotyx0W9ONixWv5e%2FuQCALGDzl1bjCUdjOny5k%2BVVlq0MPVl99trJaTr8XE5f043isIkWkFDbF2QeSpqH76Ryz9mhrUsFiMiWWvH3MOqy7M0GOqUB5zFIj%2FRQafhKG5%2BqAbLMMFcBN%2BtJeg%2Fo5dR784rCVnHUJk1X3EbYhvJHrXWfQGcHWBIhlvRnAZBAihMG6Wu1F53wieyvetSFH0Qc78XIiD72VDi%2BL8NtwAORTJ6A95pyr1G3ASQB4VGUioDNYHsrcd3g2HqZyBT3ZZrYBD1fVNzTpFymrCJ4HMRuncVMoQPOoY9Ex46bcKm1k0YWo8RZxitTbQod&X-Amz-Signature=24bc943f0052f8acd7c3f1e7aadac1050b60a95e316245ef2fe650cbc598fb16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YY347WL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQD2IdOcUWqytWRzaivXuldr6wNQFXTECYZgqMuapDVLDQIhALM6s247nxN5EnUadfI57F8bc9L9ivIZKSQJpfprFT9KKv8DCA8QABoMNjM3NDIzMTgzODA1IgwdpJcibZAd8R9KBgoq3ANa3d2e3%2Ffq4czgjC8wJ6%2FubXSXyZkKnywxvU5aUuk0f6J4lQoj2msYpbXKSA3hrRfkU5FIVPtCNh%2F4BAGMNIoYczPTA8S6L1xDldferojicSTdCzv4mYMuoWJOlJDBFL4o6WkEO6g5d5qEPVjhEtdPtfCY4%2FYvQfQEhuATXA6cJiVG%2F9Ca9CX1LOMoI6Ex2iv2XItrlD%2BltQ60JhAkqgAfscf9hyNKmWJb%2BsiPNT2StINSulcgr2LiJf7yJbYOsUT3A8BNaiKupiaR%2BQH5c0VwnNxnU5KaTLAPUXvbI%2Fa5oYYNMYLwLdFUbP%2F%2FyPPn7mgKN84hF0F77eynYJ4ENoKgmTWxV3qAQLCtHxeY28BeMS65Qt0h3uXODKbKVio7orJpzvw2O0VmKR%2F1Yvc05jjLuqnE1XxwHPNyzj47z0FoL3DRVY2YEN%2FzJYicCiKf%2BJwhDwmHpKmNFyhrJF%2BBuacAzB%2FrAtDuwbFf5w6OC%2BEIfQbsVkJqDgkERVzEXbYggVEZEIUdzSp%2FumHPnNCuRDmT6nEw6%2BGewHuKXGOKOLoNxydFFErr4EOBbngHidA%2F%2BdDWGaaTgnBCbMMW1MsMdWA0qakgRpRTzZWHV1i9XpuVNVtvrWPuiP9EgXWK5zD0suzNBjqkAeLMaQR2a%2FKPVlZ1m3tQRmSLb4aNRXigDwwCK%2BLDC%2BszYJbAsu53%2BgCvTV7gqfbEarPY6ss7CZ7uAh7UVCE7Q%2BGBBVTdoLxXjGX5j4IS0TRi8SqxL3IIJ%2FbU8ILwd1nkr26Etdd%2FtRAakiUnr3BM3wcAPzmME7HLHHjygCj8fGh4ID34PrTdih97KKMN0y%2FuRP8aFb8VS4cmrxlZ7%2F5ym9yv8XBr&X-Amz-Signature=609180db1b70e9128d71d8093fc0d8d4b7a77d62bf0d4dc0deb89fdc6c2c6af5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLFK3MMB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIBMt7AkGzqV%2FPy3v9pD%2B%2BJqWkU1FwbqSizwb9mGPoT8wAiEA%2BC4%2Bv4pz7BSfHYZQvJZG4ZumnCtkLG0jhDvxHkyQY%2BYq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDMnCjDwcfcGrf2H0HyrcA3SwRIwpF8pnXOVPCfdFZodOaHOIHWohsnhiSE9j4yFIk9fAePUlwHTcDtdmdvM1%2FPRtlJny2UiqKN3yvhemSM%2BDyQVZXo%2B1mWM3kAHeoO6oaLZysMlom3NiuWXu4ftXWfBrGFPUd40RCr2Te55Voi2REjxCWQsx62SQ12teUPs4aSJkdEi6PC1T6dk9kDDCLt8mBGtuX%2FBCtQzQVpkZvZWKahg7QQIIGSmgx1a0bW22AwpGLbZlqmzPFyHHRBo9IilY9%2FxNIibDrATjEQakdgu%2BECSFHFsG7DC3mIwtOz09fxz5tmc9GeBWQXRHqrAtv6rwSHLAFpCTt8kECiXhhoVSIWU0N3T7cCkeQezUG04VxOZVKCWbU9EgPXeiMm4huisKHhgNZ2kcHY5bns4djguv4w2YKCe%2FVSkLEOgvrkUU6Yi5BoxOQg6MWLOyi7lVb%2F979AK8VLZ0uTwngO5uGtZP59UgLLfwyahm0Hv9aM9gnlE3XK%2FlqZCtCsNbnI3cR007xqhoDXk8EXJBes%2BB3dYrAgrYyOw7Nhd%2BIIQyyOD7zq2%2BwToHaDGaMlSOwv%2Bw0MIVmewgy2thGMAGB10jAWXQCMOpLB%2B4cZHyU2w6jTTvvcHoP9%2Bh%2BMPFLZvzMIi07M0GOqUBUvAkKDU4EVUiIBadvS2g39ib9IdDHguO48cH%2BW6KfF%2B6zqrl32Xbu%2FJXuCHCk3EG0fDqh9vtDp8xLsrDX2RZtSSxEyDJC1TqVq%2Bq6CRfsWd5YyPdNrSvXoRTySQKAGqc8CncZedDr1k39ApctRBQbuWcfrwTUxISic%2B5sKiOsk9HX3Wu%2FM8HsCpiyZXmG8GoMCnhNqRugFWu%2BCuHbLT66Rm9iO0W&X-Amz-Signature=ab3bae718df96ac6d0a4483f64e93e06f6ba758a59fa5a5540f386e3310cc2f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLFK3MMB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIBMt7AkGzqV%2FPy3v9pD%2B%2BJqWkU1FwbqSizwb9mGPoT8wAiEA%2BC4%2Bv4pz7BSfHYZQvJZG4ZumnCtkLG0jhDvxHkyQY%2BYq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDMnCjDwcfcGrf2H0HyrcA3SwRIwpF8pnXOVPCfdFZodOaHOIHWohsnhiSE9j4yFIk9fAePUlwHTcDtdmdvM1%2FPRtlJny2UiqKN3yvhemSM%2BDyQVZXo%2B1mWM3kAHeoO6oaLZysMlom3NiuWXu4ftXWfBrGFPUd40RCr2Te55Voi2REjxCWQsx62SQ12teUPs4aSJkdEi6PC1T6dk9kDDCLt8mBGtuX%2FBCtQzQVpkZvZWKahg7QQIIGSmgx1a0bW22AwpGLbZlqmzPFyHHRBo9IilY9%2FxNIibDrATjEQakdgu%2BECSFHFsG7DC3mIwtOz09fxz5tmc9GeBWQXRHqrAtv6rwSHLAFpCTt8kECiXhhoVSIWU0N3T7cCkeQezUG04VxOZVKCWbU9EgPXeiMm4huisKHhgNZ2kcHY5bns4djguv4w2YKCe%2FVSkLEOgvrkUU6Yi5BoxOQg6MWLOyi7lVb%2F979AK8VLZ0uTwngO5uGtZP59UgLLfwyahm0Hv9aM9gnlE3XK%2FlqZCtCsNbnI3cR007xqhoDXk8EXJBes%2BB3dYrAgrYyOw7Nhd%2BIIQyyOD7zq2%2BwToHaDGaMlSOwv%2Bw0MIVmewgy2thGMAGB10jAWXQCMOpLB%2B4cZHyU2w6jTTvvcHoP9%2Bh%2BMPFLZvzMIi07M0GOqUBUvAkKDU4EVUiIBadvS2g39ib9IdDHguO48cH%2BW6KfF%2B6zqrl32Xbu%2FJXuCHCk3EG0fDqh9vtDp8xLsrDX2RZtSSxEyDJC1TqVq%2Bq6CRfsWd5YyPdNrSvXoRTySQKAGqc8CncZedDr1k39ApctRBQbuWcfrwTUxISic%2B5sKiOsk9HX3Wu%2FM8HsCpiyZXmG8GoMCnhNqRugFWu%2BCuHbLT66Rm9iO0W&X-Amz-Signature=e55e03e79789860f9758c7edae13ed89322998b88c839e1f970775d2cb3440a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIGMPBDU%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIFGnc6IWL8T16hRsMzNjG6GZAte%2Fsr7Mv3RxwCwUz4%2FyAiEA%2BCfKoEeNNCZhNXIJPFsT0Y8VAv5IkrX%2B1bfbl2jjPesq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDB9%2Bj4b6cacrU4H2cSrcAyw3riTb5wdCm0GSPoLqepZZPL2sj1iLIYDNKKX7L5C1Al8CidvmegpvDn7L8u9t3acLox8tudYZLeON714y0Qg9M%2BjJwMfmHIp56r5SiewhltDhohCgGxMAVKkU0%2Fw2fyqLCrAyk42ZFqzWxzqnNnLB7VKWfw4BXignpMQ6ZU1vT3Av6HKSLR%2BMffCy6iJYVlbm7SKNcPKXkKM1OpOe%2BGY%2Fmld9DmkNfHYNPaixpQ4JzF19YgRiQUtUG7yYGJ4r3nL2W8MDd7AbWkBEN5p8uWYW5CvDKslcM%2F8yT1hJOzkWZB5DdQ3smSSFojirXna5QMdhNzdaQYOKy8PImmwUYoTboZzU23px%2BHiVdkMeYTjUmMz7LIHGjJGdOAhaIOViCyBgf1mAKCB8MFogOZHIXKbETxrf194oqwz84B592%2FbJkZFdqbCj%2Fg7gOB6I%2BbHzJkK9GwkqYyavWgPw2ISjAWh1e%2FsFOOX3Ejj2i4OJzvJFHAxZC9K14TD7P46aYrxaMO4Zse%2FRlDUZi%2BdGGVU9bek73KZWzskKJeYnmdhwZbw46JtkkDSoaraGPUZIDLK2%2FCh8NqZPCdeJlVGJNY3gmAHEK7OLj4ZAduCSxwXta5A%2BFL0eePUq%2FDHXVOpsMLSz7M0GOqUBaZJ8lBlVKTLZRd%2BClsxqQyu5laOmr4Cs1iW%2BYQXWJE44OLzkGFHCjCiD7HwbIBEhRqewUZZIwyTQgN0lfXcfE7o4j8P4MoHOudlIdpxqLkwg%2FZ4hVEImVAzEgIdZttoIvY%2FImt89C5QJgtupLWoLFhN%2B6pCd%2B4f41Oe1dHE82uqkLwJL7Yit7%2FzN5asFim9GsrFzP2Mjhbim1QSO1mU1%2BWxFYCdD&X-Amz-Signature=a06410208a25663e64cc8af4157149e1c16b8da7003c9d347f1df506a31c38e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7MLVEF2%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIDcNZPDbAVDgWBYJ8SdHU6eQDP28ciq5noTUK7P2PBnDAiA2HsT1SCUOU610C118TXv2pdIs7rcE5c3RN%2BNqjd%2F7fCr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMIkv6XE%2FXjFBjrF4OKtwDvDW%2B3%2FwkqF66aSKE0J27EKSGKkF4eJzWnTfE1s3acu0TMjT4gYCcfU%2BWG2sAQ7Wunoe47K5XmtvkQ5322Z4ueTtxd04zwm19GWpNCx6qI4o%2F1SMeXI88qvi3OiTaPfsdmNpoWFlySqFgqzBgNc3VDbwBzdjmIs3z41pLoCfEX6CcLzZckHkF4WZVcvjoB%2F%2Fl5sVkWBtDWZT6Mka7OgeyDifxIyhdJJtznJBsI6hPAsRHRBdSGn7dNwXpdcfnq34is0fwRYf%2BrkYle5d%2F7fF1Ah7A3w%2FxWmUOiwr0PQW0pjA7Cap%2BxrEESBK9QGOZL%2BnByj7E3hI5AmfCdBHJyoGHwsN64S0%2FnNl%2FCsZco%2FCmdthkiZ%2Brqv7L9W4rAX9i4F%2F4mszwM8lwaHqjf86sd2tVVFCT4B%2FP5HwNVZudEaXYQMafyHKfIuj%2FICL9Lo20ido4pvUafGBb4OupaywfpFEeitjMrnGr4F0ZRqLRMTTefYwmvzvTDAlR5N9BCeEqZlAHtmnGvm2Nm7Eq2cgIeuGjCMHZfdwpkRcQ55rPRcReLrdtD8ylcO9etP8Rm18pGCORp4ieQ7knkm77k7RzykD6eS3jG8uvkJDkU2rRDr%2BfIadxPlKzYrsabPFaeoEwqrPszQY6pgGMwPeM039KUjseIPVRgdHz5wUFFSJRx0TyFmopj91CFIwckghCpE3pFkwO0cZsKk2bui3jfI0rEL7Z0tSf5ysoiH11qu%2F1CX0pbejM%2BBqBQSuWQMfJq3p0Q%2FycQrHqNivcfvAGMVW0VrAV9vBrTFT4mu6woWOyXH3Pn6IZaBUKjoETSklRzG8CWlkRGrwyFbeYdcIC8Yvlehcr4utR%2BaBRuMNqahek&X-Amz-Signature=ab16e28c4684e1162efc6886f77ea79d44a320fb3809216bc46bb9f46dede890&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652HQSFEO%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIBJBJ6UuUm%2BzHpr1VL3kvIhO32hH%2FgzZjlUFzc46Utx6AiEA%2Br6I9gZXuntteGMekl6Cm3H0sQA3Ni0Pi6qk24VO1rYq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDMm2xqFR2J7bzdH7PyrcA%2BhmCK1jhXprfPbtuWrnfMrqwC%2B9pjWQCpYw3C%2BQdwJ2g6GTMlcPa2DWCXURVFRG4My7jP1WUD6YAX%2B9suyYiyyfSTY4t2fIsRTr50vWE%2B5lBJdXeMm9oUxQzLYhQggaRyVEj39tzZXWI%2FSLlndsyNA%2BE72N%2FEOW76bDPhOuv0ACT3RazfuEZaCvohrYYB%2B7aI9Zj%2BdlQz6eablQIAE3Hs4%2F2tkRK%2BhNlY%2BGfifF9wRYZ3wgHO9FEfxMAvVB4skbzqMdFpO8ek0sJ2rVf4owSAawKOcrPPbR24v8Btn4Mr5jTeAuKC%2FWzlTFOpeIyXt5vpMZi2fWWYvr218YFuIMmIR40ygUu38U5%2B0HTNpIuIWiQA8gcIxicdPAt0rVodPTHElg9CTUtOYHBPEuejfcB1gK68w6ijQ3FYqUigw4upw6JwSHxmIbTifYq3KxVGV7sGLHxDjhaZHtEtlg3sjTWXJewNJt5Y6Pb2bZqvlkYn8oTF7FVuDTnP1Afq1S3xjok964brDS2VJsaHQyMHL6renxtOOCsbFBAHryPZtt4Mr6A%2BCj2%2F3xIZjC6PNUmy0Ko45BToA3OrmBq%2FL2oUIdRG8gkq4u9SnRKKFN2408t1QgdCyPZnTPhKBwrDn6MNCy7M0GOqUBaIsr8mCTml5ko0SUhMBIu0JeOyBUB49lNs09fnGKQv3mYmklTy0KBflzHmg%2FeMLruy%2FhUFWB6hkkZPi4U9pZfleoA0oNqcox5qYzo1Dww03cfslkzQEZHrjXQ9%2FV%2BANUNhjbXhBn5baBHExUF0OnoPC9%2FeQ1t6SStKHkwSjgWMWQM1jfffvyZluUfDmOJ9VwrYBHmYw0zDFQHu2uopujl4jXStQ5&X-Amz-Signature=a4041ef6be94a638fdc03fcd2a642fcf168680966c9144df59750921832a9270&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDDSKZS2%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCL0TYe5xGpwhcEQ4vkUTF9u0eB%2FnYAVrcAOaVsAeEUxAIgdK5veU1%2BwHl9uPQaxO9yvKVxGlns0fgDSsWY3PL6Xpoq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDF7jv9V%2BLWekF8vPiCrcA0kptkEJPgdCdZ3P0wuOx3OOUMDlV%2F%2FpuQnAPJiJ6Jz9MXCFZJSm32pJT8N3FycEGrnz04%2BRtLis0RW8t5qoajU0Br7NG%2BEO10VT067yJWwLq0U4VhCrd18uqhWSYbEXLir2ARVxC1C6aerf2cKbI%2B6rbXIjs%2BCA2a5nZAZ7SuwDHkbnrB2wSf1wKVjjeE7QcJWmDqeOKaWXPlJdFivYkja1MHaksXvBiBzlBVgV9feihwFj8LxU6QXbZ0YPToRP8YB67YfHiZ04rltb%2B%2BOkE10MkUkQxud3paYmxypgDZlvlLdQE2tRUcTtQXhgRpVJVCDNr5DniGM4936OH1VbUfzo8A2xNyUGXGiAs3Eg6kbViqzbWjvbSmRWbJQTfdkRzq18oovncy5%2FlXafXr8DJehDV25sF6%2F2EKcPLQpVAGE6r5u58PqnuQKNAUvvsI3XSTkksX4oQUhsnAPAA2rwbIfwgyFVTckcSR0HZjU6YbaOBw9w1sFxiV5puZuWxMw0FSmPpXlW3XdH6Q%2Fb%2FAC7hm8EWw6QV9Fa3CH9hLfAAvQ1zuujSrftguJ6WdlTPvxsiOMXD9sWXY%2BHHo8SNRuufw4CEqLFX6okuZFclCryqF82u2tALYXdsoxUXyepMPey7M0GOqUByLcuqSxo2G2RFLoZ87M9dQ0QbTtN5Ct3FIn987c%2BvN5W3g1WedlxJvL9AzY4XdHmHW7fN2n4zAtV04o7aZsiVab6NKmxu%2B31yS84oMRIvIjEu9xCywEhWF0fFEFAwk5BjzYnCjWmf42dxASuwhq9JySLEEXVmJg6PEi%2BCaHpAcu3n8OEKbnKwv%2FjESzrQeqfpUOv0l6Ef0djvFb5AsUSGZ0hJRtx&X-Amz-Signature=9b8d2eed313dd7dce615d3b944d53fa9899b93e1881ad939e0d2295d7e055063&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDDSKZS2%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCL0TYe5xGpwhcEQ4vkUTF9u0eB%2FnYAVrcAOaVsAeEUxAIgdK5veU1%2BwHl9uPQaxO9yvKVxGlns0fgDSsWY3PL6Xpoq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDF7jv9V%2BLWekF8vPiCrcA0kptkEJPgdCdZ3P0wuOx3OOUMDlV%2F%2FpuQnAPJiJ6Jz9MXCFZJSm32pJT8N3FycEGrnz04%2BRtLis0RW8t5qoajU0Br7NG%2BEO10VT067yJWwLq0U4VhCrd18uqhWSYbEXLir2ARVxC1C6aerf2cKbI%2B6rbXIjs%2BCA2a5nZAZ7SuwDHkbnrB2wSf1wKVjjeE7QcJWmDqeOKaWXPlJdFivYkja1MHaksXvBiBzlBVgV9feihwFj8LxU6QXbZ0YPToRP8YB67YfHiZ04rltb%2B%2BOkE10MkUkQxud3paYmxypgDZlvlLdQE2tRUcTtQXhgRpVJVCDNr5DniGM4936OH1VbUfzo8A2xNyUGXGiAs3Eg6kbViqzbWjvbSmRWbJQTfdkRzq18oovncy5%2FlXafXr8DJehDV25sF6%2F2EKcPLQpVAGE6r5u58PqnuQKNAUvvsI3XSTkksX4oQUhsnAPAA2rwbIfwgyFVTckcSR0HZjU6YbaOBw9w1sFxiV5puZuWxMw0FSmPpXlW3XdH6Q%2Fb%2FAC7hm8EWw6QV9Fa3CH9hLfAAvQ1zuujSrftguJ6WdlTPvxsiOMXD9sWXY%2BHHo8SNRuufw4CEqLFX6okuZFclCryqF82u2tALYXdsoxUXyepMPey7M0GOqUByLcuqSxo2G2RFLoZ87M9dQ0QbTtN5Ct3FIn987c%2BvN5W3g1WedlxJvL9AzY4XdHmHW7fN2n4zAtV04o7aZsiVab6NKmxu%2B31yS84oMRIvIjEu9xCywEhWF0fFEFAwk5BjzYnCjWmf42dxASuwhq9JySLEEXVmJg6PEi%2BCaHpAcu3n8OEKbnKwv%2FjESzrQeqfpUOv0l6Ef0djvFb5AsUSGZ0hJRtx&X-Amz-Signature=944993bd4215e27c118166500e3bf67031280cdb611c847ba9de92c986480aba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIJAYGFB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIFz0AnBQnMeZbrtTwQHpb3ab0Nc2F3e9iuvBjzwXzeZiAiEA%2FF5cOwnIFXTg1z%2B9uU%2B2lQmn1wuWNBqmgEXdSiY8q3Eq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDLzH1%2Fqbt%2B4gElFnhCrcA9wuDDCVKDpolFHsqaj01ks6qIafrJ4KEp96lNJgRXF6qh9pC%2Fos7z1HNJCxxuXJSCc%2BlRoKqqfvtqrcVQQcO8D99wy%2BVXFqwj54%2FlAx4R8SuXddHc5flAPruDZrqDRiDtL6xXSGHsRkl2Ahmp8eZ6smAu7%2FY0ZET3Eoo7agH26cxu6qfb1NXFjB7AN4%2BK92k%2FgIcfZXvxC7WCdrvL3j6%2FmIm9mIBu2AWeEJJFqzImvzQGYwzJ4YAzI0wdSuXWxaRFsjFJ817FPUM6P9nea4iGP9wN1N%2F9wT1ZN%2FeP5zMsvxi2%2BYFaedegsTvCqW8Pep%2B4PMWwqUC7A%2Fsre6WdwkVQZBJNui9Jc8YNWpMJvUYvVMNnGr6zu4ZflXUZ%2Fp5EIvEpei8g0U1ziNe5X2BXnLEd%2FGn8Rsj%2Fn3HeTPB6cOPrV9vNhF02wGmIIvSY%2Fd9EHjqChUiIQRHgbMU7enEy3ZGB0LOgBGmEx1PF9WdKX0VVoNZqdsnKtu%2BG%2Fxm1mLjhyG5NuX%2Bin25rVaThMNy24zXOnw8DGd61YL3inhB1RUN0N88uoIYOC893ZrHNtqKDlzyRmoo2T4yUdS8ZsHrY%2BaUTK4Hc0V%2BRsVGjO7Y%2BF%2BUQuFRD7kRHn5OhT9mE8oMOez7M0GOqUBaRzfQ3GngU2GSnlx0gNF7mRfUZqNYlNwcACVp%2Bm%2BrKoK4t5JbvviW%2FxE2eMTPZyvUYA9hcJ82lF%2FB23%2BBamA0k6usRzxAncttsytmH%2FVOdSlLEyevYZc5RLUvvNT%2FU2XTcOSdnaUlKU%2BkkB2Hz8dIje9pHLUAeuYOMkyGZe0jlfMpGWCwfm0JVuPNFeHZRM8zg2KlRqwT96s4%2FHbAO2urZ%2FgtCV7&X-Amz-Signature=895081154b6fa795b5ff624b96e3818e7c20efd417739c07c1b42a8d64e9b38f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TLRHCKG%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCICgeI2TWR5EIWbflRUZbyT94ui5l6KLgJfvZca8sZriKAiEAr6JzFaeVyuz8WvfFNytw7cMCnM5ljwXmLnBsyi4ElCsq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDBAI9cUmMH1saIneZircA6D%2Bn2n8LqY%2BHvMZ4caPowq4GXer6aFzZwZXQTAycZr0drXt0BGfja%2BVs0dsauenV23Kqeianik8Ccz%2BZEngPDfT0Lzujbc33PsvcYLXFe2MK5YJg97DaH%2FN5ixGoCfccW%2FeKldVhJKT%2B8DOc4nwWBUirl%2BsCfLbCvlsZA4fiuguGiyfcsEHLyIJi1wqcai3rJcaAOr%2BD5ZM9rUEWBWY2vkB%2FqcJR2u%2FTgHQpbXVDiKUfgipU%2BwkiFia2VtQ5X3nob6eqYXRyI1Ri65KjN8tCiMe0QWVtGb1ce1wq4WNK2bAZtHiDxxahqPD2m1R7gCPGy3%2B%2Bm7JV2PkpeVc9WZHS3KdV0ks2osWyPKbtQwxwcMhbeKcgndfxm6Dl8TOClaRJyewjDcwXWtaMr5%2F9FV9THNefhiKkR3hTUv535BQuk%2B6RHKz1zFyH5QcJpQHEcgauXTjF%2Fox9RvFPdhe2%2BfY%2B9TaWO2CrwXr43SpO7HtWUSTVYGZnq2XHZrRhWefhAGPldbGfM1x1QZGqo%2F7iMW4ZvUYJ%2BgS8eLUKWqrFYrjDpfPOR3A%2FcaFSB65MlYFvs0XtPywpr%2FR2M2p7DB7WGywQzI2ofbD1Q6KgXiA56mooJAZ67TKAEQT5hf51XtLMNKz7M0GOqUBF1tuctnsqq6jc1CnAB8loRZv70bt5pfK9GSXw6UfO0EvT4TtIHy%2BxWkin8EF5UNJBT7UmoeyrYFqoXyGRUL2sAylNKBqFLXRnpNK8Kn333QZhQAOjRm6CcmlCZh5aNLexYTDbCPumHOs5mTbiOb%2FioeSJZ5y9y3pujQmmTyB%2FN56XsPcX2ImF2iVoZaiJ8ePWTARX%2BOGQrnhYmyZW%2FgH2UTBkiw5&X-Amz-Signature=e6d1891c839be75bc57c947d3b653d2f2d6f132c50e04c9716520f9d0fa2f1ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TLRHCKG%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCICgeI2TWR5EIWbflRUZbyT94ui5l6KLgJfvZca8sZriKAiEAr6JzFaeVyuz8WvfFNytw7cMCnM5ljwXmLnBsyi4ElCsq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDBAI9cUmMH1saIneZircA6D%2Bn2n8LqY%2BHvMZ4caPowq4GXer6aFzZwZXQTAycZr0drXt0BGfja%2BVs0dsauenV23Kqeianik8Ccz%2BZEngPDfT0Lzujbc33PsvcYLXFe2MK5YJg97DaH%2FN5ixGoCfccW%2FeKldVhJKT%2B8DOc4nwWBUirl%2BsCfLbCvlsZA4fiuguGiyfcsEHLyIJi1wqcai3rJcaAOr%2BD5ZM9rUEWBWY2vkB%2FqcJR2u%2FTgHQpbXVDiKUfgipU%2BwkiFia2VtQ5X3nob6eqYXRyI1Ri65KjN8tCiMe0QWVtGb1ce1wq4WNK2bAZtHiDxxahqPD2m1R7gCPGy3%2B%2Bm7JV2PkpeVc9WZHS3KdV0ks2osWyPKbtQwxwcMhbeKcgndfxm6Dl8TOClaRJyewjDcwXWtaMr5%2F9FV9THNefhiKkR3hTUv535BQuk%2B6RHKz1zFyH5QcJpQHEcgauXTjF%2Fox9RvFPdhe2%2BfY%2B9TaWO2CrwXr43SpO7HtWUSTVYGZnq2XHZrRhWefhAGPldbGfM1x1QZGqo%2F7iMW4ZvUYJ%2BgS8eLUKWqrFYrjDpfPOR3A%2FcaFSB65MlYFvs0XtPywpr%2FR2M2p7DB7WGywQzI2ofbD1Q6KgXiA56mooJAZ67TKAEQT5hf51XtLMNKz7M0GOqUBF1tuctnsqq6jc1CnAB8loRZv70bt5pfK9GSXw6UfO0EvT4TtIHy%2BxWkin8EF5UNJBT7UmoeyrYFqoXyGRUL2sAylNKBqFLXRnpNK8Kn333QZhQAOjRm6CcmlCZh5aNLexYTDbCPumHOs5mTbiOb%2FioeSJZ5y9y3pujQmmTyB%2FN56XsPcX2ImF2iVoZaiJ8ePWTARX%2BOGQrnhYmyZW%2FgH2UTBkiw5&X-Amz-Signature=e6d1891c839be75bc57c947d3b653d2f2d6f132c50e04c9716520f9d0fa2f1ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EIQU7VQ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T221937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIHwWaPCGm4tHiHcdPmlxZNG10EJqlQhBkRA%2Flq7RyHLwAiBQbuBw21HN3sh%2BZiGsYXrshwIYHdfngOYQpqKCe98qRyr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMbq8QjERs5dtyW6E9KtwDkB5OU%2FMd9kn9xpMxP6y2SMh1K3vsfT5wU2ILHE10PNBlP%2F3iNaOoBeI43PhRlr9%2B3LYZU3kLU3StmzB4id7dAe486YrrWgYxObzQXugEJgYou2qaH4haxygTN1513QTHnJ1Dir7Yh3Cifx5wunLmQ17jQShQnxWhjQZXy0zGpB%2BIpzbMw6UVOoyVSfSrYkstIe7Bi4Ordff1j8FQbFyQGZeMlC6r1baopnmXM7o0PgXmR9xW07sftcctbCTFVJLQSWHN0IuTbg9uh4U9k5W4z%2FeCAO2iXCn3e4Ev8lMf8ps4VWtEoOpEWManvUknGjrPqZLWzWE7TGoEyFvPJq2LXIDrG7I1evt19YX4sSQccHEgdKpbbiLm28M8ZRIUV8bIXnoJMVLN7Bel307VwWa1DXsy2VhlJkS0CoYi6azkuceA4n5NFFxe93XT3tGwnNriLUTH%2B8FqMUyW6%2BLX8CE3079WvyfBHVREjHWw%2FXs1OmUCtNg8M8AYNKoTHsxmAOJDALJojbD3g%2Ba38fZhR9bgkhRQVwyPypeOG%2Bp7VnIz2cEA51kqSD4o10dwpTP6MbdtapR6nk1bNeVP1yeYbPyXgvb5bCq0S%2BqOozHvr6huUkJpx2ZH6U7hFoGMDGYwirTszQY6pgESNGKAa3nGZ4OzINti4YDFCNjx10Tlx5A88kzeSzQfbW8YWlZcQfIfGUQ2srwerEvxloft1e72RtVWkiyvm060oDnz92f04bXQOa8Fdn5YEOCZRcZzcGNGO%2FZNdE8A2HnWDi7zWyL3YHPvoN3vGpJv31dmbu6NC9AWI%2BDIw4ZsP9A6NrLCYNC29MgehO30cHhbQp72PUAIaJ%2Fh5ng63cQx0810JHX9&X-Amz-Signature=1e8f8cade1d2c48f26de973689d53d279095c1343b7eee26e0174dac5af2fc7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

