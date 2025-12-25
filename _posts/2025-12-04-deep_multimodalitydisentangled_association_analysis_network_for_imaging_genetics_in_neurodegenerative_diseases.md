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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGMWHLYL%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIE9KAx0m0zWKUVGEvHwPiDLvx6ThQ86r%2F5EI%2FzNxVZaAAiEAjbZ6Kf%2B6kkoJQMnpehwKkmoBIXZ7QWazUlOc4dcw%2FZsq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDCPTfSmrWGFU5w5hnSrcA6WnXumbwSI9rv3n3SieCcqz5rc%2BT4GW%2Fah8BZBkhVo%2Fw4xzThqSvaI9vRwLaBd1hnFVNygdQ44%2FI5bJ6xxZ%2FvFxoS9xdoz8vrb32qzBLmduM3XIgach3MbM7%2BePNALomaJmPVzSCFnKjaibVG9mj0ktHbxoSFLItACVZ6cU3u2rcqeBg9nW1GOI%2Bt2zt8MzZkL7CLZtnyBddMBIeagSvuJFfWJWhi4ZXAA668kwXDpM9OvFocdNjWNtrAtnKNH%2BilJfKI63%2BBH6DQqE7oOBpX68GejntrqnoKSG5hT2TlPYgcIoM4lh8L8fz5wRtKIdtiARGH6vLQ6yteAcFQRS8opl8zfM3qJHVUaYsE8tmP4R%2FzV1kYkrAdSyGyd4tTkRiSgliby%2FWfplcXjHVKRriPSOtm%2B7%2B0UpR32C53Irlpk7O%2Ffm4%2BlWdNWfvsZgVvT%2BWnRHj4qgV7qmti3xWXksyTyocCuuzw%2Fbba2o%2Bzk7sWV%2Fxju8%2BMwu0wev82Tr2%2BXA44d78ebm8XG5d609tS1gsZZXCBSEQEzRp42zkyZ%2BFIeOzurGyUamM4uNYnioiQ1m7mvg47vrvbFFeb1gpcBK8iD4lTy60gZ0Bj0TKbXCOJOalxzr3bj%2B%2FwayqZCYMKX%2BtMoGOqUBeKFmU7Gdl%2F0QuPlcvnL%2FjTWjd1DtkgPWeKl8ctIcf3buso3E4TAFdNto3dJk6aHSH%2BXoAu6cRXIiyNzkdaMF%2FocwlC%2BgE5A3oFk6hoB7JezVz6Xccu3eiNTre4b6rd%2B8D3IOpWFj%2Fgo81XlTPLs9ThZViNA5YtqiiP9cQuxTPI7kKK%2B3qffFbiW6VbEtr2x%2BMzaguti3TKjaJEEifVYVesBCL15H&X-Amz-Signature=72f8e24e231e39ac9060832bd2c35ef2bae91721cb7414ce139f8ebb9c929bec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGMWHLYL%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIE9KAx0m0zWKUVGEvHwPiDLvx6ThQ86r%2F5EI%2FzNxVZaAAiEAjbZ6Kf%2B6kkoJQMnpehwKkmoBIXZ7QWazUlOc4dcw%2FZsq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDCPTfSmrWGFU5w5hnSrcA6WnXumbwSI9rv3n3SieCcqz5rc%2BT4GW%2Fah8BZBkhVo%2Fw4xzThqSvaI9vRwLaBd1hnFVNygdQ44%2FI5bJ6xxZ%2FvFxoS9xdoz8vrb32qzBLmduM3XIgach3MbM7%2BePNALomaJmPVzSCFnKjaibVG9mj0ktHbxoSFLItACVZ6cU3u2rcqeBg9nW1GOI%2Bt2zt8MzZkL7CLZtnyBddMBIeagSvuJFfWJWhi4ZXAA668kwXDpM9OvFocdNjWNtrAtnKNH%2BilJfKI63%2BBH6DQqE7oOBpX68GejntrqnoKSG5hT2TlPYgcIoM4lh8L8fz5wRtKIdtiARGH6vLQ6yteAcFQRS8opl8zfM3qJHVUaYsE8tmP4R%2FzV1kYkrAdSyGyd4tTkRiSgliby%2FWfplcXjHVKRriPSOtm%2B7%2B0UpR32C53Irlpk7O%2Ffm4%2BlWdNWfvsZgVvT%2BWnRHj4qgV7qmti3xWXksyTyocCuuzw%2Fbba2o%2Bzk7sWV%2Fxju8%2BMwu0wev82Tr2%2BXA44d78ebm8XG5d609tS1gsZZXCBSEQEzRp42zkyZ%2BFIeOzurGyUamM4uNYnioiQ1m7mvg47vrvbFFeb1gpcBK8iD4lTy60gZ0Bj0TKbXCOJOalxzr3bj%2B%2FwayqZCYMKX%2BtMoGOqUBeKFmU7Gdl%2F0QuPlcvnL%2FjTWjd1DtkgPWeKl8ctIcf3buso3E4TAFdNto3dJk6aHSH%2BXoAu6cRXIiyNzkdaMF%2FocwlC%2BgE5A3oFk6hoB7JezVz6Xccu3eiNTre4b6rd%2B8D3IOpWFj%2Fgo81XlTPLs9ThZViNA5YtqiiP9cQuxTPI7kKK%2B3qffFbiW6VbEtr2x%2BMzaguti3TKjaJEEifVYVesBCL15H&X-Amz-Signature=72f8e24e231e39ac9060832bd2c35ef2bae91721cb7414ce139f8ebb9c929bec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZXOKNWR%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIFwl2bBgQEcc7neivkJyG3HSMlY9WITovJ3Uuv%2BHmNntAiEAnlOKpGO9w%2BU0W7m5cXAvwJl5KXX0Xb2WFsmuoruphz4q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDMtyuFRitaLfvqkOkircA8HoOE668epdgEcMdIlXJcyQgowVuVknXGaXny936vBwgCcdnAXhBhFvQx4zOOFXcpgd25FcfxfrG%2Bvc6QYBWbFYeHgjdkv70d0HQhv16MQkKWPcNpOSFybGjE3%2FAcMF%2FzCbeHg0RioYZu8Lp5lRRV6Hhlv7JMelUBBzidRhQgBcl9oviXTn2h1S2ITwJiVEvynVB3Lma8lBwePFQgUYH%2Bt%2Fsykv00BFo7c%2B6Osi%2BBloXRaO0FaLMBI2bVwha2UREkrAeaSlo%2F4fDZHo8PDB%2Bv3H65u7YtxKO%2FnxM7AZ5XevWpYI8sOUkUmy2fmMxdS7uUAR3EBEWCPxnhYL6yIwdxIi0dGVTmdma6kN4ZWC8LiA0u93Ak9fe4vQJAap6E%2FfzCPJOorNXg6RLewVBrZQAXMpNhFytJN4FxBWJMJa3oYQ%2B%2Fvg6MZDt8jxJIYoqdi%2BUjmSGMamlU6dQM%2BhuT8Ly05uYjgLPe2ahO2rgbN1CiTNmFxQnpWWqMk7hvvLMQSGBDh0ZbVB0nwtJ5TN9o2b8kZwlahX9BFBeSKwcX1yUH3pGftPRekIW2q3K4C8JzV4DMn6PQkX1baN2Uk6vEPXG5hDxA6uW04poCPnln%2BbZuAjp8IDkzEjwV8Wr9m%2FMOH%2BtMoGOqUBTsRJs8Md%2FN7kfiK7YyWSyLs6qFwKF6QI1Y3TvKAHiOWwC%2BJAda%2FeC9MHHt6SV%2Bc9WddRxkkwrD7GFvBnqydMoLXyRH%2FrIcTO1NV1T43hDP3gI7944ILpzPmNRJw5I7dKQP2oYqJXTs4JjAFAFmiKodMNCCAODnm3jfrQIwPt85bSSrdDFeYoYl%2FkZjqnSK%2F%2BE3e%2BWZnA0OJUao1FtskRRVTOxyiC&X-Amz-Signature=2128b4dce8b6d9736bbe7a27e6c10f35e0422df02dbd757bb7df7101fccacb65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466662PWVML%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIGhoWSr9xCIzs6lFE03h%2BQBbuncaKOR%2B81q4S11UlnQ2AiBKTvpQozXN1%2F6OeDIYSuKeNOFNdIrfB7voDeT0pAfAeSr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMW5boMFVIo6zu%2B5TlKtwDbO8PQYcnm%2Bd9ecoIebDKqjzFj2sXMpW04c4ZVMgnnI4Gs8R1pbGnMFXZN%2FcM1%2FTCmNjTMcV511Fr1USXsCbL6Xx%2BxSHDqHjU%2BDPKa3pn0mUGQjnM1K86D%2FwQXLKRZpdc%2FBU8%2BS0W%2BDWl0l3E0dSl0Br4PgLJUEdZY0cPHIM5Vfs8n0GC7IvzKroUKxPIj9AxEZNMI0WuKn9riJmcGxOwyS0fwg4MYAmTKC23CFyf2Zc7ZiwxOKNsGCLnru%2BzXxIRp0g99gcLjfwEJ%2FFSmHAHtnup07xxkB0kDFTHbbr1XfUQZ3v7%2Fz8jo4tMQhUT0otRSVQnOJbGehXVp7Skk%2FynHT7%2F%2FvO%2Fg31xUHJr1H6dAQz3Z8iLa8MYNbvrTm4VVnbpmvAV80psR1rPZcsKBmcfKYv6UogN8o%2FKGy39IgGn1HV3iPJFDUlHE8DuTR%2F%2BNyo3Pb5g3inEGaxUs6x%2BrZS6nhzKouq0nMrKPYWiFZyOGkPuV0RDUxg1a5GyOOxdtZoYhhRl8C4EAzI1aYdu%2FURFNbldeL8GHXw7K0Sc0qMX6J6cQpuVFRcljWK1UUO9O4B2rnCYDTk3LULfSqdxW8R3MD7sj2p4G2t13LodS6B5E616fcGCQn9CSLwoiZ0wj%2F%2B0ygY6pgHvA2Q83nw7PIJgCBpTVo%2FlVW1%2BlsDObjewy2nuOWqpHD4qjqZdI%2FcpcE0n6cDbbaMzgnB8kSw42Je71bgsc6GCu9cbG2bwPOKzCgzpPzsHEtfFrTI6A6C19LEbX9rjoY7b5oHnWC2MsHkL9yDnpR1YLBntJE8ebLYDxQDFewgjvxeJGZJqV5p5%2BhskWa5ausKa28cgvXF7sQhOXvDsbVGWhoEB1yIx&X-Amz-Signature=914ab7686b7cacad59f8d5115e6231d72e696cb0d45602199d79c51d6c10de09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466662PWVML%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIGhoWSr9xCIzs6lFE03h%2BQBbuncaKOR%2B81q4S11UlnQ2AiBKTvpQozXN1%2F6OeDIYSuKeNOFNdIrfB7voDeT0pAfAeSr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMW5boMFVIo6zu%2B5TlKtwDbO8PQYcnm%2Bd9ecoIebDKqjzFj2sXMpW04c4ZVMgnnI4Gs8R1pbGnMFXZN%2FcM1%2FTCmNjTMcV511Fr1USXsCbL6Xx%2BxSHDqHjU%2BDPKa3pn0mUGQjnM1K86D%2FwQXLKRZpdc%2FBU8%2BS0W%2BDWl0l3E0dSl0Br4PgLJUEdZY0cPHIM5Vfs8n0GC7IvzKroUKxPIj9AxEZNMI0WuKn9riJmcGxOwyS0fwg4MYAmTKC23CFyf2Zc7ZiwxOKNsGCLnru%2BzXxIRp0g99gcLjfwEJ%2FFSmHAHtnup07xxkB0kDFTHbbr1XfUQZ3v7%2Fz8jo4tMQhUT0otRSVQnOJbGehXVp7Skk%2FynHT7%2F%2FvO%2Fg31xUHJr1H6dAQz3Z8iLa8MYNbvrTm4VVnbpmvAV80psR1rPZcsKBmcfKYv6UogN8o%2FKGy39IgGn1HV3iPJFDUlHE8DuTR%2F%2BNyo3Pb5g3inEGaxUs6x%2BrZS6nhzKouq0nMrKPYWiFZyOGkPuV0RDUxg1a5GyOOxdtZoYhhRl8C4EAzI1aYdu%2FURFNbldeL8GHXw7K0Sc0qMX6J6cQpuVFRcljWK1UUO9O4B2rnCYDTk3LULfSqdxW8R3MD7sj2p4G2t13LodS6B5E616fcGCQn9CSLwoiZ0wj%2F%2B0ygY6pgHvA2Q83nw7PIJgCBpTVo%2FlVW1%2BlsDObjewy2nuOWqpHD4qjqZdI%2FcpcE0n6cDbbaMzgnB8kSw42Je71bgsc6GCu9cbG2bwPOKzCgzpPzsHEtfFrTI6A6C19LEbX9rjoY7b5oHnWC2MsHkL9yDnpR1YLBntJE8ebLYDxQDFewgjvxeJGZJqV5p5%2BhskWa5ausKa28cgvXF7sQhOXvDsbVGWhoEB1yIx&X-Amz-Signature=624924aa4ffcfce565c0b9801fb6702df3ffd3c8f4110527044ac4d1af484573&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WHD4QFG%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIH%2BbS5fXxv7ycYFOSby1%2B%2FTGwS52RGL0YWL08cGIJNuhAiEAjCk34YTA9MixT2PdaoiLrw3G9PAmY%2FoVwUQ4Qtj%2F3jcq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDDkUBcxKv9hzqSOk%2BircA5oSzhXE2d1wh09T1AMUINb2RpaagSR56FBUeBBA7hAbVORvbnElnOtj9AFkpL10r4IYGFcM82%2B%2BqVJyU6KEpBTug2ms1gy3GyTd7MOfZmfDAPVAqRDbOdxw%2Fr3sp0D%2BGERhaPGIYvmV6hA9IM%2Bne6BZMNjLTMmXuV8kyCLMwBIH%2BFC7on%2F0LFbvanYXEETcMpYJw4zznTJzQnZ%2BvolA34PTiV6hTthAnfbcxtbT2BkbOVNF1cSRYhTHY2867aRN7gZGEgzZAo9CV7yY358kdmdnM99IeBogT%2FVekklKJNefqpBUVLbR0o85MGxxfad%2FWDKlIP6b1XIE7qZrbsZyOiP2aJj4fMgHkV6kSXfjvCyHlE4fo0F1xj1JnQ5wxoAIul%2BdjD55ctNvkqODW528ijnmZiP6XCqSVzoXw95Bsbm4l7GVDtroSeAjS0TE6jN6R4qA%2FEdBmiBTU%2FHrRskUi869aOePTfwDYrmia5tyCFRWTXaDsrOLihZDWYIrMKxGmvFjoO68v1zd%2Bm%2Bo6lVwA98LW0R5I2xCzDUHYrD2DgIOnjWRL4xgUEsnqbsETk8SBti5y7iy3DL%2FrLnxhZ1aRcTYYZJ2dRZIoB9fl3Ku6UgiHdxPbioNUatneUICMPD%2BtMoGOqUBtSi5UOsIZYEBx2GiAZVUmvlYFBh1NNHiIlkBIbHdCb%2FTAax40zcPtvVKxhPs3m5z9pxe7honhw8ek4Nlua%2BDvk8Gp%2Bvo%2B1Bi0KIYpCP4IWPBWvnhtPtCang6Jvh3cE39MxliHFmRJZS1ISKkKsJKHIiKbgP7I%2BbVPBVYOCP1qLoTf%2Bg1YoLAnXP8%2B9Qk0DMtWEI%2FLvPleUTU7IcdeGBCC5Gal00f&X-Amz-Signature=a9a6317c30f3f938c7c218ef108eafccffca01cf0e3c88d916d1b3cba80d73fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653QX7PUL%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIA%2Fyfgxx59a%2BSgjveNOdM50UHcVKMcSf6xm1oKv%2FaE4DAiEA7orXb%2BOeD0pA4wsmaThWFLYOoIzYQR9UwgHTTzSo4roq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDB%2FYOdT5a%2BHcF3V%2F%2FircA0gnfPaWfBTJgb%2BO6rWs1XZNtQdkl2wLaQkupyz9F2lHJnScY1183I%2FbnZFotGA3L3M%2BRqc8pCfm8tMJtvF%2BZK4bhPfKGjy2d6qlimEICXCnqosZLuoRA1PEEeW5ogQwHuTtKNyhev9aiim2ieX7W30%2Bb32Ajodb7W2Z937dcfzvaTEjBno%2BVV8TqJFSRvN7b1mJuFfoIILQsfSXFlQDIFapwxSpQP5mvCpccECGaHPAiZ7M1LDZbt2rWvRP8pHgnmTI9LbZn29hmdv6N2fZyEQlPdeyUe5whtPUl8bFIbq%2Bpaj83zUluy1KXb9EySSeMRWQkbOSnTmXvS6WD%2FRmvnwJwIkXX9vxKpOMcaBYOMj8X24Ta5CNBl3ppiLTHvjldaYeGboLrwvmFOUxpLPv9aLT9jlLbAw%2BWCusRm2sUoHYW7930kbrxCLaNfSXhv0JrnKCRU%2Bs6zYhnBtyWkFz3mB8etETxqunH6nJ1xVDm6gxbmwWczzJD5geXZGH2gjlEIij0VWERqvp%2FlaCxeFKmiIWvKLOKXPuD0zH8eQB7LhMQhJxIU6RPuEymBOTaNqk1RvQ00nmkH1VQUr0LJsOjIhXmeJ9rF9ADd5zW3f2YyPJs3RooZunv17tIcvSMO%2F%2BtMoGOqUB%2FKZxNrbvQbIHMCAH5Y%2Fu%2FLgiR0znmG3e1bfGLh9AWXdfPKCFsmaeulpE5DetyL66TW2HxbQMIg8lP13b%2B7tvVLLFIdOsq2xp6ywgl29OETUXZZjd2AoHMBrBOBrYmD2FwIznQ3u3V2GJK4mEWTSTx9S4I3gYpnIt1tFGGcCBv5Ne5CC6Qx6fSNvbz0XljD3bMRhFbA1%2BI%2B4RpFRi%2BVu82B7JzEJP&X-Amz-Signature=d22a0398dcb8b866c4fb30332c4f5938d5c3a06fe0010ce3edbf185ba496a49f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYUIIERP%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCk%2BQwSdkgkWbnNO63QRG2JPsOU07Q8mCP6Od45zPVFaQIhAMUiKNZPYAHZny9MldaejMHJ9g4uoNcimSxyTGjRFQgLKv8DCD8QABoMNjM3NDIzMTgzODA1IgxEmhvhBYEnDcKBX%2Fcq3AMPMre4UFMSWN5Y7UWUAwLBU5MbPoU3hNZHU8ZsEt8PHT5g%2BcNPS2E8bHHEfJDqWJ5axCU07pwxRyxjUqgEFKFPzwlSveUf%2Fi27v8u%2FV1CA%2B%2BLWZ2Bpu%2BZ8tUylnkUJDLW1bVnyHM7luIXMMz4k57OpKwrQuo%2BjWRgjsGMTPjz%2Bdlm64CgMXZVC18dBLYYlGHfR3Y6149405sX4u9P22wjV8cQml2keHQrta7d4QaN7%2B%2Bk52zkXrmRoXmNLw4cZfjuvIH315jS98GUIK41UcDTKDM97GYEm5qb22F5P5Ye88DeqdztqcMWBe28YRojEsNw%2FI36qt2yusXohazlDBWPijVhQ1yTxhD1Cg3ysSX136%2FiXLGnleGhKmMm1mTsdLFx9iunwsPS%2BIwlUR%2BhYAaPtFpH4Iu%2FTJvo2JsFii650huU0%2F%2B1nWU%2FgLs04r58y%2F4Sl%2FXYfhNDMfUgKpFK2RQvJyn5AeXPUzrnZjeUyw9rkvDU9i36BijXEWP7Sg%2Bwn7nrcLjIlHv%2FBdTjH9kdZjFfAUuOa0POJuzqYYwhnJ%2FeAcjifxPD3j%2FpFbgL0gYhQObt1zV%2BLowYLGxdtg%2Bv8R%2FM52HMqdDoS%2BKcIZXjNnz0HPbiQjRr12sIxuirPbjDw%2FrTKBjqkAUjHj95ckmJIAYYBWCAUN2uCS%2Fy0Rji18Cm7KPAVfCDtHm2DTfImQDddvwni9Wn8ZXUMTm3WfGSX1CxNPIabe7XVvR1xh9fqPxsYcLAE2Tgx0UPiJJvQuDGwJIfDzDQopnJKeNOX2hakFs4PTl0DEVO9SIkp1p1PXpR3qGg0ZdRxhdSTyVfzScnpmbLU%2BDxwdeLMYx7aIHdi7HScvL4pUCPvsEOX&X-Amz-Signature=b22b7bb6c5979406bf167687b1840cc6fd8567e417edc500edbfc505438bdcf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WTELTVP%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDk%2BcaCnaI136AFScXJklhMojRl3ZJ9gNNCoqIEAkwwSgIhAKHCYhALsiWfgJdwb56KG6LUMK%2B%2FgUqGoiAuuWKzOWA6Kv8DCD8QABoMNjM3NDIzMTgzODA1Igy5Jz9tyunjJXhzM5kq3ANmFOqUL02vbC%2BuDW2%2BUpfUPETeupz4nZkC%2F5748D0tChQ04QQYIq0w5Lly9fcx7Zq7DCbHk%2Frdq6oUZ54Pqmc0RQKKJ1xrn4lK5ZBgeQQxI6ssK1cU6dY%2BYGJXuQ4UEPb4usKRLk5ccws6w1ld0ayAxjC9Pk5fl4IqPEWYSRO9tXhVi0INfxl4l%2BUFlcwYxX4sLAPd%2B4%2F%2B84QZ7c5k0LWFfZmP0VrWwLWuAwmb21WQVcSoErQm7ruHc3wAHdDI6mpHKWxDjW1swNvRdUFGgydUIumYsdsmDrRt3Z1GXWMZ%2BMOXxuowTQIIB7C6JOizQCUb3lQGhwd5J1BJj3l%2BDTj0RkYbamWU1SwptizarGnMhpW2DtqzyRm6eTYInuEjdotS4DQIBRw0wrfxuv37xQqQ5p8YBA9VDol40uHfjkb3YxlTEilUkjYn%2FLCWthQy4BDOzh2S09PcNQMFBEKz5maF2HxACMYmimJcdhdtb%2BdhRXhsDjo8PU0bvyXUD6TNQRHNYqpFTgtnjPjdyntuXvE9UH8rtCfpN5JNWJUyb9hmLclltgQT2bOv8KKGRKNGuW30fYqPgi93azyX9M%2FWerWuD9nFmejKZRXTjdga5MCU0OebM57YMmGjnGh99TCb%2FrTKBjqkAbNlWgbIadBqzPJnRaphe%2FuYWcGJuGuGY5TOlqiI2EuIsJmoVxLnjN3eETeHse%2BW5xMoOMlEfuG99YROqSJyeFZs%2BhSI%2BxCRdpec5SpONI1ynDiRGkSzUALYd5TP4nmUfmEGHbP8CDXE84%2F4OlN3Hom%2FknZXhs7pxskZpqRtF26ITS3%2Bbned3rOplS3ADUmsbzaF1%2F6t%2BCRp86Lz3pfRQi6C3%2B%2Ft&X-Amz-Signature=28aaa27afe481a58120485d715f2cb08fe5751b0d85d6cf9874f41a15b833a8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WTELTVP%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDk%2BcaCnaI136AFScXJklhMojRl3ZJ9gNNCoqIEAkwwSgIhAKHCYhALsiWfgJdwb56KG6LUMK%2B%2FgUqGoiAuuWKzOWA6Kv8DCD8QABoMNjM3NDIzMTgzODA1Igy5Jz9tyunjJXhzM5kq3ANmFOqUL02vbC%2BuDW2%2BUpfUPETeupz4nZkC%2F5748D0tChQ04QQYIq0w5Lly9fcx7Zq7DCbHk%2Frdq6oUZ54Pqmc0RQKKJ1xrn4lK5ZBgeQQxI6ssK1cU6dY%2BYGJXuQ4UEPb4usKRLk5ccws6w1ld0ayAxjC9Pk5fl4IqPEWYSRO9tXhVi0INfxl4l%2BUFlcwYxX4sLAPd%2B4%2F%2B84QZ7c5k0LWFfZmP0VrWwLWuAwmb21WQVcSoErQm7ruHc3wAHdDI6mpHKWxDjW1swNvRdUFGgydUIumYsdsmDrRt3Z1GXWMZ%2BMOXxuowTQIIB7C6JOizQCUb3lQGhwd5J1BJj3l%2BDTj0RkYbamWU1SwptizarGnMhpW2DtqzyRm6eTYInuEjdotS4DQIBRw0wrfxuv37xQqQ5p8YBA9VDol40uHfjkb3YxlTEilUkjYn%2FLCWthQy4BDOzh2S09PcNQMFBEKz5maF2HxACMYmimJcdhdtb%2BdhRXhsDjo8PU0bvyXUD6TNQRHNYqpFTgtnjPjdyntuXvE9UH8rtCfpN5JNWJUyb9hmLclltgQT2bOv8KKGRKNGuW30fYqPgi93azyX9M%2FWerWuD9nFmejKZRXTjdga5MCU0OebM57YMmGjnGh99TCb%2FrTKBjqkAbNlWgbIadBqzPJnRaphe%2FuYWcGJuGuGY5TOlqiI2EuIsJmoVxLnjN3eETeHse%2BW5xMoOMlEfuG99YROqSJyeFZs%2BhSI%2BxCRdpec5SpONI1ynDiRGkSzUALYd5TP4nmUfmEGHbP8CDXE84%2F4OlN3Hom%2FknZXhs7pxskZpqRtF26ITS3%2Bbned3rOplS3ADUmsbzaF1%2F6t%2BCRp86Lz3pfRQi6C3%2B%2Ft&X-Amz-Signature=8ee1bd6c26cfd32e860a15c13e931696632a74b39a095d566eb5548bea90ab21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQWM6OOG%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDcaAhXYPhP2bui8%2BzT7zCUxg2vd%2BzbtOPA9mMlkA7J3wIgQy1VnRlKxtIryVTugqFAicqpFPhviUy5%2F3qwq8xDNRwq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDLHfgWwp64LbYP%2FjHCrcAzo691%2BIgzZF9STCT09jv2vg5frBB3BIQxX8mRrUtsmJsHnTMEa3KkcLOFopg%2BKjzSVXt3NxhxFc4mnPlnf3zBKl6w5Ux4WFkNCTNfpcOh4goi0RSuCMiMTkTPMOvgIYifxvQWtFD2O3zyJ9tmVUofMuw%2FcjGbrOM8LfexRivFvNGfLVLLd60G5uwXk10ZSh7%2FlkQwAW%2Ff7qWGg%2B%2FWt4mN1xuzka4PXy7X70w941wE%2BbIMaKNqvFENVi%2FpqOmdMuLxdjfaUxvXjZAwF%2Fu5yJ5RsxhgZXwPrTCvlLTAKsDWB%2B1BiSLSzhZnAKISjhL9zr%2ButNGKmPuu%2BsKJOTMo%2FFfzUlD%2FTicTnMh%2BBGFOVxQiMxCck3MCCNDOnN3C0ALFgoRm43tRkjIA4JyDbaxLlLbyPzqY03d%2FSgOlSlGT%2BtDIEv%2BmyZWaeYXvrtLUbeKH%2BWt3LxH0JHbxWkCJ6Z8yapwrPlITECIJh%2F5%2BCl2Q%2FrORiJS31yc8m6P%2FitK3mhgXDOvSdJsAv4W3jgHLqe1cvg%2B%2FPlSi7IRXdoOC1TTfnje8eTnSNK1u3Z23dfySbnG2pf%2FsqKprH1gWxOyVt4bdMgE6uiDtG90vgrJor9nSIc6hT%2BHyue5zPjoLjMwDguMK%2F%2BtMoGOqUB4gpnoPd%2FSiO3uHE%2BXXSE8IVlRjaq7oS%2FhP0nldydjbbe5OBGiAVWPxPAPxCiZ1C%2Fnu88UcfKbcDFeyw2MkcvB8DZTsnPJgoFMnieYVr1m9Nd%2BCXllI6zVwjRyc87XFQe%2BCVYkS3ULu6CHJTZmbl1BYcE3R3gCPycrWOfzQKi0FK2xRokeWCo0u%2BPZhOiNKMz1OYk8SKD2P4bO5bd5shpmIK8rCCc&X-Amz-Signature=2ba6040a5d89fa58f33750f2180c4150e339684f7a8c0a6db1a810060abb0091&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CMJ67GE%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCP%2BT0m5m30QBglgBkt2QbW3zB7XnmonoD3sLR%2BE3ZA2AIgKoLfPFzY4%2FONyZCmxghiMq5YiieO1YHtX0nhWwXr6goq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDMSRbEMh5B%2Bog8%2BwJircA387C4KHWhvjKRTmlBajylcjh3g5AgzVujTETThUH5j2yqB0tPQxgBM1IU7MvfYDSAqejR54FK5kiR8WK3w63KXY54sI4%2Bd9ywmvGY56P%2FTCUyp2yBwppI9PiOr2CxcvVZ8UrvA1E6fdQdKzZZ%2BuiMONg4BFjVSQ%2FYco0dl5Yn9SY9Wb6wQssvcG%2FVTv4Ma7DqfeK%2FLOE7Z5q7AonjCzPuZR3cHjAfptUtKLnHHR5h3tL3NMsKQjg2dCiM8WuQkhx%2FxdPzmxFyR94lJN4JQOroogaTEwAn%2B38Rqhos9jsKrRaSclZqQ7zD5pxa%2BBie%2FfGYFs%2FpObvyN9MPTs%2BVVzl1INYKwMZN63PGAQFmXKm4sCvXq%2FpFTRAU3d3o6gyCF47stDXLwngDEUEh%2FsbGcSe6gLBtqAgUlAhMk0FFmX6q2skz6kz%2BuuQMBDbMLJM0S0PkyO7mHxhKDePn0BNnPhGlIvFD0958AVWXxaxaUR82FL0JeDil%2FT92%2Bq9JYbvVXZWIBDmHxszwDJB0s63Jav5y%2Ba7o6Un%2BC92rfY%2Fsm0k4eQsDCXT69R2TUnT%2BDpi59iFwlDMAlprQ6GDE5%2FT%2Bi6Ox9aXZJqLaP77zjWRoKdRNmK%2BxJjD48SipThVWaBMMv%2BtMoGOqUBAU%2F%2B4qesXFlHWqFort0DiNC15BG6loQ6Jnqvu50i9a5V0ILuDLHX%2BLWXVIs7pdlIfaXOwjF8ctdJ2D9zpnVWJwRHeC31J%2FGeQ%2FDhuExeCRgtggZ2%2BVkVWVTVWpX0NvegMnvNbYfwLsgTjWyx9R6MNcsdrZ3xtIWBuQwapeGWdw1MOGZvjx2IerCWaeEVyTkenQMVOMtrcXaRfJZCXbOeKwmUjxMA&X-Amz-Signature=18932fb84b9f237820b3ec8f31029b4b59bb3f4d140e1a8459556bd6eb3bb151&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CMJ67GE%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCP%2BT0m5m30QBglgBkt2QbW3zB7XnmonoD3sLR%2BE3ZA2AIgKoLfPFzY4%2FONyZCmxghiMq5YiieO1YHtX0nhWwXr6goq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDMSRbEMh5B%2Bog8%2BwJircA387C4KHWhvjKRTmlBajylcjh3g5AgzVujTETThUH5j2yqB0tPQxgBM1IU7MvfYDSAqejR54FK5kiR8WK3w63KXY54sI4%2Bd9ywmvGY56P%2FTCUyp2yBwppI9PiOr2CxcvVZ8UrvA1E6fdQdKzZZ%2BuiMONg4BFjVSQ%2FYco0dl5Yn9SY9Wb6wQssvcG%2FVTv4Ma7DqfeK%2FLOE7Z5q7AonjCzPuZR3cHjAfptUtKLnHHR5h3tL3NMsKQjg2dCiM8WuQkhx%2FxdPzmxFyR94lJN4JQOroogaTEwAn%2B38Rqhos9jsKrRaSclZqQ7zD5pxa%2BBie%2FfGYFs%2FpObvyN9MPTs%2BVVzl1INYKwMZN63PGAQFmXKm4sCvXq%2FpFTRAU3d3o6gyCF47stDXLwngDEUEh%2FsbGcSe6gLBtqAgUlAhMk0FFmX6q2skz6kz%2BuuQMBDbMLJM0S0PkyO7mHxhKDePn0BNnPhGlIvFD0958AVWXxaxaUR82FL0JeDil%2FT92%2Bq9JYbvVXZWIBDmHxszwDJB0s63Jav5y%2Ba7o6Un%2BC92rfY%2Fsm0k4eQsDCXT69R2TUnT%2BDpi59iFwlDMAlprQ6GDE5%2FT%2Bi6Ox9aXZJqLaP77zjWRoKdRNmK%2BxJjD48SipThVWaBMMv%2BtMoGOqUBAU%2F%2B4qesXFlHWqFort0DiNC15BG6loQ6Jnqvu50i9a5V0ILuDLHX%2BLWXVIs7pdlIfaXOwjF8ctdJ2D9zpnVWJwRHeC31J%2FGeQ%2FDhuExeCRgtggZ2%2BVkVWVTVWpX0NvegMnvNbYfwLsgTjWyx9R6MNcsdrZ3xtIWBuQwapeGWdw1MOGZvjx2IerCWaeEVyTkenQMVOMtrcXaRfJZCXbOeKwmUjxMA&X-Amz-Signature=18932fb84b9f237820b3ec8f31029b4b59bb3f4d140e1a8459556bd6eb3bb151&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBXQVUX7%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T181319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCICe8mnfKHvdj2sngmybuhqGPhIXrtBOEi84uUU%2BIMCIWAiEAuUI4qLDYnLW%2F2jytWRoOTEYGCPrrCB711tBkYvyse94q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDFCQQ%2Bdh0%2ByeageUECrcAx3M4vnj5DfjIZlK2HYkP3fLPtU%2FF4j5bZ32qn93gwsOqg6%2FMmCJU5inwhK6AGMzvcaVPK6F38WwLPyALQyBH%2BfNCy%2FpgoPWoq%2BDH1hFTZYkHpFaXixn88k5ud0SeoQ2KRFcUAvvp4UTsD4jKxXh7CDV%2F1srmwI3yZaHAmpraK%2FkkCr3sYD1ze4Yy0t4RXWdO8Wa1AywTaTobQ0QgHodDfpLSSyGBJP5THXGy5E7QGE6ueTYYDG5bfkxXOHBn%2F3gI1y1spzK4L0X7V6ceUZAJAL59yNFoVF%2ByrwS%2Fk%2BrkzF1P%2BY4y5mrtuDI%2FShDwENyYpPmKOplvFiZu2uTolOR9CTWl%2FWq4iP1CXho19lv%2BXoD0Jij0DzJzx00tBmyowoiDHgodDYh1ytMr5u7%2FTVBhoC%2FUjEXr%2Bi9iAf5aF6PP36r06zy%2BasjfLH5BDf8LLKDVfcDewPNJd%2BkO0olQElrluZpkLlqXheIssPbCIaCBQzsPt5wWx0KngSH0R15H5Op99GPcW%2FHEsZb8wItvecGTHf060zTEPaEvGZfiXMB0PszHLQTyblRHCRBI8oykMdwKp%2FJYDVVZOSaJVeevmvCksuSA7DZVfix%2B5bZsBDEDXFyDzGmZd14VcUV3x9fMNP%2BtMoGOqUB7cAKlAdbubpBZv9iEVpgKWqOgYJz4UgZqjOSstedQvUZLSPAGHm0mhUEIRXofPm7kwIHQ9cnF8hEmThVX4b74h0Amc92HeQPBUy9pvGQUEHKex6z3OgI8r3t6v1aDHGllktMHMD5b9qkdi%2B%2BGwE%2FpogSJp%2F%2B8L1QBE190ua2XsIJL6hW%2BezDng9P%2BoKpdbZmYXrfMDbu4fyh9VWP8dIFTGPhKNIZ&X-Amz-Signature=fde4da93d3f76f6306801435056e03e39714520412750f57f76010e229f8426b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

