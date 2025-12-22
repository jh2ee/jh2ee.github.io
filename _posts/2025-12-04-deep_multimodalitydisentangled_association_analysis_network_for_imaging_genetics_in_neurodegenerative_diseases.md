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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGGHTRNJ%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQDfQqCFTmEmDPS3H3vVcJJOFf0SzHALFvnFjAMgU799CAIgSQQ%2FOgE8AAIxsFqdr61JTZmiWYsxOf5hlWvMmax5PQMqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP13Sv9gsxnRT0kl9ircAwyT%2B%2FNXs2y%2B9AwIQD3H6UunDr%2BZiePQn%2FqdwbvMGLHC7d8OtW73tLvT%2F4982qjGKv1jANsoez0n07gHr6IZZLqNLAPp1NvTFLYF5P0WfRe0hYGIiVsWMYMobswhN1WdWAccjHZsqKjokvYtnunmhaXXpdp6CUopIb6pu%2FnXTgqSgcIKA7kH38sKcmMcyb6CwFVSS59m9%2FNhG1wwTfiuZ5u2NcZaWB4p4HqHFpw1uW6rJOmSgJA0YZG73VySI4DwgwOdeFondbKPDBd9uCZOL78QiY1J1O70zjYmNlge2MVtn8aoWPVz%2BwpHR%2FoG%2BsSKOPlAwxlUoXImD4QLjhtFpTieE7w1wNn7vqSklnj8Ee8rkpG%2BPKuQEZ%2BVbjs5bSdeFrtdSRCliIe1zLIYM%2FdOkH1AEtbqraI6Jv90iWstfbPgyBxyZDo9dzFKTutSW6fmM5WEqvkF2bSlVEQKvAWQ5UDmtgnACO7okPfK7OXBlBuhsF60Dysf6VarNyRVjze1IlizT6AJ7cQpVMS5oIcq6B5k3WVPmuNEwMO4kqf1meE2XFPFA5mahP2IDqab4hut%2F3B63gUpmdXyCpDZ5ipfgZ0BrQ3J2y7JaMvhNDE5hvgC5adil7jADLmI3Ld%2BML%2BFo8oGOqUBDNct5d41lmUDyKdBf8dMhD8e%2FjNis4VDPFubVSnX0U7UmeNDPfuCxH3AQknr3XrFCAnDm6rk4Vs7rmLr55hkseYAOUlY46xodEiwzMdR9eLqt19tutPPxyqSMwILLfLg%2B57RUm3UP6CV8k3pX6Ojthez04voMSP0cHqu5XksSzNZ%2F%2FCxucT8lSAp5%2B7AX4ZLpljTZ7S12DMgxEhu0d7WqXcENRoO&X-Amz-Signature=96f578fb8261700e29bf89e90f16b9a99610730c818498896d299fcd961c2bcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGGHTRNJ%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQDfQqCFTmEmDPS3H3vVcJJOFf0SzHALFvnFjAMgU799CAIgSQQ%2FOgE8AAIxsFqdr61JTZmiWYsxOf5hlWvMmax5PQMqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP13Sv9gsxnRT0kl9ircAwyT%2B%2FNXs2y%2B9AwIQD3H6UunDr%2BZiePQn%2FqdwbvMGLHC7d8OtW73tLvT%2F4982qjGKv1jANsoez0n07gHr6IZZLqNLAPp1NvTFLYF5P0WfRe0hYGIiVsWMYMobswhN1WdWAccjHZsqKjokvYtnunmhaXXpdp6CUopIb6pu%2FnXTgqSgcIKA7kH38sKcmMcyb6CwFVSS59m9%2FNhG1wwTfiuZ5u2NcZaWB4p4HqHFpw1uW6rJOmSgJA0YZG73VySI4DwgwOdeFondbKPDBd9uCZOL78QiY1J1O70zjYmNlge2MVtn8aoWPVz%2BwpHR%2FoG%2BsSKOPlAwxlUoXImD4QLjhtFpTieE7w1wNn7vqSklnj8Ee8rkpG%2BPKuQEZ%2BVbjs5bSdeFrtdSRCliIe1zLIYM%2FdOkH1AEtbqraI6Jv90iWstfbPgyBxyZDo9dzFKTutSW6fmM5WEqvkF2bSlVEQKvAWQ5UDmtgnACO7okPfK7OXBlBuhsF60Dysf6VarNyRVjze1IlizT6AJ7cQpVMS5oIcq6B5k3WVPmuNEwMO4kqf1meE2XFPFA5mahP2IDqab4hut%2F3B63gUpmdXyCpDZ5ipfgZ0BrQ3J2y7JaMvhNDE5hvgC5adil7jADLmI3Ld%2BML%2BFo8oGOqUBDNct5d41lmUDyKdBf8dMhD8e%2FjNis4VDPFubVSnX0U7UmeNDPfuCxH3AQknr3XrFCAnDm6rk4Vs7rmLr55hkseYAOUlY46xodEiwzMdR9eLqt19tutPPxyqSMwILLfLg%2B57RUm3UP6CV8k3pX6Ojthez04voMSP0cHqu5XksSzNZ%2F%2FCxucT8lSAp5%2B7AX4ZLpljTZ7S12DMgxEhu0d7WqXcENRoO&X-Amz-Signature=96f578fb8261700e29bf89e90f16b9a99610730c818498896d299fcd961c2bcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHZKDTYA%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQCPyuYUn4PGT6MunmONd0cT3fwW%2Fc%2BhUKIQDt6Y%2F7rYAgIgEJb5yRS%2BcYST8V%2BQnRCRevp9mOb8odW%2FwmwdMdrgIbYqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNAtTLettuq3Ttfn0ircA7sqZ8DsFwnJnpyQDB1RKJLiYBM8hUiXrbZE0mA%2B6Lr68EkbFHyTjpZGDCD7CZe3S6PnBknJQJK7u76PcwDOVPJbljQXPUHTvIW%2FxsgXD8tAE3GZjn8rljOFg%2BIaywFcI1JIcJWhYw1iGi8ktIpewZEC9IM1Nrtv6vSxWp41ZbhCJVfbZvRcInRWYj0eYpNR%2BJoSmCKIbns%2BRJbhmc428O1G7rJzE6cdbXgy3awQow%2B1EpYPj8amk9iJQekKTPLgqfqHryEzIHT6xajXSZLRP5N%2B6JaBnDd1ENtuEq0k9TV6s4kuad6bSvZ1grTloHvaomP6eFXH2GXvRTJFcG6MuyLMTBHqAIoeEWtOlQfO02u3IQndFto9uq2b%2Fhwg1vyo1xi8nYIzkqmS2we4LTn42AaK6HYIVMYgR4ugksnaq%2FHWFDkHYvFl%2Bsu1WzZ32ylExq3rUWbghpyboj4DMYEYnm%2FKicOtRMhH%2BNQPG%2BVXyUD4nMipzhKmix6lhHMlLUio2MkE1Jvfiwy%2FIlhC6MLWv6dQF6ozODnMfDEjUWcaMGXFlot%2BC14Tc9lvkjKnxqlgVbrVDcuqsmGhE1PqsSfLPkoG1FjSjM19psyUGMUkhpg29bwK1pT5%2BijEgxZMMO6Fo8oGOqUByDthIWyZ%2BgJrF8IeX6WkIBeyKSarCHVdoeILic%2F6cXpdgpSxfHLraI%2Bw8253xcCLLGV%2FUcuT9wJ04iLanCtZTJ8D734PU2bdHAuAEnRPQRA2gip6JgUmXmyjjtA7kdFpBtmQORBzKV62Pjd8xbOZ4VVU6ZwbsbIj3OEJ6YIbtGgdaChXISWZH0%2F88CRodjNs%2Bhb%2BKWGzEP5Pnskv1GAGKlu7evnx&X-Amz-Signature=f320c80fbcc8feffc1efd786b7e4fda316b444150bf1c82c8adcd833aa667598&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466443FXGEW%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDsI3i62vSD3EfxsZNta02iuhjXGReaP70EGQeM3lxVIgIhAOPiMoIFw8lI%2FOXefw9SV9i%2Fd9pP34%2BKjaFnag6EmHgvKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzr76EWq0kWflWPFDoq3APLJP31gUOrR41WpV%2BJ25a2sohBQ1y4GCyKmLQMeZ4kqNdJrd7A4E6%2BDiwJWnhh%2FrpXD4bIlOu2dBLQ3ReAaXZrYN69c3OukAhEI8X4Qv%2F5CjWLLgqdj98JoDvb%2Ff1xNlQKwSFDN8Hxy2%2BlKvsF2MJ72b%2B%2ByoYrOsHzN1ThG40cNpvE%2BApt0G455mgnHIlAuX4T0hLYSxGOZBvERJR8Lj5jLFdX3ZnLAlfqLXERFE94yYWR0hC6TkH61d3nIY%2FxKjb%2BGEsC0uGOVQf0pQFmU5HTErcvZd88gzCQBdjieimDYnJNYpYArGGgqJiWoEKnqxOlnY2bLstKl66GVqCHyfBeWRbcRarRgy8oagAWDf8AhyBOQdL9ZtlOUm6J3qWOOE7g%2FWFZgi6ztUmuIqbh0DF92zD4QG7cW6yElGEyevamdY4SRY7nkfq7FuhU0usrKwwr3uzGQzbmzaUL92WjDIOEvNfh%2BBAiQ8ADW19wMGUlpWel7z2J0Zi1efdLknm3UOzNxXsZcPCKc1z%2F7Lb2W3%2FTePKHHCRfUtRUPPaOm4rZmu3G0JWtKCPZg%2FpGuWGsoZeoQGO9vUnzYnSrvLd%2BjvgzxAsH3Rl2VeRm2U3eN2AUhjJESRGJxbNm2mijHDCrhaPKBjqkAZhpGH3I1B7VloZekIe4GEsetWzPioKyAnUlYA%2FEkO71yQYd8vY8T1FWkcKKmMXsqWjWbjYkUr3AJriugWUzdhYOND%2Bb1UO%2Ff5ovge5rhDUn6%2Boy%2F9%2BzqKr3BxKRrlgDitCSn95wcQy5MoxIBSbnABL%2B5PsGek4CUVP1D0CmvFfV5f3uIXufClUOaA6gn1U4GJzghKPGhdOi3L%2FH7HAa8mEWwykd&X-Amz-Signature=786acb278c08ed75d30c5cf6fcff3fd6795ace1b717c88233e09d00edf419e14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466443FXGEW%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDsI3i62vSD3EfxsZNta02iuhjXGReaP70EGQeM3lxVIgIhAOPiMoIFw8lI%2FOXefw9SV9i%2Fd9pP34%2BKjaFnag6EmHgvKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzr76EWq0kWflWPFDoq3APLJP31gUOrR41WpV%2BJ25a2sohBQ1y4GCyKmLQMeZ4kqNdJrd7A4E6%2BDiwJWnhh%2FrpXD4bIlOu2dBLQ3ReAaXZrYN69c3OukAhEI8X4Qv%2F5CjWLLgqdj98JoDvb%2Ff1xNlQKwSFDN8Hxy2%2BlKvsF2MJ72b%2B%2ByoYrOsHzN1ThG40cNpvE%2BApt0G455mgnHIlAuX4T0hLYSxGOZBvERJR8Lj5jLFdX3ZnLAlfqLXERFE94yYWR0hC6TkH61d3nIY%2FxKjb%2BGEsC0uGOVQf0pQFmU5HTErcvZd88gzCQBdjieimDYnJNYpYArGGgqJiWoEKnqxOlnY2bLstKl66GVqCHyfBeWRbcRarRgy8oagAWDf8AhyBOQdL9ZtlOUm6J3qWOOE7g%2FWFZgi6ztUmuIqbh0DF92zD4QG7cW6yElGEyevamdY4SRY7nkfq7FuhU0usrKwwr3uzGQzbmzaUL92WjDIOEvNfh%2BBAiQ8ADW19wMGUlpWel7z2J0Zi1efdLknm3UOzNxXsZcPCKc1z%2F7Lb2W3%2FTePKHHCRfUtRUPPaOm4rZmu3G0JWtKCPZg%2FpGuWGsoZeoQGO9vUnzYnSrvLd%2BjvgzxAsH3Rl2VeRm2U3eN2AUhjJESRGJxbNm2mijHDCrhaPKBjqkAZhpGH3I1B7VloZekIe4GEsetWzPioKyAnUlYA%2FEkO71yQYd8vY8T1FWkcKKmMXsqWjWbjYkUr3AJriugWUzdhYOND%2Bb1UO%2Ff5ovge5rhDUn6%2Boy%2F9%2BzqKr3BxKRrlgDitCSn95wcQy5MoxIBSbnABL%2B5PsGek4CUVP1D0CmvFfV5f3uIXufClUOaA6gn1U4GJzghKPGhdOi3L%2FH7HAa8mEWwykd&X-Amz-Signature=2204a936e82ddb8fa776924e697d0a1402e0cebe9c723379f9d16c05f958c69e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOC5V6NY%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIGAq1PKlD2M2%2FUBLkNnqGk%2Fz2%2FZNc2til4BoqJ8hSxOKAiEA9gmDg8QJo3UF0GNoLkwDKihZc5RRUChOnYfK4tkV4mYqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN9pDowzYtYklknHWyrcA3NXcf0a7KqTNWMholH269mUx12ZZAGcXl163abbBq%2FJGRzv00IgV0EQd%2Bp42LFybU%2FE599CgJyRLG3LfWUDN3NYtpF4L0s2s499va4wcpxkdLca6qN4HKczriMM7tUvKhvij9N9xHaxiXzQoUrhu%2FetvE1c2t0VV9zcpZXWIv%2FwW2D0pzikpokp2ELbsn4X0iNFbh2vLuEZC050%2Btm81eI5AqlfshFAwEsdzZ1KItonYoB0gZTZLmEj4hC4j%2B%2BEuxLFfDbRIU42GjOov22NGK29%2FarpPmtL4yZRrGmwlkcUmp5fT%2FarLwjYhTIGYRnCZ8KZW8rBsg0KrRpAETub81%2BYWMN9oIpDvBeIljysaKM7lbX%2BlEIe7zIy3aUv2i55wr3ToivdIGNIOW3sMWzk3s8HDNS1r%2FaRumhJJzxYX7AcTGthRS0aG7igYu3a69mv%2BY2d0vuC66Tm8C9%2FC%2BTzOBcgk%2FjJuf7mG2vTu2sM8fblCVLa3DKy%2FJKNCvxEm87QL7O7a%2FLnm3IPt180qz4NozrAXEtiJo9KQatHPJ8DM%2FQ%2BtsiAk72w2yLVIG714yOgGHfIQW7%2BJLK8mPZ%2F8C1cgi3kYmHlLN3k6iUU47E39NZG%2FxAreHacJWp6LSp5MISGo8oGOqUB8drw2fKHwZVEfaT1FA9HWRLB2rMRx2OHtkzReVJfxr7bsGzxmNXzvhwXfjLk31MFnFE4n3xn6asukQpZX2murYB0Jrc49fAiaXnhjE7SHG62ztah88E9DLxLhL9jRblOEsjXCRpzxNlMu3V%2BF5gBOpRk6B2Qv79RR3mXQEUOF3uXzsH%2FmQEVmIh3Ay7u4Un4AKsXqQblg0M87A2TK4h05tF3xTww&X-Amz-Signature=a0c86c00b9d7fff01cc0e57d1445494e02b61041dd8b6737bb7f0448a4f0544f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663I7W6JTD%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIHP%2BMKGofKMQkX2fgZ7THyGnmt8hxxH9kTlyg5D9c1ImAiAIiUFzNdTplX2iqkDEMm85Th4GAi%2FeGrNWIpmRJE1lYCqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNABWJBZDC%2B4X3IM2KtwDTi7TSnh33jeELmr8d%2BkIPzV46Al38M1022iCizMhLFNvfrjiiVCn2x2y%2F5Rr5MaKX207LGj9b4xutpl86pQNWUTz5WlsAqqb0cb6aWjoc3%2FcsWamZ2chORSrxApBHqc7pTqnpSKKyCrK3vvdNvz4XdmxQSRXMyWKP16qyqeZhr9YCzk44dLciua83l2NS2EvG5JITZy%2BUf2Emzu47ScOKjVunOXZZ9mB%2BxSZ5bRFDo%2BM9XjDjua0u1NMHsur9YDElQvbyUvi%2F8fHzmw6vycO9Jd2xTZ4XgMgct5y4HdBaB5gxAaR7lPvUpXvyuUUH10q0BBrUOzxDc%2FDf6BvcLyZepVU7wKcnL1kjSdXG1O8ldRYnoj%2BB%2FuWCIS8K11XJJ7tYt8Mm6M6n7GWEcIJSD3qqXg%2FD3uG5ZIXV%2FmDjYA%2BgZGM3mnpKVYy%2F5Lzpv9NHnnnMARhptdblAD5uhrbaMnRi9czdF0sDNxGm5iCo%2BBd%2BADBV7gz%2BKnyyVQg3Uh%2BM7jsPZa5MPZBD%2FFgM6iIXtfRv9sj4rbXzUlSdGPqUWp1gW8diljJRN0bYCJ5%2FtT0j0KAlXQomQL9VHJ3qSnQP4L1ZS40D4jdOye1FK4e5k1TtAiKIOS%2FJJHpZg9EN2Mw%2BYWjygY6pgEsEUIz35X8SxXbUg%2BfUNYXL8rgu%2BkMWA7XT9VLjenUSlMSMZIGyHtZEMcbNgpYfoeYQsTO9baIasqodTb9YK5T5taUkRNlNMm4jXGxsJHK4PfTvJuUH77qkmoLDTBT5lFJwpqrEgS4%2BvC9Fxf4TghC%2BE%2BoLc6tI2F0uIUBBhE6H5N7EkrCi1vYnrUjBuVz9xbjD40Z39xEPuSVNedvRB0j3OHlOM6A&X-Amz-Signature=763f64eb3269efecccf5b20f5586e1a923f0c66464e7d79e09aacac63d0c577e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4OARENK%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQCJnWDgRWauVHn3EdcTYaLfyx51nGj%2FvyUbJXUdPHwp%2BgIhAPWQpg5wSs6oFhvQRgk3qs9TvM3goSBb%2F6L4noEi2%2BUOKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwlRU4%2B6neN22YZq3oq3ANa7VazD5UQzZo6D3TW%2FidQRJG6y3xDgDo3NCZYmaVgv2d%2BEOijkWNex7hhbUo3aPCN%2Bcr7JFcrGu6WUN2pl5zIVT5QIHGfOyjeeA%2FLRoZTGAHiRgcJQMxjzmn0DZ%2FMuBN5nW6rwfLb2j1hPq2baaogbZ7x6MWWLmpG%2FYoY0OXkP73SvpQ1IkFPODmjs6UpIOuq5wTSquZsJwIHGRbYDjz8kgpQ4UTpiFxHQ0duWOvnO6%2Fk73wbUqKIY4j2JWNQVWzwqWqItjCVfpnYjIu2Hrt8BrDKWUb14WzL5B9BEUkkfX77KjNvOtVVfaDA51YLdHSPPXRfuR%2BbGlULaDDqzS7mAq%2BexvDOnF1xYA9wpGVeIpCnSXtMtAu7LkPOFg%2FPmL4w8l3t0qGQX3%2BlDQWE%2FEBEtQnRnTbXLESEQlG9cZTPB2zrDwmfi%2FuG305q7FhNxbMD5HhHqpeO1te9nbybi7f52%2Br9H20fbiRTrbsLHPPK4T0TxYiP42WvK%2FbyHwZZxlrUBvbY7lYoEnHytEGRFPA%2FzRHfWl2vXDPTMaNzy24rWHCQbXeLIqz5JsaCWd7J7EpCZaDyOCZ6evtf3nsfaD6%2F8V9a%2F%2Fv0%2BWsyflYyt9PC0n9kgkf95wIGs3T6zjCuhaPKBjqkARD5qLL8LV4I1E4TwJc%2Fn3s4db87pyDA%2FS93i%2FMIi7Be8uGIrHdpUdS9ifojd59qxvK5GP4sKsTJHrS2bYudWxX0M0b6lD0Wr%2F91GZOfwTbFpIbc0yobT8dKcuww%2FhtnoNI3j7CHnA3LldkTk3gdmxTb64l%2BuWl3mVdh%2BuI3FZVVnj6u0xdwy15w74JtgQ72MtxoKzBR%2B6OpRfh8DGsWSc2fGh%2Bt&X-Amz-Signature=aeafc6fd50e31e2b486538462e31c0af8056d84bbd978dddd2eb9e906c5ed05d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RELJD4MF%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCICD%2FhQCql2BUwSxkalviFO28T7xtgF27qrrtjR7Rh9vuAiAruCSKChGRoTcjocwfPZ1CmERl8X6ZxyBCaNU80JWgKCqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQ5s0PnjI3Fbtmw7XKtwDAImk%2BlYmHPaIeb3HLcch9w2IdfyTfYJFt46Ku%2Bok7MM89CUjQ%2BTKiyvYi606o84tAAgPsau6j0A0CQD8LyaKzazxmsVL8u%2BatXRRCdmnrwGgwQBCmji5I10grfGm04QPrrlVZ2RMvs7ojCey2OZPKGtQFveHHTh%2BlmeejpyFFJcifqQvm7ei%2Ffqbdo4umnRv4yl6YqqKN5KF3z5sBMXnLWrqXBhS72NrOA5bBx4lHHy43lrs%2BZjAdgV1ZXIxs4LqkZhK9rXYPVFCx7K8gP1KnU6vhlTU0KLMtfDjadToRXKmTYqsgyEjc32Ksbd3tH8edRUsLUP%2B0G3cbPWbH52KTg6GsZJrBXg8w%2FOCd8X56Ars6v9lCq7XEZ91wMrDnJYk1qFgR8ib3AXd3BjiXvaEGmo313EehvoCBNFUREZrBzo2JQdQpQBgQoDYRVTNJC7U%2FpukyffyKEYR8uv5%2FlMUpsaYbRaqXj%2FPbKFRjyhv8z0iAADmuWf7LmRaN3yeffUhD7nFB4%2FSJA7SEb4X3UGffb2wUjV%2FPU2iapkl8DlRSomiDm%2Fu%2FiFY3WD%2F3R6twoEA%2BBOwonOfM8xLc42LHAdkg5EM4CRO1I79MOr3rbOAggbrIRGlMWtFdCMslGQw54WjygY6pgHv7m1RAL1oh2IhKQszA4dtyxCAJVLuMMkD4l1UX0NqxtjA6wgKhvNLorjOkjxjO3kyYbfCGO1QJZjud2j25FeheziI4aoECQEdUQoT8ri89QS4qSZ%2F8QoToZQEvnN%2BcFBFLLkPoZj7dhPgnMCy4NHEEl%2Bb76CoamoZEeOFSMAHHx0I4aaWqSZkGBfQqS2xb%2FLilTxSAFBI1YkHxi19hsTKo6w80LMv&X-Amz-Signature=c249f7c213c0c9100c1a46418ba12efa0f859c9b6c7d61558129f777063515a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RELJD4MF%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCICD%2FhQCql2BUwSxkalviFO28T7xtgF27qrrtjR7Rh9vuAiAruCSKChGRoTcjocwfPZ1CmERl8X6ZxyBCaNU80JWgKCqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQ5s0PnjI3Fbtmw7XKtwDAImk%2BlYmHPaIeb3HLcch9w2IdfyTfYJFt46Ku%2Bok7MM89CUjQ%2BTKiyvYi606o84tAAgPsau6j0A0CQD8LyaKzazxmsVL8u%2BatXRRCdmnrwGgwQBCmji5I10grfGm04QPrrlVZ2RMvs7ojCey2OZPKGtQFveHHTh%2BlmeejpyFFJcifqQvm7ei%2Ffqbdo4umnRv4yl6YqqKN5KF3z5sBMXnLWrqXBhS72NrOA5bBx4lHHy43lrs%2BZjAdgV1ZXIxs4LqkZhK9rXYPVFCx7K8gP1KnU6vhlTU0KLMtfDjadToRXKmTYqsgyEjc32Ksbd3tH8edRUsLUP%2B0G3cbPWbH52KTg6GsZJrBXg8w%2FOCd8X56Ars6v9lCq7XEZ91wMrDnJYk1qFgR8ib3AXd3BjiXvaEGmo313EehvoCBNFUREZrBzo2JQdQpQBgQoDYRVTNJC7U%2FpukyffyKEYR8uv5%2FlMUpsaYbRaqXj%2FPbKFRjyhv8z0iAADmuWf7LmRaN3yeffUhD7nFB4%2FSJA7SEb4X3UGffb2wUjV%2FPU2iapkl8DlRSomiDm%2Fu%2FiFY3WD%2F3R6twoEA%2BBOwonOfM8xLc42LHAdkg5EM4CRO1I79MOr3rbOAggbrIRGlMWtFdCMslGQw54WjygY6pgHv7m1RAL1oh2IhKQszA4dtyxCAJVLuMMkD4l1UX0NqxtjA6wgKhvNLorjOkjxjO3kyYbfCGO1QJZjud2j25FeheziI4aoECQEdUQoT8ri89QS4qSZ%2F8QoToZQEvnN%2BcFBFLLkPoZj7dhPgnMCy4NHEEl%2Bb76CoamoZEeOFSMAHHx0I4aaWqSZkGBfQqS2xb%2FLilTxSAFBI1YkHxi19hsTKo6w80LMv&X-Amz-Signature=7c8a4089654485ddbfc372d2975d4e4fdfef50a2917b3263b491206cb5efba9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ7VPMB4%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDdzQKClrBZ01hy%2FmBhbo18NNSICanxzDqppCwvILwsZgIhAPwGJshvntqubJ9F0vzwmorPKhBvZY0aPVsyb7Y2qrlUKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxeGDBks8ZEHXxbbWsq3APJrM96jRT4uYPHeXzgK6MFPKONz2BOeehaEukr4uUcCbT%2FLZNHOd581bjbc3WLaG0zEA9OhUXehjSI6YiM2T6vTczkRae9K779U98SiMd3K474EHR25Y8mMDuN93FaU04%2FlWogxA8pRUz7a3bIAcL2LrsoTVK8%2FTWN7eKSniY5wXXgwEhF1OPnOATTcvVpKcCypawVwc8tWgq04V8LzT11dfG8kpzMPJ9ue0LReS%2Ft4hTpRcTD%2B71jFg6Q5frX6UzgvcT3bEhKMzYiDVjeh3n7RLSxijgRJ83%2BpEFqhggW%2BwP9uN8Pp81MWiVcK1X2lq1F8qGc2d1oRANeS9pxoviGuty8MfNaMMrMpiDoX85UQxQ78DJwNxrbNH0lILVPR%2Bzq4A6dXtbDix6otWa0eiiwYX7GGV8v26Zl%2FpjrmWh7LZ1IOzDE0XKWiHxHRSeMEka5bAP4eKG2bpTaAEUABPjyRBfnJ7TPCyZo6jkwJk0h9omxv0PpgOCTdzJ3RhDHmIAP8c9R%2Bl1K4Q%2BGuq7cOAxAPCoPL421zWJrm3isPP%2FfznOLYTFvWwiIOshLW4Tzc0chpFvqsq5enZSyQB%2FyEdLwdWc4WK6ZoxCKa8pTikTRDzpPRlvlMRMi4R2YKjCrhaPKBjqkAc0wgxlUy2UikVFn5tPNigQCdZGKU0CqVI0aZ9AD1pBsSU2yq2gX8EhbGpofEy3NU%2F8XKmhHV7muQZf8Jptkt7RIuHgc7iM7K3VY1K9BzaStZ75uVqLAfcgsiKfQJpnX6I4ErRtyUzrNV3QnxWn8qx2D3Q2%2BMzYIc1ZkvaZ0nFjLo6V1D4TOUwQ%2FW%2FAY2w3CtzBFLXmkqqRE2f1wvcovI4JFSuyl&X-Amz-Signature=a368de04088538d1a9bc297e18cfc0f4b07bd31d6ae8f02d6a8e572ed4d9dce2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM7BEHZU%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDvfft2dtnvCfqW1zqJjx2joDKx%2FKSDjidhgWpoE5R3agIhANi3%2FWRugOLH0%2FUVjp8vJRstrebgNGGOqPMoIClJvHHYKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxiohkM%2FUx9yi3LRTAq3AMoUX8C8%2BySqOYYHejNVsqMrNxeUFBHeg2v1vrhB60vqYRn3ZDh35MI9mIJoqgtGSpjK5Zvd9vaT2O3N44jm0TOXDm19rP31HS4BrkxdjVFM72RPWPkzaEP9XShutIcR4%2FxJFjCVbz4LmOhxKXEzHtzd2O1cTbCVBZ1KU3hecaRFbeOQFF8cLxLIj7OmoL%2Fo2vXBO8ZnTrt0qlYPm80i6aWdqRCIK2WZKHLb1afaNDRE48whp5awNJARQ2K2ksh2%2FhIaRQT658pCZAMoxryPlcNzejOKSjJV8YMQi0EF90o%2BIo8TQMyub34If5Eg4Hh016h39MFP8FkWsZ2I9sEn3mvMdhwooORgFksba%2Blcw%2F0W0MUeuJITLa1T1POrk%2F7sV0asCEjY5r%2BxzVZs2J8Rf4u4TyQgl3XwbyVZP%2Fk0rMcJnrel3%2Fq9e32p6aY0IrgTvwzIUY%2F%2FGtbaK%2BpOpzLn%2BDWBjYm5p5ZJ6ftFuXyQJ6X%2BcIf4tnbeMfqFDUtkdOfFHlOdBZRZF2M7vA8ntLI0Hfitdum%2Fn5iljaWs6QUiBNIxhvFJ2zy0XjLaJYR72cuLPmYpTEObCOldNm5jFf5Zap%2Fhl%2F%2FD8cjj19U0a0%2Bh6FenBY6sOmia3xdv6GREzCuhaPKBjqkAfw79v1wwlxoIrM9zbSPV60h3a6%2F16klJg3EwhdvjYt2at04ZeqLP0%2BA06oYS5PAxWmgeoJ%2BaAZrBg4oZl%2Bl%2F9hzNFfcxiHotYQoJSUp16vI2khyNWlel49VD0d6J5PjHJmyyBqw3Ur3WDW6KXqVv3iu7RMwf2PRbjnz7gkTUmIM96wbAfvrNlJ2%2FARGvoJG%2BRvNouRr6asZnW8S7c59oCb3b5hS&X-Amz-Signature=820432b6a19fe30cf4086e0f6ffe462475b0261fb5bfe28886a5cebe179fe401&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM7BEHZU%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDvfft2dtnvCfqW1zqJjx2joDKx%2FKSDjidhgWpoE5R3agIhANi3%2FWRugOLH0%2FUVjp8vJRstrebgNGGOqPMoIClJvHHYKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxiohkM%2FUx9yi3LRTAq3AMoUX8C8%2BySqOYYHejNVsqMrNxeUFBHeg2v1vrhB60vqYRn3ZDh35MI9mIJoqgtGSpjK5Zvd9vaT2O3N44jm0TOXDm19rP31HS4BrkxdjVFM72RPWPkzaEP9XShutIcR4%2FxJFjCVbz4LmOhxKXEzHtzd2O1cTbCVBZ1KU3hecaRFbeOQFF8cLxLIj7OmoL%2Fo2vXBO8ZnTrt0qlYPm80i6aWdqRCIK2WZKHLb1afaNDRE48whp5awNJARQ2K2ksh2%2FhIaRQT658pCZAMoxryPlcNzejOKSjJV8YMQi0EF90o%2BIo8TQMyub34If5Eg4Hh016h39MFP8FkWsZ2I9sEn3mvMdhwooORgFksba%2Blcw%2F0W0MUeuJITLa1T1POrk%2F7sV0asCEjY5r%2BxzVZs2J8Rf4u4TyQgl3XwbyVZP%2Fk0rMcJnrel3%2Fq9e32p6aY0IrgTvwzIUY%2F%2FGtbaK%2BpOpzLn%2BDWBjYm5p5ZJ6ftFuXyQJ6X%2BcIf4tnbeMfqFDUtkdOfFHlOdBZRZF2M7vA8ntLI0Hfitdum%2Fn5iljaWs6QUiBNIxhvFJ2zy0XjLaJYR72cuLPmYpTEObCOldNm5jFf5Zap%2Fhl%2F%2FD8cjj19U0a0%2Bh6FenBY6sOmia3xdv6GREzCuhaPKBjqkAfw79v1wwlxoIrM9zbSPV60h3a6%2F16klJg3EwhdvjYt2at04ZeqLP0%2BA06oYS5PAxWmgeoJ%2BaAZrBg4oZl%2Bl%2F9hzNFfcxiHotYQoJSUp16vI2khyNWlel49VD0d6J5PjHJmyyBqw3Ur3WDW6KXqVv3iu7RMwf2PRbjnz7gkTUmIM96wbAfvrNlJ2%2FARGvoJG%2BRvNouRr6asZnW8S7c59oCb3b5hS&X-Amz-Signature=820432b6a19fe30cf4086e0f6ffe462475b0261fb5bfe28886a5cebe179fe401&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6S3GQIW%2F20251222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251222T051500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQCzW4Aiv8k8h0Ms62hsk%2BZjN7mKPzYAtD%2FTOcGdPnJ3rwIgPFAOsoq8f05aTpZQniwMTPEHapuxt0xy5qNcy%2FORdTkqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKBPZKcIPPYeAcyz%2BSrcA2IAWOZWJncrQwn0QRkIOq0SYNqK7oITOkJ6da9j6q9dV4wkZ%2FE1BZrgsQhNDZ8sMgzQn0Dy4QqTphpEmMmC%2BliRPD1HocZSYbtU1trlNG6Cg8yfHKH50c1foC8xy7w2UBuFBvNIeg133LpHWDRfYmt9YEwVWmr%2FCn72hk5X4dtyw%2Bar6IwjI0Mamk19oEK3cYOAO9%2BszIZJChSedCV4k6KUZNVAW8hyxmbysYR%2F2n6CM63xrHxM5D7X4ibdiTjkaheXqrrbbRtmFhd82Xv6PnpEdbOGqvwKQkGwlvztY%2Fk0mwP3CR9iXZx3uoiHC85mP7OV30f%2BGlNrQPlRcFkRdEDWQN7ws9bjMKFv8%2F7LNRaz13YBIGeU17NRkD5O%2BHlvjb6Pahj%2BMInTmTgzKg0vU%2BSGfRTgU0oIfCws8nxajYJ3yFVGepi73707cC26WrX16LuB3kpDII%2FTirnUOXg1%2B7Lg42M3pgzDjXPlPh7fglKNvp%2FCfA7RrxJh%2FpR3c0ibnPQWQ86KDRy2qgzZALlhfrSkJGCoJj0ReumSf6K0ERq091aADmcczlnrzaxa4sSmBYEhtiQj63c6C84yLKbtNHoYWrt742YJrP2ewRtMpP86xpfhTIqBR0S%2BzVAPMISGo8oGOqUB3thsURHTRqY01yOcUVzCT4JuGVtX9GU2u78knzdR33YJ8cALMp%2BIbQFW6vXJtw59wZRqN5EbZLsfoyAJbcZq1vgFm8RAoLE0LY00U82I%2BGyw0Z9hKsi3tnGeqTS5IgccH6ndQtzn4n51XexXWFZkktX%2BAXc7Zjf3goCBuDkaevT0C8HYF5U51flYN3BIx8%2FWMLob%2BGhWIpLnU%2BEvl1oFdCx8D%2FrU&X-Amz-Signature=537e38b2f047ff080a9a7a59c5c728959e7d449bbaff82e290aa7a5f2879e794&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

