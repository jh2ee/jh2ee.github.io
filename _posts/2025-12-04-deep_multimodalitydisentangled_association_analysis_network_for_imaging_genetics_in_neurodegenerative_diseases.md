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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZM4AUA3%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCx2U5uqYW98r9Q3tacF0F6LOh1Lalkr%2FSSuQ78acVEnAIgW9gzgA5Kk%2BU4yUdLRdFnnsCUy45paCqpfu8zgyITHCgq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDD2bKSH863JQsdQT1SrcAxgDCdtUGxdxwOn%2FNLMrIN8ccRTho7DWN8oeiJ4eIALnKKUQ%2B%2F69G9rTWafoJIK2woBaCgSR2K3%2FGxwy1lUZmMhliG7r2exeKqjPJT%2FvPF2xhpKIjMQaes83RaRRepxFfGSp8lmxtzw8pb20jUYq2BU6H8j%2Feua3lUAv9%2Fi2Qiht2hHeH9hkQ%2BY4x9WZ8%2F7U%2BcsFRcgwN5j0rAFH3nNx9bsDDTUb%2F0X%2Bewoq0xIwcMs%2BvJf1MsPDYfKzPL5tOzAZWmqGDMwOKoHZ1cqfr1LcL8kK0upEvnAyAQMisr6kJ3nElDcqr7Ee2QE%2BDm%2B0MbpR%2BhPPpkGXMixhuL1NQTEmcAKjvevL0XRpCxsaDOZ6slxFWaVeySbc6uTrCtmJOy665LI8di5QlpntK3SSpAQNDNlJUKPFCFSlKsB8mnWb48SFBFyZmmxNxvgdumYgoVKTZZQDk6YvZy9p3IqQutZ3hrzWA2rVaJAtCkTSi2Wv7FGwWcpQihZTEpbTQDVyJ5yG9eoiwqcGTSkO6VK4x3OCNMTn7erll93J5ItzTcr92ChdTfTkueUMhwAZDMH2ZHomDeX1vwEfjbebmnp08VrF9rnTmg%2FFytaqx8XHsqKihxb2NCOa%2BDHESBjlz4NFMNvM7coGOqUBcyNfOVhF60cdskBTqdXXdp0kUedhJ386G9aCzg7VbSkwo02OYOADSpTZM%2FyP9x5mDHvZNvhCs41FV3E44MpXNm16Br%2Fvx%2B%2F65YGnTqCxUDQG55Qt3nrxC%2FnJfGFsxvO3GzcnxZKbJKjt7MFOanxBr4eiv75hLXNaKoUwo3xtmzJ%2BGvXfIkAH8n6ZlvsvSRUeNJamUFJx35Pe1eDdZ6W0%2BIoCPz71&X-Amz-Signature=95bb82125a434977ce674070d33241997e8106f671105445e6137020e962ba2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZM4AUA3%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCx2U5uqYW98r9Q3tacF0F6LOh1Lalkr%2FSSuQ78acVEnAIgW9gzgA5Kk%2BU4yUdLRdFnnsCUy45paCqpfu8zgyITHCgq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDD2bKSH863JQsdQT1SrcAxgDCdtUGxdxwOn%2FNLMrIN8ccRTho7DWN8oeiJ4eIALnKKUQ%2B%2F69G9rTWafoJIK2woBaCgSR2K3%2FGxwy1lUZmMhliG7r2exeKqjPJT%2FvPF2xhpKIjMQaes83RaRRepxFfGSp8lmxtzw8pb20jUYq2BU6H8j%2Feua3lUAv9%2Fi2Qiht2hHeH9hkQ%2BY4x9WZ8%2F7U%2BcsFRcgwN5j0rAFH3nNx9bsDDTUb%2F0X%2Bewoq0xIwcMs%2BvJf1MsPDYfKzPL5tOzAZWmqGDMwOKoHZ1cqfr1LcL8kK0upEvnAyAQMisr6kJ3nElDcqr7Ee2QE%2BDm%2B0MbpR%2BhPPpkGXMixhuL1NQTEmcAKjvevL0XRpCxsaDOZ6slxFWaVeySbc6uTrCtmJOy665LI8di5QlpntK3SSpAQNDNlJUKPFCFSlKsB8mnWb48SFBFyZmmxNxvgdumYgoVKTZZQDk6YvZy9p3IqQutZ3hrzWA2rVaJAtCkTSi2Wv7FGwWcpQihZTEpbTQDVyJ5yG9eoiwqcGTSkO6VK4x3OCNMTn7erll93J5ItzTcr92ChdTfTkueUMhwAZDMH2ZHomDeX1vwEfjbebmnp08VrF9rnTmg%2FFytaqx8XHsqKihxb2NCOa%2BDHESBjlz4NFMNvM7coGOqUBcyNfOVhF60cdskBTqdXXdp0kUedhJ386G9aCzg7VbSkwo02OYOADSpTZM%2FyP9x5mDHvZNvhCs41FV3E44MpXNm16Br%2Fvx%2B%2F65YGnTqCxUDQG55Qt3nrxC%2FnJfGFsxvO3GzcnxZKbJKjt7MFOanxBr4eiv75hLXNaKoUwo3xtmzJ%2BGvXfIkAH8n6ZlvsvSRUeNJamUFJx35Pe1eDdZ6W0%2BIoCPz71&X-Amz-Signature=95bb82125a434977ce674070d33241997e8106f671105445e6137020e962ba2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CKVRK4G%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIAOeprcVPRNW3EjeCUZMMnj1Z%2BLbV32Qzd%2Fg9GRJ9YAtAiA75q7UxGf2RHkbnkrnrHYrRnhkJzNYnNrJy%2FoxXvf5Xir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMk9yaNiPim94wTsXsKtwDCkpq%2F5Pr6Y4LXnRAu0XZn07XkOZ4svkraI9VNWqeVbEDZ9u5H4jXCGgwH7dREs%2BNicc5ZnBgSdNTARPP3jfATwAYZNqadMCe%2FBpJ6826N6AJbGzuhSoenq5wJr4G%2FewQP29pjcYSnPheEfq6CBIWwH4r%2BOq%2Fatr3IyyTQN%2F0bH%2BW4JaVUnXWENtBUj3j6co3H%2Ffg%2F5wgYrI6f2xQUVrOyFMMGL1zFJ6epmSm9U%2FuLdx1SSCzoELvc4IdLXZV1yF%2FBCpJN2arhUkHfgVsyg3OhQQA6poIXYtsFS2jx%2FkBmfjAyYPdmcCeeZhNqD%2FzWEQ6LzI1v5Z4dfJDqAtvwnOSq4qyAYjnS13AvkLQTBlP4DotyQqYTtsIX8SXqV%2FKqiIMb8hLdi3nT1W%2BNozvFF4zO9P5b8XYyGgeZCvP%2B57V6ks8hk%2F8bK5UfZVQC%2FEPrLedPd0JHko9%2F00hPX6ETVBE8MBLlNRAzghHw0B7qp1FB9HTIYZWLeuplYalY82PHqMmFhCgcFAdVytNrgmKdsfSA2GiqDzo9x6VjARTHQp23AZwMc4DRiLwfdFyABtYd1uNDpoSKblsoj2ucSvrIjUlREHLefZYNXEhED%2FzBbSir5vhriJfQUIUgJ5%2Fkoow4tbtygY6pgHVkBHKixm3Nb%2FTAm7pJhmngkgSWWIi8teXvg3Uso12rpM01Gz1d%2BiMdkbiFn%2FIAiYwVfoS2GvYHZ3YHZHrfzKviEmGpRYkZQY2LAjynYPpQ%2FvwpiARB%2Ft9vVH2VHstigPgNwQ0W9NABFIhTeisdQPBnVVdxKax3mwyLZM871v8Cvk%2FPNNB6hhIPW%2BPbhy2Rjqw7di2h1KVGRI6CAfMI8umtu4pVqv5&X-Amz-Signature=2eebd9e74d8b9be706991ea1c2b5456e7b8bc1644a7b473d6e7dbd45e8387bf8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHAJGF3D%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIAD9wA7v1EyYDUiRC0ckh1uoAYWrFYIMaEwyOSw%2F4AeeAiAMT3SK0AuL7N7QdlYC6qM2PPLdD3m4v61wZAO5yiZltir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMgBdjyj9D56n8p%2BOjKtwDBcB%2B0IJyazTPR5bVOx%2Ft3iAueEe5IEyu6OWvHIfBdinhavmw%2F0fP416QWBA5QgrS9w3n6mP5bIP%2BBSzGRZmVjd72WzrH1QAN6xmUbc%2FpJU48%2BvjTznm33zbzWFYDVQBPoglyj6zsJ8j7fe2KgMx3LKqAz9aZ6AIvVI7tu3Wiy4sUy1gTJJS%2FuJdTu6e1%2FRBq%2BdX7QsrR%2FePAQOpr9R%2B1u5hU6iqoT98plTqg6ljO%2BRExE8uF8Qekn2Y2d8gS5rduzx9z9mI8%2BrTf%2FjJYgNZjfng2U5G4CuwTjaOvf%2F63smQvZkOXTxnPi7Z%2BjuoL1x3y%2BF5Nyy6avWnzt9uaJ2wlCHFBrSB1iwKz0tjh3Zcic%2F8lLDjiprJSezlgZvunLP6jPODRQ%2FDZHdOPXkqNqFvGovVARWqkXxzoLtglDCrv5VN3bYAgkJwRDrubCDU8ZVEOhDc4ZSLLjy2GcQxOWhB7u8f99CW97sTsSEuZGmEWtMaeQltJslNtp67378eYj7sEVc7hG1bMXxwZQ3bUfXz8OjFowWAzTuWpXLdcFK2Vvf57v6R2Wqo5%2B82E%2FYnbguiny0g3%2B0uQJQ1YJS99TQ4Qz41J4OtOMV85U8nTTH7Y1Lc2U3BNfpqfyKoeb8wwxtftygY6pgFtJQFRf8%2Fe%2FgN8YMHq4xgzLPP7h92wqU8ijnMN1wy%2F19t4drya5c9EstabMz%2FCxp83tvXFUZFEWxykbwOz1xBawCAhXX%2FGDfwKN9iIJyhdr%2Fh2aN7m481%2FTCN4xn%2BqN4fGd%2FeLE85sZJEmf1Ig0GUroxAOzCvzHL9NHEjIKKvZ26cFF0sB%2BYojzYFkEmII3Bbp5daiNiBjeVuhA5hbH2bKWAvBzAG9&X-Amz-Signature=cdb92f0f569202fe1e18526c2a43ad6e18d1e76fb68d080802578928e1d9ce22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHAJGF3D%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIAD9wA7v1EyYDUiRC0ckh1uoAYWrFYIMaEwyOSw%2F4AeeAiAMT3SK0AuL7N7QdlYC6qM2PPLdD3m4v61wZAO5yiZltir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMgBdjyj9D56n8p%2BOjKtwDBcB%2B0IJyazTPR5bVOx%2Ft3iAueEe5IEyu6OWvHIfBdinhavmw%2F0fP416QWBA5QgrS9w3n6mP5bIP%2BBSzGRZmVjd72WzrH1QAN6xmUbc%2FpJU48%2BvjTznm33zbzWFYDVQBPoglyj6zsJ8j7fe2KgMx3LKqAz9aZ6AIvVI7tu3Wiy4sUy1gTJJS%2FuJdTu6e1%2FRBq%2BdX7QsrR%2FePAQOpr9R%2B1u5hU6iqoT98plTqg6ljO%2BRExE8uF8Qekn2Y2d8gS5rduzx9z9mI8%2BrTf%2FjJYgNZjfng2U5G4CuwTjaOvf%2F63smQvZkOXTxnPi7Z%2BjuoL1x3y%2BF5Nyy6avWnzt9uaJ2wlCHFBrSB1iwKz0tjh3Zcic%2F8lLDjiprJSezlgZvunLP6jPODRQ%2FDZHdOPXkqNqFvGovVARWqkXxzoLtglDCrv5VN3bYAgkJwRDrubCDU8ZVEOhDc4ZSLLjy2GcQxOWhB7u8f99CW97sTsSEuZGmEWtMaeQltJslNtp67378eYj7sEVc7hG1bMXxwZQ3bUfXz8OjFowWAzTuWpXLdcFK2Vvf57v6R2Wqo5%2B82E%2FYnbguiny0g3%2B0uQJQ1YJS99TQ4Qz41J4OtOMV85U8nTTH7Y1Lc2U3BNfpqfyKoeb8wwxtftygY6pgFtJQFRf8%2Fe%2FgN8YMHq4xgzLPP7h92wqU8ijnMN1wy%2F19t4drya5c9EstabMz%2FCxp83tvXFUZFEWxykbwOz1xBawCAhXX%2FGDfwKN9iIJyhdr%2Fh2aN7m481%2FTCN4xn%2BqN4fGd%2FeLE85sZJEmf1Ig0GUroxAOzCvzHL9NHEjIKKvZ26cFF0sB%2BYojzYFkEmII3Bbp5daiNiBjeVuhA5hbH2bKWAvBzAG9&X-Amz-Signature=34f5956264d9b1d2b0fe2f152105fc467d2fb44ba3ff834fb793dfe25e326a77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2JIBNBJ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIBdXQY5muh6tNyF2XtpgprzI4OtEq%2BKoYshvFjGQZ0I9AiEAtJ9Fr7RDZhj57NheCJxJmurnbN40uPmeEbI919V0MbQq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDAj4Ub3ZtLNDeG%2FuICrcA%2FG%2F7FKhpY0vx5bfFvqSBgw%2F7iNR2WNHAylJBLcfM2H6qXQDaU1nr8F%2B9kzVASM0CPCQ2sCxmRGmNFOoQkJPgknz9wQnYjwG%2B%2FB0BoEjOD%2BtXbYNfhJkJzV2QboxBVJIZRbjj2gYM0CFFCTP9qeRvemJ5D03ZL5DkQBsobSMivExOM8Lt0mHyoV%2Bu4fz9rNQ6wdTe3qi79pEqn7gedDGChmuvcfYN8UJqHVVjhSImLizeDowaQdZxr2wyMaTBT1C5dKVK51FL7inJ4OC8tbSLarZiuIg7%2BCPd4NZt2%2Bvn9hRDmRARC9XYn0pAhx%2B0Lgj7aFdPJ6JxdUD389FuD4jIgYpz2ca6yC0ew8cVAV%2BIcHnworWGkNkNPk%2BlXxKkYc%2FbVSDBn6WJoV6qYsMppFLyuWIbyHbqtY%2BQM7Bsd%2FPckiGH74o6M%2Be0u5T%2FKReHcA6eCE3P9TjEDXoyQF%2BnAYWD464EdrsQ3u1pJ%2B3ZSjakYb2DkhtrtznSYlbD%2F1ji8pTIGrvNlC2ZO4C1C6%2Bxie3wmnIDh1PJXHDgOP3dH14W9lZWhrjsn5NgY7pe2oyqcF3TpaoUa1joMhBsc5rxBEKeL1sOydFCDij1H%2BohtQ2UfJabY63LshXJHElJLXmMIze7coGOqUBATxs7l628xsQjB9slT1rz9gOF5VqbfSVgm3e%2BH4oUac9jkNKOFT986iUml7SsEtuDRLur9qWwazLClvTrAH5i8md7ORa7EujVJ70gSqkuXaKk8DZqWHNxh5ITx7bKBkQl%2BtaUGqtKXbXbmD4eUs2PiVUDH8hAsKZ3rvNWartJW9oBOluBSVea1Uw7XMzNXCXUR6ejbqtiru3jrgrXMqwK4ZKuL%2Bs&X-Amz-Signature=400fb2a2e9cdb6bb072e445ae860fecbf371cd2060f5ec9a3a6256b2ee9e2320&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Z7ZFOW6%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIAYN0TQdGt94x%2BRdF2orScIR6v54%2FFRVB5YoqjJmEC%2BUAiEAyJfCSHomqopFasUuzEatAKKNqbp1uelOwqgDA5%2BTFqkq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDHkkM%2F5whl6fHD5xAircA1hYFUxxHsA7tiLZ9ZE0qjBCElyo6Zbq80LDUWVbjz5beSVr8gszrPZGM%2FcnusqQ8gt46R2JX6leQzyJ8x3yptyI4fFlVG%2FyRLV615IzTAuv7tGYO7L8DyPm4I9Ppgy%2FIb6POQ9gIL9hSkrqJZTf5cHjmxCyEVKkbmGOWm2F3rdOSvEacTHOB8K7k7P6w5BWUUfWe7P9eeGbEdaZHqtvHlKQnGDBtz%2BPtMEbgRaLWxlKZiX1a1awTU%2F1PEZV%2B7iPNNEVLGwRbRJahSGzsmLbC0WPCkikI72O9%2Bs1o6wZhQq%2F61sLN%2BclMDAAdsb5XDYdhfQcfRQbr2ZKa0KAc5rtozTz%2FcoYAsDMyicOv3ejP1l24kGIQtklr%2FuNeR54ExwGdDdiVYp6ihRiJYr67ujG1QM%2F%2Fa0vD5IETMinOJYoEXkzc4KNXRRFy4EVZyS4m9D5EDLilXTC2yWeNdnG2pCLJn7LI8MdXDePfvrF5024gOym7oM7b9qD5dvTYNMlABHU%2BjWqQX4zmUwzmU4dyuU4L15VIOSNYXTOkYuVXM9Ccmdc1YmO9Eb0DDlID40TdcoWYXPRUXzkeFZZTjx4do0QPXxnnM752%2BPHyMxSibBkFehB1rXI3EuWawW2NvJXMKv%2B7MoGOqUB0otv85Mp13obF4HmWwil4K3yl1g2tRBpVQg2C%2B90X3VLQyJZ8BUf6%2FflQFtvFLdnvzSsm63Czy0cuwWdfSyI6TYy0CSccCw5E1AQmMoP5BaMlbO4OlVWljjBUPmwvpruziZL1OhiGRtgyZ0hTVKW5GGs0vwZ7rnviVAZmxRk0QEoWaK9AaDu%2FIPnDR6cQtuefI0Pjr5%2FJDLxFXWjry8772CGxF1H&X-Amz-Signature=dca83e4ec2bdd5df698143337f4ae37339a6cb8a6034f982933e54132123d55e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVTP5Z3B%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCJ6Cstu5N67rD9kH5M%2BRnUfC4glpptDTeLYPfB7q9LqQIgBBJr70WmdbZRBrJbdByWGMbpPzTKIvFW%2FZksw9OQVU0q%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDAl5f%2FPhY78sYBXFnircA9p0tj92qdB3ocfwp1v2CL4nDA8Yqhe2Ph86R3%2BM4hG2k2O1yS4DaGsrdFkuCdcCdMCH1JG3vcbxVtbbJnZ7A1r1NFii3vA9miGpqJdCN4cBfeBIHJFVZnau%2BmIQ01RhSLsZPagfr%2F41xr11CRWQdRR69vcuTqn7t9339F2%2Bu%2Bql%2FhkusCW%2BvTWC4dh9lNeoRJx6YzABKGUwCr3cCa6nGD2wCWKBSIna9StD%2BR6MN30qnjDk6VuX7vfFaEwVgyn%2FfBTie1lEkBdKR72E%2F1vsBnn1stOd5Zkk0upxJb9%2Bvypy38fdWCIl4XxdTuhbBPn0RmrBfZPGpQPopUUUHOPkjzhw88WZxH5PHQaA8e8mieW6dv%2F7YhFMIJnyupixRWM2%2FqBAv4Jycf%2F2PR1wUZSfkV5KSWcruMfKRG%2FFVZkt%2F4bPbMjDiw4rjjX7p7UtDd1fFJHprqLjUYdoWpASZAQyQm6b3PBjfbFMUoCe98LgnCEtvN7q0OFkxIvUg4s2hF3AxywTVS2SjD3W388I5IPx4TTaBD7JdwmIo7vkcQK7NCM7UjxThGVullBAKqYWVG4DP7VUQut5N3i1K%2FC%2B5L%2BM%2FyB7WmZsmR8GAmi183txoFvhCdCiN86T7e%2FIahFQMIPP7coGOqUB5Mj78diqy39l2xBSuBvTkbBoFzOXprra5UK7e%2FUyft9vLnTQPF2dvmZk2wcDRzm9v%2Bdzfm7OZx%2FB8k0kJ4At%2FX%2B0hOk7x%2B39w52lPpGiszG1mXSN176d%2FWvuYgm4Qxkta%2FfEx%2FH6xcJJUutHQoaCGf%2F1G0bswvr5BRD4wStxaANmRgVH%2FdTkhQr%2FbjRJYsxzeY1hIn5UuG8Yr7lrz6pVvfo8X24Q&X-Amz-Signature=d142f768ba2e1e35054d2bd4e425b428706b8c8dfe4ace68e7f2c377397d4fb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHCO26VT%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQD3x8FQ3xdrUnvyzU2eOhVeMrCaNx8255KRvmu%2Bsi%2BpggIhALAi64zzrAlOatwtg1U%2BLil6QTjWu3HSl1ij4zYKGs%2BtKv8DCEEQABoMNjM3NDIzMTgzODA1Igzcp3v2IgaS%2FOQNIocq3AOxGgpeuyt6hP%2BrIddsCHAz%2FEPpUkTZ4BGoG%2BCRE9wMvtXzlcfAol9W4Q8I6wDsJ%2B4bSDADpLTuN66JlPX80JkdMcDAmNzgC3Hle7iRShNZX39i2RuHalpHXWcmP%2F9McruL%2FjFM4zuPFzP6wy2RdiVUguynM%2FQgCEY2kfMhQuiLBBg56dPCIPT8cf1daOiVT98HcPtun2ezL4C5YOps3G5XHwKxLTMDK%2FLg90bbWMiTG8r6yO%2BlWvtgzTfz7OFztUawRERha%2BtbPduJNh7uHfgI9RmjwFAjqW9Tlygjq63%2FatvOsAr12PGm9%2BmX3LBgXxuXTuH6BGKC8fKI4tomqDk88tB5%2F7ahiLV9az1zSfntcPXe3q%2BJR%2FImdzi6Lkk0sPWNCpcahERv0MHnOCD9GUzeFvrdEZc3npU5ssYH77Hqh53d8gFvO9rn1eiqmENpAUldmjJN9%2Bve5ynhFfIl97J2NWGLvMSi2Pemr33pHl4uOGBx%2BwfWjtzhq1iJIC96ZwL8c99UEAAFb6BU5f%2B2HToo7ABWHhsvSS6nr8FMJwyPGxP037cFQyWckbr3TffO8JTi7ei2jcfOEWiEA3Bov6M%2BTxybM%2BD9pckUuQWSM0NdtevccSzy7tmOdP4PxzDS5O3KBjqkATd1k7ad1Zl808XBpzkDK9hjDie%2FmD8CXAzneVZ%2Fgfz4YM0VukAAL9%2FDMMDs7mazb5Kzd0buAEW7pYq1BF6q8tgdshEMGSOq951yQ2qyNg%2BLYzKYTvkEMOoWRPODVV3mibczTp4LzOPmm2jl%2BQbKLTgmbkPqP9qP449wdEsmtauu8zTu%2Bl1hkDI2qWp83Er7DGz5gSibPODBAJjro1wFra3rgBod&X-Amz-Signature=11d53c3108ffea28fd8bd4f91a0ff5db9f79da7295f03d312f56e547b18c0214&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHCO26VT%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQD3x8FQ3xdrUnvyzU2eOhVeMrCaNx8255KRvmu%2Bsi%2BpggIhALAi64zzrAlOatwtg1U%2BLil6QTjWu3HSl1ij4zYKGs%2BtKv8DCEEQABoMNjM3NDIzMTgzODA1Igzcp3v2IgaS%2FOQNIocq3AOxGgpeuyt6hP%2BrIddsCHAz%2FEPpUkTZ4BGoG%2BCRE9wMvtXzlcfAol9W4Q8I6wDsJ%2B4bSDADpLTuN66JlPX80JkdMcDAmNzgC3Hle7iRShNZX39i2RuHalpHXWcmP%2F9McruL%2FjFM4zuPFzP6wy2RdiVUguynM%2FQgCEY2kfMhQuiLBBg56dPCIPT8cf1daOiVT98HcPtun2ezL4C5YOps3G5XHwKxLTMDK%2FLg90bbWMiTG8r6yO%2BlWvtgzTfz7OFztUawRERha%2BtbPduJNh7uHfgI9RmjwFAjqW9Tlygjq63%2FatvOsAr12PGm9%2BmX3LBgXxuXTuH6BGKC8fKI4tomqDk88tB5%2F7ahiLV9az1zSfntcPXe3q%2BJR%2FImdzi6Lkk0sPWNCpcahERv0MHnOCD9GUzeFvrdEZc3npU5ssYH77Hqh53d8gFvO9rn1eiqmENpAUldmjJN9%2Bve5ynhFfIl97J2NWGLvMSi2Pemr33pHl4uOGBx%2BwfWjtzhq1iJIC96ZwL8c99UEAAFb6BU5f%2B2HToo7ABWHhsvSS6nr8FMJwyPGxP037cFQyWckbr3TffO8JTi7ei2jcfOEWiEA3Bov6M%2BTxybM%2BD9pckUuQWSM0NdtevccSzy7tmOdP4PxzDS5O3KBjqkATd1k7ad1Zl808XBpzkDK9hjDie%2FmD8CXAzneVZ%2Fgfz4YM0VukAAL9%2FDMMDs7mazb5Kzd0buAEW7pYq1BF6q8tgdshEMGSOq951yQ2qyNg%2BLYzKYTvkEMOoWRPODVV3mibczTp4LzOPmm2jl%2BQbKLTgmbkPqP9qP449wdEsmtauu8zTu%2Bl1hkDI2qWp83Er7DGz5gSibPODBAJjro1wFra3rgBod&X-Amz-Signature=b18e6e3c1660abd878df9f701300e26dc444832f765260903fa8afc571a344bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E3EL7TO%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIF5fCTwu7lBduaeYtxNnGi8zrrj%2F8GXaUtLFH7Jh0lXGAiAQQYMsee8mg%2FHJJxkK2ei%2Fp9oFzJs13cuhSVFQcSheyir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIM3JlP95M5eeLZN5VBKtwDBiQwiN1mIYNFCmgBdPpoMkzj7I7CmSd10KSv7O58UFKPNdx4s%2B9cgCGb0hGptg%2B7BkpB5U93RpwJ6zkD%2BrbXYjrTYI4Y381hPJqttECCG3rHTafZTzQxpCVOjh025hH99wXsL6WG6oZQtyjCOW0nJKQ1xzdiDcDLx7T%2FD49BsI9IHJ0G9iXCcYgP7hVLqLi%2F7lBCq8Il4z3FeDa7Ju%2F9qCGzdx%2FffFGcHQoaMz%2FnguhHIfddVShOwryeqC8hd06qcn1oxEsUWIRNmnv48dU9EWi2lrUqhA3oyvvIwXw4RaFh9vhUF19E1fIezDggpMGCwPapcGuPmK3K7WLFRiOYA2%2Bfs4zr6LJFdzYfxxydIZ6Ex4vsHVIAoevY8PXA49J44Qyk53Ez77%2BIOIrWtN4nJiA3nfWIkqT1bHFcokDau4eKBPprX0dwfS4e5gkTFZ%2FIxQBsipiMUghdF6cn4rhcwfHMEIUa1RGEqj8NC6AKQezSTCmdLe5NWva%2FFl0qjVbWyV48tIeHYlqR9ZXRJx0IbDoRjxipMZWVleWl9l6xgvveHVYLpe7TyeiyYRb3gAQSaP%2BxL5BonQTSWyaliQL8B0Zk6FLiimMtpNO1ExcNRdsB1VlzKyAD7zddFBkw%2F87tygY6pgE6%2BzPCnmqezvqvrWuucb5mUSlO5wo3kFEQT9gOHW4E8juJy5APUh2mMDm9xwgNW9%2F2ogvjJbcTQ6cUqayWJrPwO%2F8DFqKu7u%2F3Jr%2FzUWFbyKUBtPw9sqXN9my8C6qnNqgFGxLzuK0EQVueTbrwmsW6MSCLvWNPtU1Ei%2BDSJGPk4VaNZwXQT61zd4M5vq3w6goiPje7zcWbrQdpMaJ%2F%2F2XVEaYvxuBU&X-Amz-Signature=2c4c8f0ab0a1dfb3d2c70214a92a0439e97da6639a411ce078ce695e7b2e942e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWHTNLTO%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIA9Nxhe%2FQp7F%2B4srLEcNMKP5ukYOuiN6Dw%2FiGZ2g6lhjAiEAid1Mh%2BPmF9%2BMKjhHmilZlvH6wAXJf91lZh4IzqekhwQq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDAm4HsaD4pfU2rOHHyrcAwFJ%2Bu0UMMhYDs%2FTj1SlYslpxW3DWr%2BlRudONwjAceCQ4%2FMP2UAlWMD%2BDocM52XhkQdhzLfomr%2B%2Bh0HQCWCvEErnoAR6LAWmcJER6MB6Unz7Z43z9whxmiKMsXSZ3Oz4Nftltc6jSFdpSNYgfcuRwruharFPkcyGqlaAB8bj6eHS51Ez6jC36lKimjp1asRcp05IXIf1TCm4Vlgke4eCACJ3hstZcPn%2FyJpTA%2B1NAm8fzwgI%2B130UmcvY%2F5zIP7LTh%2BpeFHtcTVmNr%2Bs%2FITjxW4PIwy559kCYAyHZnxTHif2FQ%2FFNaf5fPAGrQ6%2FwyEvkf4nopXdgx2E0xklnbPm9vB7EbvAMfpU%2FqsEKQsVw9sNXfBXrj262TL55TH18MbLrPCX%2FVNB%2FiXAM3egnY79tq%2FWYT3NsIXqWmTzwMokozd7EqIopRvfaIZUVeBgVBWP0MZ548LOWl7AXKvwCTvLoStCNgbZOrVnffSj7FWz6SVBbvbPqqPkcIkjbYxQnZTDRzLo8bHxDZ9CEjuesZ6NNKZLjKQ5vA%2FRzBo3xGcekyy9p0f2b%2BgDu3p5k03qrMEt9wLmmB3Wvr5Kh37EjYQB%2FJAsQrHiK9GVtagFFHnm7Qe488nK6IbtemgYj0IzML2%2B7coGOqUB2sEg0nt13fFKh%2BweV01SZXasMJRnQflFADsAJNqnX9a8NVkNW9rCGg2qwYCBTiqYCXumN8bHyIAdjzRuJzpzxuFEXDxoKo8C%2FtlYsbo%2B%2FXXgkl7xaScrSNpizqCSoS3m3Q0tYNayNicl%2FMI8fVVF7Ye1go21KV6HFT9d49Z1BAi6GyOA7RUyL3XeAaNTMQ9RFtX5YeB7L1nQYXix0dv%2FqtV9kTwT&X-Amz-Signature=bd1c8f2bd551a5b40218c479438c892df23269ac9ae7ab25a7832176cef9435d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWHTNLTO%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIA9Nxhe%2FQp7F%2B4srLEcNMKP5ukYOuiN6Dw%2FiGZ2g6lhjAiEAid1Mh%2BPmF9%2BMKjhHmilZlvH6wAXJf91lZh4IzqekhwQq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDAm4HsaD4pfU2rOHHyrcAwFJ%2Bu0UMMhYDs%2FTj1SlYslpxW3DWr%2BlRudONwjAceCQ4%2FMP2UAlWMD%2BDocM52XhkQdhzLfomr%2B%2Bh0HQCWCvEErnoAR6LAWmcJER6MB6Unz7Z43z9whxmiKMsXSZ3Oz4Nftltc6jSFdpSNYgfcuRwruharFPkcyGqlaAB8bj6eHS51Ez6jC36lKimjp1asRcp05IXIf1TCm4Vlgke4eCACJ3hstZcPn%2FyJpTA%2B1NAm8fzwgI%2B130UmcvY%2F5zIP7LTh%2BpeFHtcTVmNr%2Bs%2FITjxW4PIwy559kCYAyHZnxTHif2FQ%2FFNaf5fPAGrQ6%2FwyEvkf4nopXdgx2E0xklnbPm9vB7EbvAMfpU%2FqsEKQsVw9sNXfBXrj262TL55TH18MbLrPCX%2FVNB%2FiXAM3egnY79tq%2FWYT3NsIXqWmTzwMokozd7EqIopRvfaIZUVeBgVBWP0MZ548LOWl7AXKvwCTvLoStCNgbZOrVnffSj7FWz6SVBbvbPqqPkcIkjbYxQnZTDRzLo8bHxDZ9CEjuesZ6NNKZLjKQ5vA%2FRzBo3xGcekyy9p0f2b%2BgDu3p5k03qrMEt9wLmmB3Wvr5Kh37EjYQB%2FJAsQrHiK9GVtagFFHnm7Qe488nK6IbtemgYj0IzML2%2B7coGOqUB2sEg0nt13fFKh%2BweV01SZXasMJRnQflFADsAJNqnX9a8NVkNW9rCGg2qwYCBTiqYCXumN8bHyIAdjzRuJzpzxuFEXDxoKo8C%2FtlYsbo%2B%2FXXgkl7xaScrSNpizqCSoS3m3Q0tYNayNicl%2FMI8fVVF7Ye1go21KV6HFT9d49Z1BAi6GyOA7RUyL3XeAaNTMQ9RFtX5YeB7L1nQYXix0dv%2FqtV9kTwT&X-Amz-Signature=bd1c8f2bd551a5b40218c479438c892df23269ac9ae7ab25a7832176cef9435d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KS5ANKY%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T091909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCg%2B%2Bv%2FZKtpQQ%2F0u%2F9MiILPmnjmOPEjW2wswxswoCE42QIge%2FTxxNrc%2BaNzN%2B1rbvBHLnbCjNVTOTaoNpMUxMFRVioq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDNyQiKg0xYnb%2FWK2sSrcA7ywPdGvmd1c2ZBVftnTTSghy7%2FLjGJ7SZ%2FLXKOM9lnfN%2BNRoge5xMXJTJgALpJy5ARZDZQEplha5pBWcREh5%2F5rfIhHAdtGx5lYzu5H65wBl8gHjnO3e7JeSSkTMg5TZ7EpzfkhFexoId4p0lvMM%2BBtzJtthoU0y01iXasKXsXvYgZC0OttlEAXfKZ8rjL2iCTkkmF4uzC41jgl12Si2WL2clCiYpJUBcRxWCeBD5DLBpwFh5%2BNsrgXpnhWCCOZ%2BodoF2Zt25pmE0AsdHj04kKnZeFAlz0UQXm6TEpSmM8BOM7XYToywyIRH1s38Lwgfj63WAHeGj2s4UptG%2B0CcIZbXF6tdESagBDtsmTHc3I4Eage3QActAwvDdBzxd2KIe5gXkfBcReEs7ZoWA8AEMrHz8gvJYAr8790s5w3pCsAsVzg2RJcg3SC8KV14yEbe%2Fbw0srKp%2BimIUwK8QA16OljcvV9g2kIHXvhbUskQyBZYrS0VaKi4kI7PLWH52UGtKQnRWFwiJ20fAoZxF%2FgP2ehinqBE1AdwQI56RvovOQEocJuvnZjXopqspkE4SJrH7PQlNuJ3WH7IejODvj0L3EYP3WfqE1XSDBv0W%2FM%2BMq1VJkVyo3YCy5w6BfpMLXL7coGOqUB57VfiHYvXivwxUXS4%2FNCY0L0%2FVVlT17H4eKEifwHnRp2K66tPCW7Fz7mWM1ZdmaM7imTVl5qDaQb7xElaW4J4YGsQNtcJjt9Jmylbdml7WIAlhpxhgyj%2FfgTCwMf%2BDpWq1Gw%2BEunSBLWebjt7Vk25RfsctMNW1CbzP5Qt2wfY6%2BVy6a0W9DPiPCqd3h9bGHNulmfy2eXM%2F38pNBZoOeXGpmnkfmy&X-Amz-Signature=d36beca2bddf71c1d83048dfd8d03fc3a715b143fdc13942d70d3b9cceab606c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

