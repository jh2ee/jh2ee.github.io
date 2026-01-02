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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REVHJL3H%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDJeWNqsoMjJA%2Bq7b6O9rZsgx0UDOW%2FlGjWxu8r19Ag9AIgHvI1exoUDRwnlr9PONAxssbB6%2Fvvs7%2B5dr%2FrtV1Uwa4q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDNxKXYpTxKfNYmtXfyrcA3yxJJcA%2FC7v1umbsIJmG1EF4obj2Qkx%2BqWLPFqdGLQTBS1wh%2F5HMzGLnv2eH1MQw0BkDp7W6s%2FTVBgdiT9w3bmBUvACtVmy%2BHDcB%2F%2F4UP4yi9teLl8KvFrp0yzp3Xm23W6lYhO8GOcpsK4H%2F8bFh6NBsBLL23QN8oO%2FEzMMvuv%2Bca4Si6a%2FbH6mAAVlKKxuvVzcSWxy2wUr512zOtNJhnhzMYvoHw%2BldoI5uM%2BbAfSLeFjvC2VnKAf6ukaT6kINSP9gSvyWmt0UJj9Bv1Q%2FymtGyO76VoLHQX8I47pbLs%2Bzf0%2Bzy2WR1prjf3LkTZas7EIhtM2siTe43%2BFy1hs%2BppcFDl7YHkHu7SC1sQtjjrrp8SF0SlxKVke9vKbuzrRQ7eNH4L4E5mvhliwOqDUJNv2hfXuYICxAosO9rYHwNy1cUbD5t7ovsbMxvFHLRo%2FoOrG5vMAvf%2F5H%2BKu%2B9lMGnTmrJ02ZqkRyqsfI7MicLfqr0ogYz01JuIX8wTbrwr1fuNjix7WIRIuMden7Roxp1Vy0EpGEx3UIJudBpSD%2BgHK9%2FP%2B22lhaU756TiqLHTyFfr1s7IAH1M77l7U%2FPst%2B2LvCpiz4%2Fx9ivGF96HkcpaWqcKABYApgw2%2FqafVaMNC%2B4MoGOqUBcrfXsSvOpIs4Z8XT1lHqthLhY3oT0HduQklJW%2F%2FfApWw%2BylS01S90uR2TG1vzLjED6sPmFhkP2ov9wlgtMPHY%2FGKrG7Gg09SlrqpXqVpGylVrz1jCT5a%2BjZmnxu7fRi%2FzmSUkswlv7MB5SPPQJpFL1hHHN8HXFax58INUui6ntdNbOruHmKuaXZoCabFW0VVWtRj48EdXeKjGH52HpfmNCCO4th7&X-Amz-Signature=8b74474122e2ba6e8af74f45dff97cc46d884c299f66ca42db6dd7c9a6e67a99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REVHJL3H%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDJeWNqsoMjJA%2Bq7b6O9rZsgx0UDOW%2FlGjWxu8r19Ag9AIgHvI1exoUDRwnlr9PONAxssbB6%2Fvvs7%2B5dr%2FrtV1Uwa4q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDNxKXYpTxKfNYmtXfyrcA3yxJJcA%2FC7v1umbsIJmG1EF4obj2Qkx%2BqWLPFqdGLQTBS1wh%2F5HMzGLnv2eH1MQw0BkDp7W6s%2FTVBgdiT9w3bmBUvACtVmy%2BHDcB%2F%2F4UP4yi9teLl8KvFrp0yzp3Xm23W6lYhO8GOcpsK4H%2F8bFh6NBsBLL23QN8oO%2FEzMMvuv%2Bca4Si6a%2FbH6mAAVlKKxuvVzcSWxy2wUr512zOtNJhnhzMYvoHw%2BldoI5uM%2BbAfSLeFjvC2VnKAf6ukaT6kINSP9gSvyWmt0UJj9Bv1Q%2FymtGyO76VoLHQX8I47pbLs%2Bzf0%2Bzy2WR1prjf3LkTZas7EIhtM2siTe43%2BFy1hs%2BppcFDl7YHkHu7SC1sQtjjrrp8SF0SlxKVke9vKbuzrRQ7eNH4L4E5mvhliwOqDUJNv2hfXuYICxAosO9rYHwNy1cUbD5t7ovsbMxvFHLRo%2FoOrG5vMAvf%2F5H%2BKu%2B9lMGnTmrJ02ZqkRyqsfI7MicLfqr0ogYz01JuIX8wTbrwr1fuNjix7WIRIuMden7Roxp1Vy0EpGEx3UIJudBpSD%2BgHK9%2FP%2B22lhaU756TiqLHTyFfr1s7IAH1M77l7U%2FPst%2B2LvCpiz4%2Fx9ivGF96HkcpaWqcKABYApgw2%2FqafVaMNC%2B4MoGOqUBcrfXsSvOpIs4Z8XT1lHqthLhY3oT0HduQklJW%2F%2FfApWw%2BylS01S90uR2TG1vzLjED6sPmFhkP2ov9wlgtMPHY%2FGKrG7Gg09SlrqpXqVpGylVrz1jCT5a%2BjZmnxu7fRi%2FzmSUkswlv7MB5SPPQJpFL1hHHN8HXFax58INUui6ntdNbOruHmKuaXZoCabFW0VVWtRj48EdXeKjGH52HpfmNCCO4th7&X-Amz-Signature=8b74474122e2ba6e8af74f45dff97cc46d884c299f66ca42db6dd7c9a6e67a99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662W5AGN56%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIFwOZ77IXqsGeLhcDwcrtSJOVXP57f34HNFl06j12OKzAiEA40uZejwt3v3WSvpg6LXjKo80R8CUwRQqP0qd8o5AIZoq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDBdBkMe7gvt9lVy33SrcA4St0AMagM%2B71T%2FnoOrZKKbg0E%2BVPw5HJ%2BLdDLfwBMZobNEjDkYvcQ9j3CIKjWuDSfmD1w09L%2BJgO4v9pYCHR%2F03a6srcdMZpECkAWPsDBdQNttkZs79kXQFb15UTmLNRRoH2RXiTi8GVGU0G6jKY6FsntvEwPdsSd7W8Wb2kWsK8NvHyTisLHuYH%2B%2BcQ4%2BfsTCykeY294uqlgzpZcpsnRf%2BkHJS5AUGKt6bSIUIcqdGSqxb5WBFIdNA%2B3fXmSALS8wseA54EOaxyG7FzhqX23AFw468T2sbENnaJy9SWvVq87dr8ZXLpFHn5ulKJ8Nz4PH31N1NRIrk0JE1gz%2FY8zskLIdsTetRtI7oCKPQETSqKSw0t%2BwBhIRuXbLS%2F3mwzXn1dDasdbO6OePu7%2F%2FwiIbyglHRCOjAtVKnPChIUojZAsQhB7B8x6uuepFuo4RLF8JuZzTeBgZToaUjoqUshpT1LZGnaK293VUO9PTJaUc6ohlavj1G5CvsA3vHd2X7cmz77aSjNC1o%2FZcUMWJ%2FKI6DfCiBZLAjbBu07LUD7dHyL%2Fq1cxImDzn%2FvD%2F%2FCOmhBe86QmwgX3aRJGd9u1MXExCgZx8PtkgfTltSyhxvhfzwrOznTp4jEevNiYmWMLC%2B4MoGOqUBs%2FMbH%2BmeF3%2FYjGXFymI6q4aQizmX0EMgYzPGtrj0Hescw2y90qqBHl0hCBekN0Vj3UJ%2F3tSZ61OjQR6%2FHdKnzhktWtcP6ia69DPoEw%2Fn7xLVwiW3gV4Ye%2FAFMjP2FToFAm8QspsB%2FfNZ0crNc%2BMsYFcIC7BLUFhBdRLyx0CD2pyl5P%2FSHvM5CNDRrXfdEjs6POMDRY1v%2BVz67XhdUzmcpPpaAoFx&X-Amz-Signature=96131d95a6702efab60be882b5e646b883d8cd9446514a379a3d13ee05b03f8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643RDROO7%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIB2U4vcEidS7PqEUsfUNd8cELoc%2B5fj6jlwNyI5uMm12AiEA4cxYI6oqC7MHJwV7gSgKGzn94I8WWmkrPs21qAe5M5wq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDNxGbayeQCPT2DUI6yrcA79NoLOTKDndjZqxuoC2gTtW1j8vDRpYwDgqxUHySh1UW3dCLb0KuwzFr1pGROZ5Qdlgnc%2F0tQfRXcf0u3PuIF2xF3uMdYrcml7pcx6xrizrwrN1%2FQJw%2BqN4DRKU%2F0vLfZxmIkHaeSOPKUTqhxOy%2BosjuaeJS5%2Fjier571kj%2B5I3B6omCGTLQQKWHhUuLAJ%2BC%2BlWjtoeZ1nyZ1L9bVzKqmDTHzI0WYKzyVq4HX6TQvxN%2FiNUG0Nq9WKV1u94gs6qe7sPBH2ALHQtNFA4ZOEZ3CRlseLmL%2FEBjweECZ4I0ohME97g2fbynKJE72N70UDASn7GMHPSCP5kMLegf%2FTTDSRyXXEM6D6JpKcMeY4MkH8Y%2BwBt6Eqf3UMoteEFy47VJyhGod7Nqf6ht4RuC6IjQefZ%2FZDIPFQHD%2F5dwNiyWbbSvDEkuuGBpdRkJZDUL5C%2FwxMyODNgbD8o2M4e4ysFg%2BauXEu7kCHysHX7tgDFIEQtg6Jd90wgrXq%2B%2FEoNXjgQ692TCITiCS3ZcQp1s8bywp2BuA3yScdxJH%2FF9C84nkIsnDt8eVeojg9H9Z40lbABfTGpr2gJoeWLiEUfoGjf%2FHyoepuaGA93Doo98HFw9%2BBqrDs9qE5L0SBrXzeqMNi34MoGOqUBMwsFaOlEBVzUF%2BtTJUfx52rN7duPAyHq4jvD8W5pOyrZZdr54KEoAOki2R67xsvl1LwgACQ5UTxiX%2BbAfvXnfVgA4XL1ZiJZx5Icyv6b%2FLxxQWahtZhcr%2B06Z%2BL8mW1OlzSUQ8D9yRu%2F52JJJVA68aIkpaH3maAN5Gz5hIoHtw0%2BoRi360SomR8yLyZIvNbhpUk8Z%2B%2Btk%2BrsEWcgoO%2FMPHumSEgr&X-Amz-Signature=99c9c37e8eaaab4604fe523a8088d32dc9e085463001ce94c63532e5c7aacd0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643RDROO7%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIB2U4vcEidS7PqEUsfUNd8cELoc%2B5fj6jlwNyI5uMm12AiEA4cxYI6oqC7MHJwV7gSgKGzn94I8WWmkrPs21qAe5M5wq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDNxGbayeQCPT2DUI6yrcA79NoLOTKDndjZqxuoC2gTtW1j8vDRpYwDgqxUHySh1UW3dCLb0KuwzFr1pGROZ5Qdlgnc%2F0tQfRXcf0u3PuIF2xF3uMdYrcml7pcx6xrizrwrN1%2FQJw%2BqN4DRKU%2F0vLfZxmIkHaeSOPKUTqhxOy%2BosjuaeJS5%2Fjier571kj%2B5I3B6omCGTLQQKWHhUuLAJ%2BC%2BlWjtoeZ1nyZ1L9bVzKqmDTHzI0WYKzyVq4HX6TQvxN%2FiNUG0Nq9WKV1u94gs6qe7sPBH2ALHQtNFA4ZOEZ3CRlseLmL%2FEBjweECZ4I0ohME97g2fbynKJE72N70UDASn7GMHPSCP5kMLegf%2FTTDSRyXXEM6D6JpKcMeY4MkH8Y%2BwBt6Eqf3UMoteEFy47VJyhGod7Nqf6ht4RuC6IjQefZ%2FZDIPFQHD%2F5dwNiyWbbSvDEkuuGBpdRkJZDUL5C%2FwxMyODNgbD8o2M4e4ysFg%2BauXEu7kCHysHX7tgDFIEQtg6Jd90wgrXq%2B%2FEoNXjgQ692TCITiCS3ZcQp1s8bywp2BuA3yScdxJH%2FF9C84nkIsnDt8eVeojg9H9Z40lbABfTGpr2gJoeWLiEUfoGjf%2FHyoepuaGA93Doo98HFw9%2BBqrDs9qE5L0SBrXzeqMNi34MoGOqUBMwsFaOlEBVzUF%2BtTJUfx52rN7duPAyHq4jvD8W5pOyrZZdr54KEoAOki2R67xsvl1LwgACQ5UTxiX%2BbAfvXnfVgA4XL1ZiJZx5Icyv6b%2FLxxQWahtZhcr%2B06Z%2BL8mW1OlzSUQ8D9yRu%2F52JJJVA68aIkpaH3maAN5Gz5hIoHtw0%2BoRi360SomR8yLyZIvNbhpUk8Z%2B%2Btk%2BrsEWcgoO%2FMPHumSEgr&X-Amz-Signature=4436eae20d940e22fbf664a142bfddbd7d8333d85c13675b77c791d2d5600fa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677DJFTYZ%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQC31g6lpPCotWYOLIj5jiPlJ9xd1todveU7K1nQeAEyLwIhAK3bTZYM%2BHPdagAVWHjx5dVw8QVYM5I0RifhrdM2dfIDKv8DCAUQABoMNjM3NDIzMTgzODA1Igwa7HdemfTdCMPjowsq3ANyFgrdKHwcp5CNqdbzUsc5lWDmo21Eyw3PvOF1m4Bkp21j35TJ0nKnQVTN0%2FY9I2TQ24iwC4x7wtxCKLLS197CO1AYovnD5JlvV97a1kJx64fROxMRiVtdZUprn1bfx5xDEjumJL9gomGMMxJS9kCY9IvxxQjZCkcQvEI0C%2F9RzZMGp2ihU4g49lw%2BroF%2Fabt0qejsoBAt2la5D3DsBoDLJCfFLQXR40F9fvTwdUFoP2XqhTfvyk%2BBbCyQJ91Ei16z3bp8byWXjz9Bl0FlOlYO31vadVMq8nhs6tnnbaeBZcSQen1wuVxSaAf5oVHBssBQMcHpq%2BOdfb87YIqS6cjZJE05Bu8WgYGHEcyyx%2FJK7CD6uMaG91KxgNzTJ45UYzDFiepKCBJu5FSKVtASDKzwZv5QF42hqpac3nH2qmOBP%2BOJqOmF%2BS2Y8nZW7RoLm2Y%2BeCSC38kS1eXkBCrfcm2ICMFjtCMMrlFSGk2oXhdCoABOETtN3dAv1jTKbTVvHQt7gjFvgTQ2ab4jv1kAJQDu1v5Tu00Pg1ZgIC2g9Mn2qd9RVkQr4cZRQl3BKwlw4xL7609G%2BtOXJARCZh0HxNT0E9kC4ieWiWw5F2RUvBsPnkVjJrjlyaPZ%2BlKhgTCkwuDKBjqkAebnahWoGlyOVS%2B1Z%2FTfaSSeVAd9UVgXBfUQzW8aYd%2FYbc8OASEQkU4BbY5S9diC6Lxo%2F1Sk%2FjRCmEYkylXOF4BQcVx8nxtC7hbHy38nKoO3GjRYI24iE44LE4y%2BETPsSP5Y02Xq1zxk8MumnB%2Fe%2Fe1YRbUTj4S9TMyS1dTD57pu8CVcfdjerU76BY3ivW4FeVbjL%2FEWSwrUOKGLCfvi6zEBRi2Q&X-Amz-Signature=c9461d8034f6bbeaeca498cc26aade05cf26e514767d013257ce336de267ef99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3FTQ6IQ%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIASwkniUaAXqis1poZPjboY2%2F%2BTPn4ZXILmm%2Bhm3gYFKAiAtpLkIMWxrT5kUBWWmKMvP%2FpZB8OndYnW8mNTuZojG1Sr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMmCYmNYZD8vPMW2mDKtwDHUtzGJdeDQ2PQ1nOFbRU5SCIWcWSeraK9r2Y%2FTkTb872Qomjhv7JP2mVVUP6izZwhT5S3MeV9bBpmGS5AHQaIoTOhrzLW3aouCMy30LJ9DSfeGh3XH%2FqvNrLvtp51cn3br52MvRPY8mKmfm6yQPXUoflwPPvv9KxpzslihWQ%2Fs4JHzc8ZLQH0QlErOxJMDYECk4Guaf8%2BFFs%2BigoQQfqH65e4OMW1wgO7qszSKfvM9kOdeGh%2BJec7yx2726RRC73C4te5ZXct69yJYooA%2FjXxqYJBh7estwsG%2ByTZTWcJ7qgtZHXeR16lyXr%2ByMuSevOg%2FaFJbnWb4%2BnSukSp9kAJUwCHZcJN2zZX7mbMwVnIL6eBbhMTlLn5kyOBLk92kH8Vz4g6ASHqcPKe5IlJTI%2BEIRigJmrRmGUbW6MoIK0BqQT2G%2F%2FBQD5x%2FskOq2GTfyxPp9bBTYvL%2BMBrw7FMlTZ07qv2u7YdNNnOzyJC9uEGJReSv61dJlfS1%2BVf3YYP8ftrn1%2BeZSBpoCX1LNPo3su3w9O2oT8bUgkzNXE50o27E7KG1ycrmwxpSe%2BlsllQEavWeuz7Db5jk1cMN7TLVfANRLSKgfsSYVaswPIpCZMRNG7jwrUHkyR%2FfPfEWgwsL7gygY6pgGPumNMBmRYCtKzHTkw%2FOe5qHES85198FcHAGoGtstU9MXkqpE4q6bZbzxkR%2BFWCfltTPWvCsfm0%2BdpmYzrSUzWJtUtDEvrig53eqLQP3IkJqxu1Yuni8CwEkTInFfXVJL3320cVsXYwUEc7f2XxShpD8ofIrm8qdKzqgrLZtfwMtq98xvaOvXlot1HWSdiFJxTwwkFdL9IMWvVzA5Ax6fJEaj0Kg8E&X-Amz-Signature=89243864a1c0a7b278485d25f600011b22c86f71a0660688a0868b4637cc809e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZF5XW6JP%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCituLWelEsXC5CxqWmEx%2FOg%2FrmSGlhdTZT4ejWqIcG1AIhAIaHTQUdWGkCjPs9gurwjKvw%2Bljb4ATf78BpvjwCF%2FyXKv8DCAUQABoMNjM3NDIzMTgzODA1Igx6rnhbI9xCtQv1JQ8q3AP5xlx%2FG04x6presEQf0F%2FpMpLcRipk9pecwo7Wpr4yDePh1w7OmJ6p1l84OPd18o2FFfjya7wZ18uXqYe8D0KvS0eDwa6TAnrF9AhAjeCDkx7ZjfVuAiMJ%2FwF5CeP3kxC28SKLBXverw0WiVFz2pHy6B7SucYojwRqnHijxNg8KahrQtN3xHg9FiJG1wjn%2BsVmqqpU4Lnz9I%2FcTAduyA%2FyYX%2FSB1u6B3NoNXzc7AVwEwgzNim%2BCDnrvSIziQzq7Ew7kWihA99hCYDQbs%2FsMl6XrhFT42DHnf40%2FWvzreWySupyS9qP1PuyhOpNu785dcbiGMHcUom4%2FcCh%2BLuFBJjm2xXcFHg4O7xqqogtFs03YUlmHHEDaNTcnGwcY3VdfWRUzyV3jJtujxzFO2o3GCLM6UfnE%2FOiUUc53mW%2FSkcK66P%2FuwdAmI%2BTGYJ40ccVjuShvYQZczPmMeRkIyszIMcFfRpMEK4d99Khn72L8vm4ea%2FyG5vLBvJB4C1CCYVQf93FhcejMmw07crpH0jch2y5KfkdnT%2BVtW7%2F%2BxO%2B9gpNoTzEwe2o%2FN8IEoKg2pdo%2FjKrOIvI9STgXFl%2BTnssGoLryxs70CQRukBMYmnmTqlmVk6Be4v%2FnrbFJrgrSjDVvuDKBjqkARnbJHHLOCo72Zf8fZy%2BG3FRaZVcJuYHHCK7v%2FzIpkZh6CQvuJadVa%2FJaUQ5QUBvyLwfurEYAhcF%2FnLb0FMJBsN13IuYQJYHoOcUkIyNVYRfwsv9F8sb%2Fa2%2F%2BciBxXpnx99OngDjvrhkWKH4I1sLtPPzOQwyRBHHspRJRAQeQDvq3NDW8RWYLFaiRhKmHYvwn8gllvLyo1mYW6lKtiNsqtUf9XUC&X-Amz-Signature=ebc55f242c287812db3dabc3214321e504ffb4c5a280437cc8ea72d85a86e95d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AP6BG4R%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIBw%2F9zCv94fQ67kDZFs0MwyGs01EI%2B6eXbqVJJjD8L6uAiAksEHSlStsK0TelAyZW4%2FwOCosBKJgCMwzKKiQkGiuryr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMiSJV70vZAU7%2F%2BXvBKtwDix0mRNjfiFO4MZwia6t43zAAPQjtMDMU70Wg2HTyc7K7E9H80jurbFjL5RrMarec0lDQ%2BD6DJ8cnzNwcjNv7iqMxx6pKg89TIYa97m0SR81JMBJOaLisB93vQY4UoRseSSZ9vlYjU77v59irWm2%2FHELzPEhsGOTzgrhItEGCg3dZKh8xBhq09miA%2BtJh5t5HaIQm1MGHyLyIVbirlXo%2BjmO%2FGB%2BL%2FGVoV%2FQVe%2F0Yp0CqX1yjoRy2tm0%2Fs1UfOwkaEn65vBcwh5uT6WiFuU2bhyCE115BH7E63elRp7Lf8qWNi1HtvKVsAeN%2FjF6QFw45HRiUyom%2BZ2C4uTLnN%2B4u6K5A%2F2%2B5UfBGNEiITUT48%2BdMlTkgcCFGYa79TMSNTSTsJAeADkQqEVCg8Yp0xG53yk99rPAJ31%2BVmiuIwk0tWfaqOwjuvtzkzUl84fc2OXb4AgZcMW%2FGAa%2FsCudzi1KRmhpjCK%2FnRkBaDfEBx7hFtmWbBSbc0jZx6UhnP8suMiC40CKpoUyinx%2Fa4%2FzyHwuQmS2s99joXU5SvHuCKJsTQN9Zl%2FL3PYTurYlejt1hOvzH8K5mNuLGgM6POA7STbA62L1NKGl%2B63j%2BGKXIta7eCtxEI6jfs66gbXxWdh4w8MDgygY6pgG%2BmFsu0bzyePLIpnPTCcCqXBA3VkETPCZ%2FWIo1TBa4A2fPJYE5Tv330VIefbbssj5IDohmLxL9%2FGCazwWIcp4A72IUB%2FdADIco16Re5n2Xn0wsTd4YLKoLhERS0irzglXqKcCwmQJxrq8dz6m8MEXbJfI%2BjN3jrk%2F7KfFfi%2BGLqNAY6cuLVj75If3lHX7wxqexVj8yS%2BZ%2Foj2NKfj26oGTNIveKKOE&X-Amz-Signature=e39c8b83510c86414fe45171b0963c32d1f9b3d8f5304c4af7cd184a4ddc12f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AP6BG4R%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIBw%2F9zCv94fQ67kDZFs0MwyGs01EI%2B6eXbqVJJjD8L6uAiAksEHSlStsK0TelAyZW4%2FwOCosBKJgCMwzKKiQkGiuryr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMiSJV70vZAU7%2F%2BXvBKtwDix0mRNjfiFO4MZwia6t43zAAPQjtMDMU70Wg2HTyc7K7E9H80jurbFjL5RrMarec0lDQ%2BD6DJ8cnzNwcjNv7iqMxx6pKg89TIYa97m0SR81JMBJOaLisB93vQY4UoRseSSZ9vlYjU77v59irWm2%2FHELzPEhsGOTzgrhItEGCg3dZKh8xBhq09miA%2BtJh5t5HaIQm1MGHyLyIVbirlXo%2BjmO%2FGB%2BL%2FGVoV%2FQVe%2F0Yp0CqX1yjoRy2tm0%2Fs1UfOwkaEn65vBcwh5uT6WiFuU2bhyCE115BH7E63elRp7Lf8qWNi1HtvKVsAeN%2FjF6QFw45HRiUyom%2BZ2C4uTLnN%2B4u6K5A%2F2%2B5UfBGNEiITUT48%2BdMlTkgcCFGYa79TMSNTSTsJAeADkQqEVCg8Yp0xG53yk99rPAJ31%2BVmiuIwk0tWfaqOwjuvtzkzUl84fc2OXb4AgZcMW%2FGAa%2FsCudzi1KRmhpjCK%2FnRkBaDfEBx7hFtmWbBSbc0jZx6UhnP8suMiC40CKpoUyinx%2Fa4%2FzyHwuQmS2s99joXU5SvHuCKJsTQN9Zl%2FL3PYTurYlejt1hOvzH8K5mNuLGgM6POA7STbA62L1NKGl%2B63j%2BGKXIta7eCtxEI6jfs66gbXxWdh4w8MDgygY6pgG%2BmFsu0bzyePLIpnPTCcCqXBA3VkETPCZ%2FWIo1TBa4A2fPJYE5Tv330VIefbbssj5IDohmLxL9%2FGCazwWIcp4A72IUB%2FdADIco16Re5n2Xn0wsTd4YLKoLhERS0irzglXqKcCwmQJxrq8dz6m8MEXbJfI%2BjN3jrk%2F7KfFfi%2BGLqNAY6cuLVj75If3lHX7wxqexVj8yS%2BZ%2Foj2NKfj26oGTNIveKKOE&X-Amz-Signature=cb3ba2e4667c478307b9db985e24d5daaf17e6ae89e5caaf46cb34fc78dedcf2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3NONVJU%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCY3saDdQaNKHPTE6MFsVO033UA0DS%2FT7LROXW5R4qKcQIgDN8ar9ns3PFnKbXxiQseNggz1WT3ueb5d5qVBPhhCQIq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDLjV4p6v4Vl7zr7%2B2CrcA6yfZZxo8%2B3ZwxWkCzjj4C6dNnZx%2FTEQf6p3kP0sGdNHw8yRjWt6wEgdySaH2sps2CbLD8UGa%2FkHClrfdb%2Fmp7FkY0Yq21oFW026%2Bvupv6KMUu3NfPPCaYnIgLbNS9YoI1vUe%2Bjmo9cNVIRD3wyNJ1sXayNMuyPYeU%2FEBVHBWWx%2B0dsgQzSt82zT10tCWPZC9WImAXCCUSnwR4%2F29hR2Wt6DGSyWAr%2FPRt2R9TtR0vbs6E%2B4UiBDrUFwmQU%2FOdP2W59hkWbIr%2FeiQ5cs69cbw1gBIAP8rTqR%2Fu%2F%2FZO%2F7UrgwVqY0evt7B3ej5PNFQbb6xvGbNEX6ju398zcqdhU9mfqg%2FTWAxsWj87aylGQ3ZLwCBto9eYPTUziEeLot4C3P4BqwJf6NCnR%2Bz%2BVX9jZ5XUxp8YcSJL5V7%2Bib4dzxfGBpuYlEIAOew5Nk%2FOsjwloQORc5VWhUtAMn%2BEcZ0%2Bn0jsPUz4uekHJok9JEUE6GOaCVbWAmO7Dz8dw5Y08FiGZo0CsK3%2BSveTAfi4AEg%2BmcvMmiicJSvh%2BuzcoM6igVIa%2FgL2HNoawnLuXTPCRxFcdYpbgkt%2BADrcVgDMgk5cXocIXGiV9%2Brl5Mv0f3iZ2AXLLCgMVs1SnizTinr2CjMKi%2B4MoGOqUBi4t1it57xf4xj5WW0AF4xpDFvaxSDhhAcXcbf2hwIoKphxvi4gZ%2BaePN%2Blbm5%2BGzlipL2%2FNOZiBJNXjZDZU%2FKs2EUJUUM9SrspXHzasffpnSM3hObFgpe6pZXhxx%2B1VnjVF%2B6ZEsGytfG0GqZR774BSV745s%2BTPji%2BTrgFCbWwvEQB7hQ3X9zwMwzfPFAMcog2F4rSHE0L%2B9PKo7w9UYK1y4cI2I&X-Amz-Signature=6b9886f3327396984aec58bfadc998e55be79f90a5c1e757c325551033ede811&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YS3RM3NU%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIBj4X54IlW1YNzyxiog%2Bi3t3vP4jSR2svyXxwF78U4XKAiAMOdC599RS%2FHe%2BuBAugV06oNjzc5QFOelfEkbWjKPDRir%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMuFB%2B0609sfC%2Bl25zKtwDOhrFw0khLbUOF3QZCkb989DpWmyeynwQOpGPh3f%2BggezFCV9t149RA24sNHHOa7y2sVAb1uD26Ct62p5A3yYurT7QTm88ejzoaPuUvptpv56JGErVd9rhZNFFxvMoR0RskOWqbIJa3Q7j6KYrT2bJqJAn0QUn9yjeTA18Mnw3HgHrws%2BqFx6Voji7WjD6nHezZsiDo8K9cEdqhtqQXgEAubHpnYQp0zX1FHfDTnQzFK%2B9FsiWFwhPShnKS%2B4U9Dq0ZRZ8CLZvAvWFc2aYaGWFd4jB1TF04LWzUV5gkj8Od%2B2TiO%2BaX4kyLDIu2c5RdTlDjzTtiw%2FGWt7QT3yxrpM%2B0K3LJnDSC%2FR7k7qqRcQ3hM5LD%2FwjbK%2B3eSvobiAn9jXijpPkB4yRQjpu48mcu73WFQ4KPgT0pLaMAuroyAp85oHzTjm%2FK99gtRzLLM6uyseDFKo%2BfFTHVzLmXGBpMZ3nnPc9%2FJ00aApDe84YEoG9qt6gHz6%2BWmuE1FzFArwxdQkzKvPzCCqcbgyu3uuwHE5LA7poVIBVdMnHSoyZAcSbc8VFdr0BKULtVGySeJ4V5qypcoDabwhWXCqeS66cMvZGZpI3R38d%2BtR%2BzVWusVCdZ1FmB3eo0KpD3ztAlIwxLfgygY6pgHn01fyGrXD%2B1D%2Fs7bjc9U2eHaGhzOFNgwI0OiFH%2BgAUPnhukNxD3siOE5JT6aWfasDCBU25zRF%2FLzCBi42xls%2B9lbltFCEW0RPZAprdcAoAICoT%2B%2FwfiVQbMZI%2FxDll1Xpciz%2B1rT0a6ccvdQ%2FyBlC%2Bmb0nKsJ9jFPj%2FZj%2BwtUpu9oGYOc9ExaOGEpEIkgUzTft%2BXm2uix2wC5P%2FMtxjIWwH2M2Lgg&X-Amz-Signature=c7b3b8d1301c8ba2371e7c66ad30b7d34e0487aa36ca1a0537c3ec092e5d32e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YS3RM3NU%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIBj4X54IlW1YNzyxiog%2Bi3t3vP4jSR2svyXxwF78U4XKAiAMOdC599RS%2FHe%2BuBAugV06oNjzc5QFOelfEkbWjKPDRir%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMuFB%2B0609sfC%2Bl25zKtwDOhrFw0khLbUOF3QZCkb989DpWmyeynwQOpGPh3f%2BggezFCV9t149RA24sNHHOa7y2sVAb1uD26Ct62p5A3yYurT7QTm88ejzoaPuUvptpv56JGErVd9rhZNFFxvMoR0RskOWqbIJa3Q7j6KYrT2bJqJAn0QUn9yjeTA18Mnw3HgHrws%2BqFx6Voji7WjD6nHezZsiDo8K9cEdqhtqQXgEAubHpnYQp0zX1FHfDTnQzFK%2B9FsiWFwhPShnKS%2B4U9Dq0ZRZ8CLZvAvWFc2aYaGWFd4jB1TF04LWzUV5gkj8Od%2B2TiO%2BaX4kyLDIu2c5RdTlDjzTtiw%2FGWt7QT3yxrpM%2B0K3LJnDSC%2FR7k7qqRcQ3hM5LD%2FwjbK%2B3eSvobiAn9jXijpPkB4yRQjpu48mcu73WFQ4KPgT0pLaMAuroyAp85oHzTjm%2FK99gtRzLLM6uyseDFKo%2BfFTHVzLmXGBpMZ3nnPc9%2FJ00aApDe84YEoG9qt6gHz6%2BWmuE1FzFArwxdQkzKvPzCCqcbgyu3uuwHE5LA7poVIBVdMnHSoyZAcSbc8VFdr0BKULtVGySeJ4V5qypcoDabwhWXCqeS66cMvZGZpI3R38d%2BtR%2BzVWusVCdZ1FmB3eo0KpD3ztAlIwxLfgygY6pgHn01fyGrXD%2B1D%2Fs7bjc9U2eHaGhzOFNgwI0OiFH%2BgAUPnhukNxD3siOE5JT6aWfasDCBU25zRF%2FLzCBi42xls%2B9lbltFCEW0RPZAprdcAoAICoT%2B%2FwfiVQbMZI%2FxDll1Xpciz%2B1rT0a6ccvdQ%2FyBlC%2Bmb0nKsJ9jFPj%2FZj%2BwtUpu9oGYOc9ExaOGEpEIkgUzTft%2BXm2uix2wC5P%2FMtxjIWwH2M2Lgg&X-Amz-Signature=c7b3b8d1301c8ba2371e7c66ad30b7d34e0487aa36ca1a0537c3ec092e5d32e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZXYGISN%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T200119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCfkb17UFUjKDVPZNygFLnPH%2FBRg%2BjYCP9JWwF%2BjynkpgIgNZgJAEoBAQl3afUx7lpOZ6WwtWwzWrAFSfPr4ID%2B1U4q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDMJ6zUTQlfqj6tlcHyrcA5qCYwk4dxcatYZghFoZbL6BTT0iEiRCE7QSzr36qRbW1oh0KmJLDZt%2BExNTF6htTDq3nh0uVTrTRJivf0vIk65%2FSWl9HW2wRmlysU%2FWl0fWtVjpty9A9IpAM634JpMN2wRcMFpsX%2FRRe%2BNSNK84T4k2JBan2u8hFMZjiNOShoSQcrOmgFXZ3K1%2BRftyMXUSe6GeAcBVBT5aJjVpxokyaQ%2BEKKxLt4%2FsPUeqMXTEOI9tprAWOGMsil7km%2FvzOvFK%2BVOvGepIYG09M4xGaBXDmrHdOgadxQXUB9AgpeZdbIhGYXSBhcl1Cv%2FTQtaUIJwYl323JgPxT9eK1dDwmClImMYwXsBnkbrm8fqBNkQzoRhJhfJhRM%2BcbaVOXtnsFDt2%2FIQI1axvCFouNajnDtoZS3ZEaDgWRbVdos%2B%2F5A%2F%2BMpLwPC2IQt2Ca8ZW6mrK40aJBoCLJ155cvmtoIXYre7AzZwX2FX2Muu1lDX18ztj06gEOj5CIY%2FalMzerC8HFjvwILNtfFMd1%2FwgYO%2BE6KPaaP1qqLc8R7EG0lIcXxQQQgwDhLlJKDQw3NXWKFCeOFTSAtKtVyuXgCJX9KXCmJPcSg2GYuoVk6pRUJZCmQQhd7aC3EI90Xa1KH24QRcUMOG64MoGOqUBvsgY7nyswNY8BlchZb0UJtMMnQR%2F9GOem9Rv2AncW7SIDCieLBGxFgzhpFUr%2BfNNKo4YotcPriBTTVZGnh%2FMyNS7cUqV3uWMBgaGkGIlJZ3p2fJl8ap9GQcNMzb0yk8PznyJZ6ebZgehkTp%2Bj1QfrKla96kD8T3qhsBizTZ8Jebe7mKUx%2F%2FLoPk6EBbDctr6JBPb6G9%2Bz40Pe7U%2Bwuwvdly1yPf9&X-Amz-Signature=9e5a4025ab25c408304e00dc31a6cec65eb387c4bc736e7cf1269a0b7388fd1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

