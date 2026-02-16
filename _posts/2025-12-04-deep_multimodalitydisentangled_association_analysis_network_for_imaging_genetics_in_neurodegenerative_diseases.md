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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TS23DKUA%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQDf7P2niWYZ2gF9XZuEAslDO6blWzlzhDquHv%2FuSWbwSAIgUMTlQSarImX820xU4eJDHYYPkMi1Y5RDNIjc78GZJiYq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDDMBSB6lQMV4woCbxCrcA7vRiC9FiQSJ3wBkfT7aquoiW8E5opvcD8V0CBjv87MQ0Z6a%2BSlBdu2zuzDFXvyYqt71x8q4KoFlkpALmc3vygn%2FXRH8bp6waULViq00DSa8dB8wmevEw0xEGsY%2FN3hB%2Biht3uiOSNeaFJS%2FQSEAdxYHIxbxiZP7m4IiFFfHhi%2BL9gi2hokXrvRRArvCJtnuwlSfMYU3jWWqPO5xj7RrsyOSHPUAbVKmOhonNBDpgOXDfS07zdrruJw0COc9%2Bi6t86sW5FtJAL1jhyT9NfAgpCUxJy8VpRyaGAnYKTX7dZo7lyAmrN3aqPJcVejTKSrP9RAS6uOAVCGehSBVjE7RvLcUGNhisy00QrqZLUf7aoLnbfJNd%2FiRAC%2FuZNIUWmuPk5XiDDyFEbp%2FHxp%2Fpnl2FzgMWPixHAe1PHrvGdEEodiEosm5iQZUDfYv67ikcJLCFs1bjFgT8gKMIA8eJrLfxNVEnFMeJQYGMmtDV8%2FOtqg8S81ubZ4XU7PUTIIrEyhCHlOG4ArUkMURtOQ0TQ440ErAx4VGwZF0iFsbIsVbaD5aGpgOBcqgf5DCDLzpYCs%2BsbgRz7%2BlQ7t9ERgOhzGokl6X8L69Y4i2r5Kvf1RKMeQ0g7ui1YmcvI4KO%2BpMMOC1zswGOqUBTLMDLbmKpPXaShmNlO7zYMUpELsS1GDHCXlpQXWLsAOIZ6aAPA6YXG7XN0SMcuF1%2FJy8u5KSFZPwHPhynJZAqCrujY0oIl4fxeDXyFnBG6oBtVy1E0LJTHaF9TyNyglq08fQeOxsUhL8QhqcUPazVOcNEmuygeJ8QSFh0zZgQJz%2Bpoarhs5UFad0ZDNJ4lzc679sq3BanEoAEMDpQ5%2F5xXwz98lL&X-Amz-Signature=e0ae33fe083aab70b64f9ce665490f54625d03b95f3416a3abfe1442cb522439&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TS23DKUA%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQDf7P2niWYZ2gF9XZuEAslDO6blWzlzhDquHv%2FuSWbwSAIgUMTlQSarImX820xU4eJDHYYPkMi1Y5RDNIjc78GZJiYq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDDMBSB6lQMV4woCbxCrcA7vRiC9FiQSJ3wBkfT7aquoiW8E5opvcD8V0CBjv87MQ0Z6a%2BSlBdu2zuzDFXvyYqt71x8q4KoFlkpALmc3vygn%2FXRH8bp6waULViq00DSa8dB8wmevEw0xEGsY%2FN3hB%2Biht3uiOSNeaFJS%2FQSEAdxYHIxbxiZP7m4IiFFfHhi%2BL9gi2hokXrvRRArvCJtnuwlSfMYU3jWWqPO5xj7RrsyOSHPUAbVKmOhonNBDpgOXDfS07zdrruJw0COc9%2Bi6t86sW5FtJAL1jhyT9NfAgpCUxJy8VpRyaGAnYKTX7dZo7lyAmrN3aqPJcVejTKSrP9RAS6uOAVCGehSBVjE7RvLcUGNhisy00QrqZLUf7aoLnbfJNd%2FiRAC%2FuZNIUWmuPk5XiDDyFEbp%2FHxp%2Fpnl2FzgMWPixHAe1PHrvGdEEodiEosm5iQZUDfYv67ikcJLCFs1bjFgT8gKMIA8eJrLfxNVEnFMeJQYGMmtDV8%2FOtqg8S81ubZ4XU7PUTIIrEyhCHlOG4ArUkMURtOQ0TQ440ErAx4VGwZF0iFsbIsVbaD5aGpgOBcqgf5DCDLzpYCs%2BsbgRz7%2BlQ7t9ERgOhzGokl6X8L69Y4i2r5Kvf1RKMeQ0g7ui1YmcvI4KO%2BpMMOC1zswGOqUBTLMDLbmKpPXaShmNlO7zYMUpELsS1GDHCXlpQXWLsAOIZ6aAPA6YXG7XN0SMcuF1%2FJy8u5KSFZPwHPhynJZAqCrujY0oIl4fxeDXyFnBG6oBtVy1E0LJTHaF9TyNyglq08fQeOxsUhL8QhqcUPazVOcNEmuygeJ8QSFh0zZgQJz%2Bpoarhs5UFad0ZDNJ4lzc679sq3BanEoAEMDpQ5%2F5xXwz98lL&X-Amz-Signature=e0ae33fe083aab70b64f9ce665490f54625d03b95f3416a3abfe1442cb522439&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663R5FJ5WL%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIBCkgOne0BdAPGoJRmaGRiDfd6XindlbX%2FoQUr4BP1VKAiEAuQSAofY8Fd48ijT%2BfzNS0F4cbwEg46BD4gD3HUbB3CEq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDFKGdOqvh0mDzlzztyrcA1HbTw8R%2FWlLCWP387aO4KVzwBLWhHEmHB9zFl%2FKE1T3VP2FLkDayPk1cKMpyJ0xb5HfLV1DA9xmqNuc%2F8NWteSIbMuzPoFx9%2F5%2FGOkxOEEhgGC%2BJpwZzOGVt1XAtxR7zoWTE%2BWxw27TFmU755uNBU9Clg4sLUlSIKhmXVW%2BQCdAnJLVhwkUIfabk1KQB5%2Fwv6w7Ide5MixWiS5IU3D6y79xPPegdV0vAkBLGgqIRtndhCdp3gHwYRMEbP0GVmzXlRuPzaM%2BBhUE0HO8cF9aEr1OgsZNwQORqKI5gOLO1Zd4WoTJtPINFigZ52Tz%2FJ94Vpyo9Hhd8m0HFAb5Ysdr%2F9ZjL3pEKpqocDGiid4%2B1BVWq9IhrfF5N1%2BhkfjE35X%2B9Zu5VmUMBpJkHTOpTIw%2FRSK%2BIwcW6XooNLg9b0kzCRGl490gyRE0hh8zSqrEXZMRMd%2FN5p0ujmgbN%2Bsi%2FJWFT4a4eVEyf0HBej9rsxxtlaNQSBzJs9qRa%2BH0oEONcHlTSX%2Bh6GNYOTdraatvS32zvwt3VAGhKOpGjZGqrVgG27dk1S2gMzYmA4ewEJw89AhDZZoejYenTKuvsICWBUpp0wYvHbq7d1Dj%2BbEKfwb2F9oAtDOSN%2FKuq3mI74cXML62zswGOqUB%2FldzXrbT0Z8QGMr6k0IqYLwJMgHmguQ8OP5eSnUDzF5PARMuhvz2iPJ3FstIA1oXxzBNrytBjpuT6H6%2B%2Bl7fSy5PDVxa8rZxr%2BE5jPy6Cs1V7cTQSNX0Umd%2BKWmiPA7MxsuVOAviKrlGsNj29w2qqu%2BtGmnC2WL8PqD84P3o0aq5Ky%2BgjH8tQg5t3D4NQSCx%2BoLhwnUMlj0IHILg4eib8cAu88z8&X-Amz-Signature=6066ade756a7374aeda8e88d88e5dc330e0f4c1c079ee2fbacaa734ea0c56b15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VIZLWLU%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIBC4pJrrqtmSZuzNjqPoUwSdE0HKx%2FZH%2BK0EMa3HbXwgAiBIZTc8tTy2JnXonpA3CwLyY1o5KqWsoj0XqBaTq6GlHyr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIM5ghwto8kwGqPqwaNKtwDTp1w5UfH7mORKxyVXXA50B9zNn6nLI1fJMX7oAt4DDubm%2F1Iz4Y6eU7h5%2FvyQtKucz9cIRe32Jzvduwjodn9UaAXnoVicXnUt%2BIvESbsvOIUtmOtTSXuQCYJr%2BbOt61u4lLJUagv0M4u1kYzQFOrEk%2F62%2FPHNZLEa%2F5xiP1KzabZ34GZmv15uDUCHrpKqbZRvKecr9agYzEEiyEWlGonZ4NMGHWfT2HbtRWJha11sTI%2FvK1IcHic%2B0tr4zGRpPSdkDwyUTZCsFnIfA1fBMmtJBgfH93N27GYcX6J%2FAuG5V9GewY1Dpp9%2Fyk2oVEGFyKjKkd%2FNem8%2BNR4m%2BaAZLAyciSgQgpIi4SMHJAYCNICg21gVx5IMcjRms83tQD4esnQTTEEmBciFuPe3r0bVqeOsl3fbmzqqz3%2FwA5x6QhXnYV%2FbcKk3p2AtKb%2BQA3%2FNcNk27a725rwHDK7y64bzvvVjCivzTyyY5mKRL0QDp1kkssj06Rki%2FhrabDKd2ku5vkco0E8451%2Fd9YQ5sYudh3oRQmca2JSuCJgiNSdsJ4nOQH8amiFPkx0j2YwiXqA0%2BLJ7MvNpcmLLpljIL7fGSRj0iSTXHOuaaiLivEmEVocLKpSZHM1p28BG2BlUQ0wnrbOzAY6pgFndzDYq7b3KX9k%2FvBn4c2TRH66VizpfQLyRXyxHC1kYeBrOg5WHZ%2BCfE%2FRMqCzaXXd0WUmSCJtqCE0H131oKHcMbDYX9PamLGUHyQR%2BVvdVudumBD7u96ahw7M5slwdDl%2Fz7PvRZFa7hJGin%2Fhgq3sxfbJGH968iY2m7%2BRK8ETNmD%2BoerNpkwx5%2FbDZHyCAJSHSD0RIPGFTRZjdXubmdP2mCOb2dyZ&X-Amz-Signature=83e6caf7553072c3679397b78d75aea07c12ad0e2ceac7c2a2f556577e54c673&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VIZLWLU%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIBC4pJrrqtmSZuzNjqPoUwSdE0HKx%2FZH%2BK0EMa3HbXwgAiBIZTc8tTy2JnXonpA3CwLyY1o5KqWsoj0XqBaTq6GlHyr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIM5ghwto8kwGqPqwaNKtwDTp1w5UfH7mORKxyVXXA50B9zNn6nLI1fJMX7oAt4DDubm%2F1Iz4Y6eU7h5%2FvyQtKucz9cIRe32Jzvduwjodn9UaAXnoVicXnUt%2BIvESbsvOIUtmOtTSXuQCYJr%2BbOt61u4lLJUagv0M4u1kYzQFOrEk%2F62%2FPHNZLEa%2F5xiP1KzabZ34GZmv15uDUCHrpKqbZRvKecr9agYzEEiyEWlGonZ4NMGHWfT2HbtRWJha11sTI%2FvK1IcHic%2B0tr4zGRpPSdkDwyUTZCsFnIfA1fBMmtJBgfH93N27GYcX6J%2FAuG5V9GewY1Dpp9%2Fyk2oVEGFyKjKkd%2FNem8%2BNR4m%2BaAZLAyciSgQgpIi4SMHJAYCNICg21gVx5IMcjRms83tQD4esnQTTEEmBciFuPe3r0bVqeOsl3fbmzqqz3%2FwA5x6QhXnYV%2FbcKk3p2AtKb%2BQA3%2FNcNk27a725rwHDK7y64bzvvVjCivzTyyY5mKRL0QDp1kkssj06Rki%2FhrabDKd2ku5vkco0E8451%2Fd9YQ5sYudh3oRQmca2JSuCJgiNSdsJ4nOQH8amiFPkx0j2YwiXqA0%2BLJ7MvNpcmLLpljIL7fGSRj0iSTXHOuaaiLivEmEVocLKpSZHM1p28BG2BlUQ0wnrbOzAY6pgFndzDYq7b3KX9k%2FvBn4c2TRH66VizpfQLyRXyxHC1kYeBrOg5WHZ%2BCfE%2FRMqCzaXXd0WUmSCJtqCE0H131oKHcMbDYX9PamLGUHyQR%2BVvdVudumBD7u96ahw7M5slwdDl%2Fz7PvRZFa7hJGin%2Fhgq3sxfbJGH968iY2m7%2BRK8ETNmD%2BoerNpkwx5%2FbDZHyCAJSHSD0RIPGFTRZjdXubmdP2mCOb2dyZ&X-Amz-Signature=c26d0d1a085a771f7f403295be4b4bb7978b9003401fc67b6c9af990d70a68df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GPGV6QF%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQC5Dt961ri%2BWurMOxaZSirJP4ztCl2zHfmqwyND8KbjZAIgTbqOLq7fXDaLijkgl6w2xYy7LJ8Bo2Nyg4BslorUsdgq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDI6LxxSeH3Yq8Mdc%2FyrcAzlb0AAeiqkaGCWM9cwzl6pFojo%2Fd3gQ45F9WSKKfL9aShUtM4PZCPlH5WD5OSP9MejvYmD0kajd3up7PchM7MXN46rDs7mKqeIXScK%2FNgaDqbMRzq2xihpnpK4QHum8YwAQnP49hIiHx77KmBnxD7z88y%2FMdFDm0gNI%2F1dQMyV088D31zuSccDpeEr0DyTBte5ukaGbVgoWxeWl2hc0KolRHGKV%2F7t7czKP99KO2dvmnzyVnBPNLbAvJURBAhD4FarLluAmfnvwEMOye1nBOglzipgNM%2B4PYwaVoUP2v0Qxg%2BIUun3tAtIYeeYQlNAg7jpSEv6xEPktXcO%2BU7QKFwm3nuYWUS%2FDuFGRMlK9OHkuOxKH4%2FIe6HXD9plEpLN0Cyux0aLrejqpjg15bBeCUPkCYJ%2FFFGSVFim3OXFc3lyG2RBiWO5EtQkE3g5g4F1K2BxmInnjSPOcT0SirmLyA0DltNnJK%2FBaN0nSnlKEZ4mgzDcpoNEUa0PFmz1DxARyfD05%2BSbI11v06EVyKit20VSA%2Bcb7%2FdAZ3KIJFNVnZ5ybPCoKJe0kDfgsrMeqyUqSSpU%2BRcU9dbWNt3pK45Q7%2FgxggPQfbAtkkxwKh40JpFcQGUjEWdM7E6DCraoXMKi2zswGOqUBJdAGiWD5uVPCeR2BTzF4JeXfpkd5ZjJgbsyyIYoZG%2BhluG97WN%2BrerGemDfFarwGHZyHOzxbH43zoVOtPH5OTjx6dQ6CQRjBq9Xf8OsxWaJwhZCfxfybeDf7O7lH3N5btAuE8PGHz%2BTrhKukLUIJ5wGMOfOq8Xsu2aqmZ2f13cQAb6FmSUjVgisVmJxoRHeCl7BvgW5%2FNOkXuIgOWtpWHOdsq4Oc&X-Amz-Signature=6f93259d30b048c98e46d74cdebf9107ab3b681a20ab888577508e120e1497fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDI7ZFOD%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIC3VgE575XqXj5YbyBY8gyckpe7kVURF%2F9bnhTwJJUowAiAHmv7o4ZdCC60tioKJ0ZsaqvqJvFEgFT3xIhqgWNVlfyr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMY%2BTY8Z%2FlmnLu4WYlKtwDNxsCB76XvSpPKzhaUgT3xwGjGIFUIyaVaqphlM035Z4a99rdMRv8JKW9z30UQ8iBwY86ZPbD465jd4mefJygSLL2WjlX6MaCaXAODX7Idi2DexzW%2FXya8nudRNwSakJ9SeaR38F%2F2LjLAkGSnE1rOdE28DqEcQGhiwVMKZn3O8GqXtnevrVVEABJiH%2FyOIZZs6KjNwSBNHsVzbceJPNF3xuSY5wQJJdk11TfBNSz6G4YlNpQz4u8z8T%2BSctek2s9pdWG367Z5XSZucEkh6QCgTBICufjNNvwSoye6DazdxaISfjNTlnO2eWESBGIMGEeCqy591vyNV%2Fe1gN0%2BoAQ%2BgVs2pQx3E70xiQ%2BEOhrfdww1yqJnOy8Tr05A9kgcFOgnpuOuDeb1p1iRvm4ZUeGbnHaMmsqoKRPvaxfdA%2BXgZxA8S4Mi4LaHONDauH%2BZrC1bcqwCvUygcwXzIkYk6xECuNIqofbru2C06M8TM68XtHmSO%2BYtJiFereo8YX8HFv5Y%2B67rQveKycmEHGK50WvviXKPpviubm8ofI%2BXzqdGe5Lo5CYQqk1Oah9j9nMphJ7IO03vXwbDTLfDgAxIfR3G3ocdh1l7W%2FMb%2BxZKk28PzI5NWDBdfc44kiglfkw0bbOzAY6pgFOsQP3r7C7vnDST9bCP5kUfCn3bOUuVopLhVT0yic%2BN1CZoYo89onisNxNVVtmrWxmyxzQzipgs36%2FNaM3xW3lSKGBtmIcCh30279oJ3Ea8XHsE7fP23msBO8j0ua3dCozmCtXvoTugPS0inCH0%2BMejw5YQ9FLaI0rpno%2BeyE96ocNp3v6jb%2Fz02h6DvDxHJ92zLQk9ciwVJMKau1IulfG9fmkQGCv&X-Amz-Signature=0f946553921e9b514b3d2b9c1667370782d4204d8549c3fc7886e379704ae452&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AXN5LXS%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQCGsbzU%2FkcQym9tUaF7K71i7H5xSRZKidsTJSvWXeBG5QIgPCJBVYJFOAsn0IYIZcjLP0iO1imYvhA5RL2vESA57ogq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDOIywh5njKc6UemXMCrcAwM46uSIdnixN0UgHmVw62M1fQfgz%2FVguGjd6x2FFJ91z9pPanz1ZwOIzTE6Kxgszf2zpLFbbAj%2B9TTuAwuv28%2F0tn%2FEH3OwCkGG9BMogkMSKVI5YTgUEvBowcdY2TzUmDqusXFOHte6P%2FN58%2BgbfW750JKasCELQFcrSVvvrCCCkh12WlcVz6Mh4uRSrbzOYg5M5fDYq11PoZfCspO%2BDIzO12s0e9G0Esv9POK%2Bi266AiTW0gMkPf3WVeHIP0CKpbonwbNLKcC89gh9IKPuPvnssQJF0Kx0ZbL%2FmqHtc5Houfv8fXs6piulZixdzEDJpcjvAL6d1WCyCEZPFn7GCC0rNzuc22rwWLfKM2c7h8YUO0mWJZ0ilSvbym58byl51bb4UXDPQwUMpauickY3N3cNe9HGYKyhi9JLkBNY9nlWdx4cfsjNJIugC8rLz0BUR3WNEzrnqdS23QRm%2FXEglmOgcJJS8ljLC8d4vAKoin2VoiLA5t0ROxTTLO8umCBLoHByZ9fQPaHlUsWDEMCzT%2BRpaOSJW1xg24iUXwZ3Je04NQAq977%2FMmFm%2FP4rwEKeG3Ti7sZTLD9kg5SaK%2BBHPhYO4fNL3c06TovhgQAg6DVBiWmDQ1L3J84H7QMFMOO2zswGOqUBr4wUQfBnlUwvqEbNHV95w%2BGpX6IZxHcNZ%2BmU1nCc4wFi7qe%2F%2BPkgI3c5cdGnghWxgVlqOWPdsbTKJIFY3sP5vZ0unaLOhUTDElgzI2seSEOoMAdPqQqbF%2BDjmeaXIKR%2BpnrPK%2F8qcdwKJgaUg6dPG9zmRm68Ql3I62cRUFhGQ2dGuGHtoF86J5KQsvECnmCp76%2BDikpQ9fs3aZhP9EdpVGosbAzb&X-Amz-Signature=17a3cef5bc03e090fee96b1a6e1173dca5047dc1d4801b5b5b02b63c0b0b6ef9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPQXXDUC%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCOlZJw0Yid4AfYrWbsZOdOp0uqimhx785Kry5XXeo53QIhAP%2BgbB1ZqpTrfoWESp8rYqgssaQJ8MbvU%2FsDzIk5eUMiKv8DCEAQABoMNjM3NDIzMTgzODA1IgxE%2BD%2BaDq6x7NmVfgkq3APqvpj1aUuOCk3R%2Fk0ecWsLnPBvSndVMG0IliIsAyFDIcAAqqRD5I1JFTzkEfTckNUWYUC1DJW%2FABPFvLsuJov5v6LogygjciCqr03JZ4VMNYt%2FnamYO%2BKzkfVZ3lka7CFjkJplEcgeCisi8qkrq%2FQohpF390VwVR%2F4XvVucf66LUsDkBbzbGKyS3YWzAEFATQxQZU%2Fdbo4oMiLfodfw71J1BvxfMpoemSDIM6o9gqbP4Nm1eQ4GiiFCAomied%2FALpXJx10qbyn7P%2BEwoujoo9yazsFgSCX9egPdzt9U%2BpBr5t9rwJ5r%2BmLyKW%2FE0lb2LBRGHwhaamU4%2BLqvUe4XqU886BhbrqqEjPj1KrfJs4MH72IEy2xEX%2FgCpT990sUbOQAG1pD%2FgCxvJrgSOZJjt1hSH0UerxzjffxbnIYim4vFhS8OOLTcOtuCJWBKN7UFtYfCGoF%2BgfFuxshczzyEevKXxYLI6Sd4aQaRH0entnEAoE1Xa6Tju66Cjd34sTBxFxVGZSS1A9aGyXSQI34bPOxm2qZLHAVYJY0ruDkilcLsj6PSCcU2Ofj%2BO16xoOhgAasbmy7cCH%2FC8aPQpbXYY%2Fj1a1F8WZnJBBWjSUO8bzBe5pn1zX%2BjcpbH%2B5sPjCnts7MBjqkAXeSVZg%2FtRqvo4cb1z%2F9B7V0L2jAUJilVGAUUFIMbKv1D7TeXhyczpeqzgDQDH8MySdpSWdZupiOTUGXMyo7%2BrR%2BrLRfbaaNG49lynmaWBw8kE1m1mgnxv%2FrP1o8biGkFuGSd8O2Gc3QkLTGGugz2ZaV3IuMQ1ts%2BVGh2C9o%2FXwR%2BcL%2Brahqr7T8t6W7JwDKTUbyODLpyHrrC0f5IqXnT26CfYwK&X-Amz-Signature=599fbfe1af942f1b3b6e8486da79f81fb5ff1064fc7e8fd515018854481573ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPQXXDUC%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCOlZJw0Yid4AfYrWbsZOdOp0uqimhx785Kry5XXeo53QIhAP%2BgbB1ZqpTrfoWESp8rYqgssaQJ8MbvU%2FsDzIk5eUMiKv8DCEAQABoMNjM3NDIzMTgzODA1IgxE%2BD%2BaDq6x7NmVfgkq3APqvpj1aUuOCk3R%2Fk0ecWsLnPBvSndVMG0IliIsAyFDIcAAqqRD5I1JFTzkEfTckNUWYUC1DJW%2FABPFvLsuJov5v6LogygjciCqr03JZ4VMNYt%2FnamYO%2BKzkfVZ3lka7CFjkJplEcgeCisi8qkrq%2FQohpF390VwVR%2F4XvVucf66LUsDkBbzbGKyS3YWzAEFATQxQZU%2Fdbo4oMiLfodfw71J1BvxfMpoemSDIM6o9gqbP4Nm1eQ4GiiFCAomied%2FALpXJx10qbyn7P%2BEwoujoo9yazsFgSCX9egPdzt9U%2BpBr5t9rwJ5r%2BmLyKW%2FE0lb2LBRGHwhaamU4%2BLqvUe4XqU886BhbrqqEjPj1KrfJs4MH72IEy2xEX%2FgCpT990sUbOQAG1pD%2FgCxvJrgSOZJjt1hSH0UerxzjffxbnIYim4vFhS8OOLTcOtuCJWBKN7UFtYfCGoF%2BgfFuxshczzyEevKXxYLI6Sd4aQaRH0entnEAoE1Xa6Tju66Cjd34sTBxFxVGZSS1A9aGyXSQI34bPOxm2qZLHAVYJY0ruDkilcLsj6PSCcU2Ofj%2BO16xoOhgAasbmy7cCH%2FC8aPQpbXYY%2Fj1a1F8WZnJBBWjSUO8bzBe5pn1zX%2BjcpbH%2B5sPjCnts7MBjqkAXeSVZg%2FtRqvo4cb1z%2F9B7V0L2jAUJilVGAUUFIMbKv1D7TeXhyczpeqzgDQDH8MySdpSWdZupiOTUGXMyo7%2BrR%2BrLRfbaaNG49lynmaWBw8kE1m1mgnxv%2FrP1o8biGkFuGSd8O2Gc3QkLTGGugz2ZaV3IuMQ1ts%2BVGh2C9o%2FXwR%2BcL%2Brahqr7T8t6W7JwDKTUbyODLpyHrrC0f5IqXnT26CfYwK&X-Amz-Signature=a3077e904afb8e526525ad12b30e3a073a17ec669eb635d7167c96fb3fc0a31e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCIJA3MD%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIC1digxwkLB4eC307icf1g5Q2OVNnCtRIDqsa70X4aDjAiBUxSjUfGme8MMoEuZ32vYX42LkRwNKpSvzoNgi6iUoIir%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMH2BHr8xtMuyrIoQeKtwDW%2F9OF3qoFziZhvJWpMWaGWKd4iUVOQ9ZsOdeCQQxFmvJqQc7BRiNSEoMkMg78foUqHsrS44PWDG%2Fd2ya5euz1PkqcOs4iY7sFRO%2F8arj3dqEAys5PdUIVwrVPEgG8nDQf32B9Jh8bVQrd6CfXMTc7OTbatAuyAaZL6W0aNss1b9MDC7p0I4LlhRoTpzIILTozEdd9PdgnL62XAzuYQ2DhP3FWkWTuGj1UWlob9ocpCZ4%2BkHkMP1ZSgKsIhNyHaDXSyHiHCbD%2FWDyxwbwaWsHVR4HiMgIjRHA36D%2BVb585iT2%2BwH4WZEeMPs9fCr1PmcodST531iC48E%2BTUKva%2BmYEcRvwjJe7PoyAHbXMiKqpXZchUynLgzfd%2BveDCY79GqKNhr0zERy72ktYJ6Y%2FlRGdZrxqzSFuPo5wgbqweyCd%2BvlMFMB4YLb0yATVaqqaFNOgJZKQLfsGOc7ej7t3Z8nHdk6IMKaj7MVnPLOBmg7eUv3NV25W6fv9YaKD2%2FC915dRWoJXvZY%2Bd25tk7uwH57G%2FgQz6JBGl8J4Vs1yxRkBJ%2B1VJTM1kjwZ%2FbfTci%2BQmCmIk7LgdYeXI1M0Rc57zF%2F3RkhMJoX2qCrum%2B2IJh3bTg0sO0mYCTxCcu3CFgwsrbOzAY6pgGesMd3yRNY1t3M6r2F6onSPmyiZhw1LfPPTFoZS0gxhtSgmL%2FlsBYC7UTgVdq79RiRxufOUYVgXvTfxBmu4pl%2Btlqt3AgeGMRu7XWQ09Oisx3yhSBz9HvuUXGnNX6%2FWXuBU4kkFIw5B%2BjtpmspeBL%2Ft0wkS6owtqEdC49VQvpsTrWt5QGrscdydDenukOGoQDFBqpkg21bAWQxW5IPVyozM9rFjW%2FJ&X-Amz-Signature=077aaf326ca23f01f07838ac43838ab397d4f77ff3fd1a8846695a2df3413989&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCIJA3MD%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIC1digxwkLB4eC307icf1g5Q2OVNnCtRIDqsa70X4aDjAiBUxSjUfGme8MMoEuZ32vYX42LkRwNKpSvzoNgi6iUoIir%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMH2BHr8xtMuyrIoQeKtwDW%2F9OF3qoFziZhvJWpMWaGWKd4iUVOQ9ZsOdeCQQxFmvJqQc7BRiNSEoMkMg78foUqHsrS44PWDG%2Fd2ya5euz1PkqcOs4iY7sFRO%2F8arj3dqEAys5PdUIVwrVPEgG8nDQf32B9Jh8bVQrd6CfXMTc7OTbatAuyAaZL6W0aNss1b9MDC7p0I4LlhRoTpzIILTozEdd9PdgnL62XAzuYQ2DhP3FWkWTuGj1UWlob9ocpCZ4%2BkHkMP1ZSgKsIhNyHaDXSyHiHCbD%2FWDyxwbwaWsHVR4HiMgIjRHA36D%2BVb585iT2%2BwH4WZEeMPs9fCr1PmcodST531iC48E%2BTUKva%2BmYEcRvwjJe7PoyAHbXMiKqpXZchUynLgzfd%2BveDCY79GqKNhr0zERy72ktYJ6Y%2FlRGdZrxqzSFuPo5wgbqweyCd%2BvlMFMB4YLb0yATVaqqaFNOgJZKQLfsGOc7ej7t3Z8nHdk6IMKaj7MVnPLOBmg7eUv3NV25W6fv9YaKD2%2FC915dRWoJXvZY%2Bd25tk7uwH57G%2FgQz6JBGl8J4Vs1yxRkBJ%2B1VJTM1kjwZ%2FbfTci%2BQmCmIk7LgdYeXI1M0Rc57zF%2F3RkhMJoX2qCrum%2B2IJh3bTg0sO0mYCTxCcu3CFgwsrbOzAY6pgGesMd3yRNY1t3M6r2F6onSPmyiZhw1LfPPTFoZS0gxhtSgmL%2FlsBYC7UTgVdq79RiRxufOUYVgXvTfxBmu4pl%2Btlqt3AgeGMRu7XWQ09Oisx3yhSBz9HvuUXGnNX6%2FWXuBU4kkFIw5B%2BjtpmspeBL%2Ft0wkS6owtqEdC49VQvpsTrWt5QGrscdydDenukOGoQDFBqpkg21bAWQxW5IPVyozM9rFjW%2FJ&X-Amz-Signature=4b05593e1b2c10440d65cf8b9345b3454d99f35445e26b77540edbd284ec4d00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCIJA3MD%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIC1digxwkLB4eC307icf1g5Q2OVNnCtRIDqsa70X4aDjAiBUxSjUfGme8MMoEuZ32vYX42LkRwNKpSvzoNgi6iUoIir%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMH2BHr8xtMuyrIoQeKtwDW%2F9OF3qoFziZhvJWpMWaGWKd4iUVOQ9ZsOdeCQQxFmvJqQc7BRiNSEoMkMg78foUqHsrS44PWDG%2Fd2ya5euz1PkqcOs4iY7sFRO%2F8arj3dqEAys5PdUIVwrVPEgG8nDQf32B9Jh8bVQrd6CfXMTc7OTbatAuyAaZL6W0aNss1b9MDC7p0I4LlhRoTpzIILTozEdd9PdgnL62XAzuYQ2DhP3FWkWTuGj1UWlob9ocpCZ4%2BkHkMP1ZSgKsIhNyHaDXSyHiHCbD%2FWDyxwbwaWsHVR4HiMgIjRHA36D%2BVb585iT2%2BwH4WZEeMPs9fCr1PmcodST531iC48E%2BTUKva%2BmYEcRvwjJe7PoyAHbXMiKqpXZchUynLgzfd%2BveDCY79GqKNhr0zERy72ktYJ6Y%2FlRGdZrxqzSFuPo5wgbqweyCd%2BvlMFMB4YLb0yATVaqqaFNOgJZKQLfsGOc7ej7t3Z8nHdk6IMKaj7MVnPLOBmg7eUv3NV25W6fv9YaKD2%2FC915dRWoJXvZY%2Bd25tk7uwH57G%2FgQz6JBGl8J4Vs1yxRkBJ%2B1VJTM1kjwZ%2FbfTci%2BQmCmIk7LgdYeXI1M0Rc57zF%2F3RkhMJoX2qCrum%2B2IJh3bTg0sO0mYCTxCcu3CFgwsrbOzAY6pgGesMd3yRNY1t3M6r2F6onSPmyiZhw1LfPPTFoZS0gxhtSgmL%2FlsBYC7UTgVdq79RiRxufOUYVgXvTfxBmu4pl%2Btlqt3AgeGMRu7XWQ09Oisx3yhSBz9HvuUXGnNX6%2FWXuBU4kkFIw5B%2BjtpmspeBL%2Ft0wkS6owtqEdC49VQvpsTrWt5QGrscdydDenukOGoQDFBqpkg21bAWQxW5IPVyozM9rFjW%2FJ&X-Amz-Signature=4b05593e1b2c10440d65cf8b9345b3454d99f35445e26b77540edbd284ec4d00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U42YKYCJ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T231631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIGOcEJSQiOlAutuf7wMVsdGkBArFJ61I6UuGHf%2BI00BlAiEA4Aka93vP6RzFadyXUHQD1ly9qS4bHWyr72jNJi2K1Skq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDHQankDvcUzSUQ%2BPRircA2IWy5%2BBZ9LmZSIcUK4tpuQJx06cQytofxC%2Fe0mvcfONSDF9nrXsgfptKZMabNsdmPLWMS9svSNIgWv5DC1mOAYT2P3iYpWLwZwhYYXKEn5wcTzK6w9P1OFqpz2QGVh1dBK%2Bm%2FPb5JL4SC%2FmVUsPpB%2Fl3rWoUJxOUZiCD75Xr8ryOf34zL9mGrA5XR6cT8CwPO5CQwZhIvEgFK4a0%2FL0X2n23SB0xmWmKZK2QJVvEsvrOjja9utYryhK3o4qbhqyXSitsaQ%2BDA0CYhJeTD0AXy1zlmz7NoLrJ1ViYpXo9kn70pX5OQHV2Ub62RhZd7Id4khc1mu%2BVW1d8P6%2F%2F5kjyeyquH1etZdM64B5a1cLKy%2F2q1g3fuBR8LObJ1fv33UH3fTfNf8QeneCTHKfKdhtzpGKCHE9sGTexFFNweTV4OTnnKrNBCyAUr0ofrJphAPTIbsQWCD7ty7bzS0tb8XZFPgLr250%2Fuoc%2Fr0QGkuU6DD3tFTioONv%2BqxsLb6NIdPf1BupQlumeovfmtN9f%2BmkUEagM5aum112ljlSRp9Tb2%2FxNaLr8hArkBbaDUB4Cxtxkl2rhzZzBZ4Bofvqh%2FpifMuTlmHtSCCy6aOTSMyLeMi%2B0i3nCgvrzR7OIl6dMIe3zswGOqUBoUYUOk%2Fv0rV9i7zHlOljIVvYVqmfKDKF4kPfEeQ1dmYzPWX1yZ5NLJmhS13kF9AwtrnrnRe0btgPwJ5TEyFxKTZeOE3pqj6YJyVPszsyq4MadFrs8%2FuWXhUJOqbe1a%2B8DIZN%2FumBkFFQ8R11zA4nCdxBUp%2BM%2B9IOrHGfO9pBLKYWUQF3H54JwJM0kbQdYt59NenLCgFDYvqa0g3iS1hfInVLp0%2B6&X-Amz-Signature=2d8b5c0741199f8fee77a65842b06ce06de1acaf5888d59c61a8119b4ebbad79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

