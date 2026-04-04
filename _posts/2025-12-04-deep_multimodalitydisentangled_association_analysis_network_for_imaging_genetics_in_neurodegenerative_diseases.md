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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MH52UR2%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BGSJ4K7jPmaOSqjWGsOcCgLNXpGnE8grd0ccWoSwJawIhAKEOZ6fLNWJerL879XXiIEgDwUacOskQZYCHT9RLMEm9KogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwrbwTuKHdR3SbR%2F7Yq3APr3HNAeBV4%2FwSYs2kYP%2Bq%2FaXFv6ZM5ep4rypzIPhpxUVx0WNw3b%2BG5MU5RYpT4sw3iai9TvscgUBuCf%2FM7LG6yxEkyTBTc0w6qg1xEKMVLvD%2F%2FhyxUT7cE17KBpYTGl2TJAdm6UjaYzb8ajrsKi2CDc%2BdTw%2Fd%2B6Q0HwiQeEZ49SFDU6D3u81lD%2F57BIqtlxi5p%2FK%2BJzm1VvheoJK%2BMCwPPDu1Fii4HjjvlfgPZMJuNLO30T9Q%2BZynSjZOR3Q2CQc2lZ%2Flb%2BVPrnmRgEsqp%2FJrReKFHgi1FYp9iYxrQGCcpD9pYcola8S5NRj27BvHKBrBXl0ZOgB9zK97obYkIOWkRUYbRojc5Gm9oGSpY8Qufcux6nXg1uaLNMvFWL5FMNWjFx42VaVDr1MGRoO0RmVTm3ph7a70enN44gqaHfFWAy16K8HvWsRdtwbiN%2BZqnBDu0RqQsn%2BBtzLS7a14zq2agSNi08LDCR6FYKkrd%2FYcRS93Ar6bLoeklQFCQYS0ZeaiEBQnK8zZOlw8dvVwQbsyIVIaWqvKoXIbCZP%2FCgVmkbM2lUqS2WzKSsxE%2Bym4QQfpF%2FtC%2FLK3Oal81ivwheFc%2BA%2FjUGjR0HdBjGJ5%2BDT0VtCiIO9F80NvO0ls2RDCkpsTOBjqkASGs8rdcQTivCG4UPRRlbAkIgUtWXaVKWaLnvkk05WAxyykRPK00qRt4bIqY%2FZQquTxHPbqYF%2BWhFOSVv2FCJbzRrUeKSKR1NZ9O%2BzFbubBWj5QLhV9xqxrwm1lVoZ93QSph42BFHzLG%2BCFbrvzqnLvSif4hUvW99tm%2F%2BBn5eril2JQqn%2BHF0cXpBLT3G3C3BQEjIj%2F8iyxPp0ShzzdBwog3mrDa&X-Amz-Signature=e017f81987148c89de7a68f38d43739678863cadf46375b6ce9efb73442606ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MH52UR2%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BGSJ4K7jPmaOSqjWGsOcCgLNXpGnE8grd0ccWoSwJawIhAKEOZ6fLNWJerL879XXiIEgDwUacOskQZYCHT9RLMEm9KogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwrbwTuKHdR3SbR%2F7Yq3APr3HNAeBV4%2FwSYs2kYP%2Bq%2FaXFv6ZM5ep4rypzIPhpxUVx0WNw3b%2BG5MU5RYpT4sw3iai9TvscgUBuCf%2FM7LG6yxEkyTBTc0w6qg1xEKMVLvD%2F%2FhyxUT7cE17KBpYTGl2TJAdm6UjaYzb8ajrsKi2CDc%2BdTw%2Fd%2B6Q0HwiQeEZ49SFDU6D3u81lD%2F57BIqtlxi5p%2FK%2BJzm1VvheoJK%2BMCwPPDu1Fii4HjjvlfgPZMJuNLO30T9Q%2BZynSjZOR3Q2CQc2lZ%2Flb%2BVPrnmRgEsqp%2FJrReKFHgi1FYp9iYxrQGCcpD9pYcola8S5NRj27BvHKBrBXl0ZOgB9zK97obYkIOWkRUYbRojc5Gm9oGSpY8Qufcux6nXg1uaLNMvFWL5FMNWjFx42VaVDr1MGRoO0RmVTm3ph7a70enN44gqaHfFWAy16K8HvWsRdtwbiN%2BZqnBDu0RqQsn%2BBtzLS7a14zq2agSNi08LDCR6FYKkrd%2FYcRS93Ar6bLoeklQFCQYS0ZeaiEBQnK8zZOlw8dvVwQbsyIVIaWqvKoXIbCZP%2FCgVmkbM2lUqS2WzKSsxE%2Bym4QQfpF%2FtC%2FLK3Oal81ivwheFc%2BA%2FjUGjR0HdBjGJ5%2BDT0VtCiIO9F80NvO0ls2RDCkpsTOBjqkASGs8rdcQTivCG4UPRRlbAkIgUtWXaVKWaLnvkk05WAxyykRPK00qRt4bIqY%2FZQquTxHPbqYF%2BWhFOSVv2FCJbzRrUeKSKR1NZ9O%2BzFbubBWj5QLhV9xqxrwm1lVoZ93QSph42BFHzLG%2BCFbrvzqnLvSif4hUvW99tm%2F%2BBn5eril2JQqn%2BHF0cXpBLT3G3C3BQEjIj%2F8iyxPp0ShzzdBwog3mrDa&X-Amz-Signature=e017f81987148c89de7a68f38d43739678863cadf46375b6ce9efb73442606ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666F3QAAAZ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134235Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCubjY%2Bjmt%2Bfh4v0mhrDVXn%2F5B7g0DHOeHngForNAH7kgIhAIZEfNrDoLbLD%2FoVbzcJdTCLEJrmZjWbJSFdE4AMn1vzKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzSj3tQ4hailbFgD68q3AMGlECT9xlvZqDwl84pNWSct4G7Q%2BM44DK4ruAspNR3q7D9w4YQwq%2BKf%2BsmTK8KbKfS%2FH1t%2B6MvyWIDZzMtJ7UE8PgtOteTZ1BiG7vRaLhLSGSMDDpQvMRC5KgIQpt1WBN7Vk3DzjOroxdteJ%2FQfNarLd1KPm8NCbOCVmE8RloTQI5TJTQwKDiM%2FkvIki3JiD5Tyszi1Ps8LjlXUS%2BQ4L4WPTTAHGJPcCV1t8HiAb8gc5qouu8u1Q%2FYlGcQNPd5m7%2FoCnwbPG9YNOnlnBbMo35%2BcfBUqSdk2bZqYmIeQRFvjh2G2nwViQeWheuZ5oj2dJ%2FLooJVVzqnm8T2LjlfZA03bByvNmYOlvS7Hcg0CBUlonr02TsMJ0uZQz%2FUMBhC%2F%2F5hS0pxDBxURYG%2BuCoIHc6gvrWUVWbo4Y9TmOrClCEOSKOEL2Ne6xTnMwrfVfVWeZJ5ppivV8e5oNK1s7So6wvkUMi2pczvsNRoUjPVsb%2FBNM8tnb8jn1YsYXJG%2FrxPIgGW2j5IJn2DMaVJ%2FYQ7JjNOFsPTj5K%2B6VzOnR%2BLm5JvO%2FbtlpBA%2B8RIDOTls%2FFf49S31rWCxYgCc5mis4kUojfgMin4ZsNJ0uIkLRwlOcVAJiBbsFnEhAEuURBvzTDJpsTOBjqkAew%2FlP6rqn6HEZ%2F7NBKlfBXJ%2B5Mbg30ZFjUSMgjyDA%2FcvH1uJl%2BAuJFNzo%2F0PiTCSjYXJvhPN5%2F4OazTuBgl67OJdbUtLYJqCs90Ajr7cdnxos5ZFOrZ0hF33I7WIQ6kdetq2jpZ9fgwpQX9ephqqeKkYL50C6CVXZyb6YBZWghD7%2FukGK4Bo7NRLzotgWNXbEg%2BmWNOTSGeasz9bN0ZSqqhUJID&X-Amz-Signature=f34ca436fc64737c9f5878e51d5e734f4fc48935e14e79b732611712659b7a7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFVPSUDI%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBaJNJBdJTE%2F1g9Y%2BwnYCPrQSylNpNBPFxFRboMOrefVAiAhKWYfPjgG3fXbjchrUoTLx54wXUIhrYPIdmpqKg7zuiqIBAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdeBcfnnQWeeYsfpxKtwDbqfENbAh7%2BLtx0Ca8DhL7Zz7oAPtR9BVuTl3SxKa2e4bbZSVgW4Ni1PCI7r9xnbW4xWGa1vem7atGbuslobesJdjWg2Z2KtQ3N6s8PmEKRIyUeKymttsBC7iy%2FkK6l%2FKYlLdWl7jtTwYN%2FgkFzcxE8d%2FBLCGHZF%2Bb88eA5g3Sg7vZ4pr1aNOFbBk63hqieCX89o3Hrf4wp735xG1M%2Bqm%2Fi43yGRhAnuy%2F549iMCMGcsrlHklz3wc98DY0OAZGL0lcUHh5UrBZPbs12CnNuldigGTi3FZnq46JYcD8XSBtist1kHjNG6%2BjRgLocOANdxkjOiQyX8CS9rFc5YyST9e8p4SUBvM7ZxqLYsDBY84ABlKQypGHpWbYYCpHGK97%2FEGN%2BP7UThakiped0kwCyMpuzlIq01BM%2FBcugtW1jXoC1n1RSgk5%2BcxdYMcuV5%2FdpGkM2ZV8zpq6O29bLfefYKri5G6ihsUWHOrNmYtUS%2Fpbne7PKw5Kd8i7UiE9m1V0iNIcYKTWGkWgQI09JWQ3ZDl%2FH9z1oalkwAshfUyddKYyGmM5C12JPxU3TTpc%2BZ3yF2ZkHxxQc%2F9zCB6hYlTDcfHjhv5zJzLa%2BHID%2BG%2B8Q8jOwgSxKWSRbmWu2V3y2Iw4qbEzgY6pgEOTTafE9jYevceV9eNTD5hgGI8l%2BXLglfkf9TFjn2puJuCEZyy9%2FsArHXX5rasSTMEdYa71BBhWoB1I5u6C2Ry%2BvRIT1pioo36q79M99dTMsuj2vLk4F%2BA%2BL7Hd41dIpxHEUB83S%2FI7aqRJSaJzIuM1Y2HkO9bE3ybw2JwN9pRo6oRNwGm83zqFAyeRWePFL7bkpcfVITY2BdvgcdyW3z1m5AJm65I&X-Amz-Signature=fea68308d98f966e25bb1af26270fd5e3166f243fc956d112871bfcd3899f268&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFVPSUDI%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBaJNJBdJTE%2F1g9Y%2BwnYCPrQSylNpNBPFxFRboMOrefVAiAhKWYfPjgG3fXbjchrUoTLx54wXUIhrYPIdmpqKg7zuiqIBAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdeBcfnnQWeeYsfpxKtwDbqfENbAh7%2BLtx0Ca8DhL7Zz7oAPtR9BVuTl3SxKa2e4bbZSVgW4Ni1PCI7r9xnbW4xWGa1vem7atGbuslobesJdjWg2Z2KtQ3N6s8PmEKRIyUeKymttsBC7iy%2FkK6l%2FKYlLdWl7jtTwYN%2FgkFzcxE8d%2FBLCGHZF%2Bb88eA5g3Sg7vZ4pr1aNOFbBk63hqieCX89o3Hrf4wp735xG1M%2Bqm%2Fi43yGRhAnuy%2F549iMCMGcsrlHklz3wc98DY0OAZGL0lcUHh5UrBZPbs12CnNuldigGTi3FZnq46JYcD8XSBtist1kHjNG6%2BjRgLocOANdxkjOiQyX8CS9rFc5YyST9e8p4SUBvM7ZxqLYsDBY84ABlKQypGHpWbYYCpHGK97%2FEGN%2BP7UThakiped0kwCyMpuzlIq01BM%2FBcugtW1jXoC1n1RSgk5%2BcxdYMcuV5%2FdpGkM2ZV8zpq6O29bLfefYKri5G6ihsUWHOrNmYtUS%2Fpbne7PKw5Kd8i7UiE9m1V0iNIcYKTWGkWgQI09JWQ3ZDl%2FH9z1oalkwAshfUyddKYyGmM5C12JPxU3TTpc%2BZ3yF2ZkHxxQc%2F9zCB6hYlTDcfHjhv5zJzLa%2BHID%2BG%2B8Q8jOwgSxKWSRbmWu2V3y2Iw4qbEzgY6pgEOTTafE9jYevceV9eNTD5hgGI8l%2BXLglfkf9TFjn2puJuCEZyy9%2FsArHXX5rasSTMEdYa71BBhWoB1I5u6C2Ry%2BvRIT1pioo36q79M99dTMsuj2vLk4F%2BA%2BL7Hd41dIpxHEUB83S%2FI7aqRJSaJzIuM1Y2HkO9bE3ybw2JwN9pRo6oRNwGm83zqFAyeRWePFL7bkpcfVITY2BdvgcdyW3z1m5AJm65I&X-Amz-Signature=30986725aa4286057e83b941504508992422cc6cba11ab13b6aa3ce383e911d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYMODUAY%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICEG%2FRdVOFK8y%2BYLonyQQuY7gBXTJerDZRgiHsuxXND%2FAiAvSayslIoBlyfempT3%2FjidW4Q6mWj2M8WgRLYMPFrK9yqIBAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNu1wXtN6%2BFu4mVGHKtwD1lxIifN3G4CSo2oebz9whwNJRGEWiZim4oNZInM7pbUL1VU5Fug2%2FmNRFjYxoky17vorh7GhNMhComUXG2NRpUALNS82%2FFcXzv%2Bu3YeLKPSXrr8NwDethKM3Belt%2FIpbijUlKoTRyBZFcyhhWr4gaXHaqsgGxwyp3UeDB0msBR15znX0wa1A8xvpWL78YqkRFN2RCEDZqWYWCWCAbQ3BYBiV4BJ1IyZ%2BgAUW6YZc6QoxxjGREIHFcIxQLGnQTstOBD16yoA369yNyOXYjCPCENOA9jQ8eNPnHH1xR52dWRRHjviAplapZHSEF7eMBoKXwUBJleMxRx2Jp91naU66oWn2anKfdXKFjnQWgBK5Mq6FSseFykCmUu561n6S2G81BiPng7mT5Qd8nYn7OmGNbJGe02mA7Fk2DMBOA%2Fqdt6Sh0BJSql7V4aU91HXh3hSP4wG9mrTTKMnz%2FQMkyYOynf9aeA8J%2BY7EalmrytVyHp%2ByfDu7Use1htiiJKQcogDNKzHZZERLMHWh83TfbqTwaud69tPjhA%2F4go4%2FozzMhIraj12q1wvwcpdClYTJ479PAlqYoC35rHFDMgx4ErL35%2FPU59TJuPqBqG7l4VIJOtv09vZnsgU%2FmDNxzCEwxqXEzgY6pgFtIgmu5oJBVZfa4j%2BsQWy6mBpFFVBtQ5gg120Zk7mv2bRScnpmjQQfIjqMCRrq53vvzEiMechAiacw%2FfE%2BSbDbytDnUylq7dmV9bz4JeL9fQc465WjPuygBmVM0vRMRsRTjtS1XAkpA%2Btb32rDboS9gmll9YEXy%2BRsWalZupJ8qhZavbC9%2Fe%2B2S%2FisKsBICGszsUnWElm8yrFD1joBjfChq5SobJOE&X-Amz-Signature=d35f09957fffda88ce5659774e34d12a59a380ee072bafe7389d5051c515a912&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRCOB2MT%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCRq8TnRzisJrUl4bY9pjU8f77oNgponiTbZBUV0MaZgQIgPmtpadg7zJP%2FPigUzY9nWdCXyCXUEP00a%2BEDZWZSsGIqiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAyYZvQEROHcyaxJ5yrcA1mOR5uY0yLWBaPyjwSM%2F4ySzF9iKpcPKMgD0btjGnKec4MUtLMabh%2FwEJq1tXzXwxvh2ocACdC6YMzSB1wWWS2DFhJlq%2B9PLvKKnPVojVRsjV3qOEg8bOI365U0wbwuiU%2FUgdJy52Y5%2Fx4j0A91eZ6XTufkkLMoNxb6Ea5uGXxkq1Y%2B4ImASX4VQ%2BQJcbUoeDfsPB%2F%2FBcoB%2FVabxxXjny%2FD3w7pBR3jEs7Mes2Hh6GAnjwyb1hwBry3hgzAl%2FXO1WxgU9ZDr9So9KSyzLqzjYELqDF8%2BAzMqBLwZK3P9VmnVsv5wlslH%2B23qHdHZKQkPJ0PuCVUMPRRAKrRTalQApiQ6GB0DsgKSx%2FB7VQ7n%2BGhIjS2IcFo0u%2FT5lf6CXzbOh%2FsuJ9qXEPtVadVBO5BZwwi3Wy1XBWuy8kq%2Fj1PuEP9O87I2oMS5PgioARPV37lG%2BT784cGabmXTxXV5a5YLmF4dUY3vVQq6oqbur23YxnAsxcWi2gcXKZO12kO4HCms%2FZpk2cGUdcaQzBfBKarddqLpf%2FbFDh8YEYkBnjVV1sFKXlNmruZw5kMsQRlCsigoJ1QyG5mqMSlEQh9ogHqw1Sh0WGgBxfZptSDm3y22Gol%2BFRf7sg60dZZlrqRMJymxM4GOqUBw7sUt0PkpEuVYBftDVh9Zx%2BKiwjFwdPJ035jdjzlBV7%2FOClmYZAKXkDw2IAFqVsw5EsPSGP9Pz2uRyl7q4H3Ehqn1hjEzmodzripg9B10920ctiknGTXJKDai26cq7B3OaOR3RKch%2Fd0xoqz99EAb4I5nnl%2BTt5uUofsmZ%2F2Awp2qbAI83Du2ETF3VgDLOxqfe272wmtFQkqa%2FxZRYJ5Da3lsk0F&X-Amz-Signature=ee5c2688d3cfbb16126474e0c08fd102d93765a1dd7f66bc10040b713c1fd9de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665T7TMHHV%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB76pO71w5NZ%2BWZv8kUo7%2FNe544Boa1erRcsz6lnZqscAiAhisQcYyVMrpyVggB8Pi31WC6HfQoWH3EIrmFXhmKg%2ByqIBAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3CrvfTMVDEfsKMWEKtwDKv8eMj4tkxve%2BOXqqOjj1ccOw8Ma2kic9wPnVu3R66zxp4YNuGX9sSk6D%2BKgChbOlDXohwEp7bXUEAalW4X5cf76S5NosvciLcGtFLY8wsPKaimZRnCoUJS1uc59pbdj2Oejl5IqBD5ja8kn3GN%2BQpz4K6DUg%2BKZchpZvcaihBbDEbEh7mKb2489WdXiFF%2BfQo74FpCZ%2F%2FM8YZpkoy88HS4Xhjgw5lY8JaYk6F8gPWvro5FZ1qeLQmmMmqxdGS3xKN2%2FZXMcOVODRY4bkgBDhodXh07gPRyIj3WHY6rfTwy07ZM4jkD91JWC5RE5lm10xmX0cTpdehLbKBrF1rsUWNW0iZjIAiE6lP%2F%2BwjfgSaGy6IdYQY7yU3ogQvZG891bXUkmBB7ZL61ywTFpjQpnvHThOkmGmTMkKFv%2FJa5lZ4uDmNZGMZcTTZfzfaBRsPX3fh2eKBsNBdbN%2BuD1PJTKz9iv94y4IhHhZVGclenKzaeNln5KrsV6%2FimwsS2M6hwup2ZTZ6jqt96s16UCpUHuSWHxyiraoQmsv%2FuqVi4oVkKDDhD3XXc4P1CgD1gMTq4ElUDbM9PVgvFCMy2JQKovQr5V%2FJXiKGJ8mFqEsNttvrafN2K6ctfNCMvWNDsw7KfEzgY6pgGmoodd3Ux6FbPKfCrr2%2BWJeloa%2BMvOtKACNLsei%2FA8TB8Uq5K5NzaaVlDqcmt7l5qveSfw4%2FICM8QLjtIxRqx%2BhBuCUPZIJB0NEOP%2Fn9ECL4oV7d8AWRWGtpty1d3Mc8S50BdhUdeMzOTDl1d%2FtlC%2FDVl19ap5iUx6v65VBpIK4t9AA%2BbSOaDrGAXCyQxk1n4R6eFoCT%2F2K4P3xJtWBAIiDJCDK8Qy&X-Amz-Signature=e51329f295a3af5ce4c5b564609064603d16c631d1508886a724d68bd969bc66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHYMJOKJ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFxjpXPlQatyP8yLxzwnPI4omOSJBu9B5p%2B2hNqZeraOAiEAzHrpmXVptMM8eVYDS2WlqtYkKKaQD9DPJwP%2FXTxVkS8qiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO%2F3Fp9Ic6uvj5gK9ircA5R%2FFgYPXVf6Tolak11n2WZziZ8z%2F12VbUB79EdG5F1NBPCxuAaq344uovcVCdw2%2Bk6Q3y2qvjPq2aQxGpWJFfpMsNiiGkMVuEEs%2BbYgUQfSDVuNRYHlVj3EwungbHtJndRintiJTUft2azgUFhpDO%2F%2FyR5Ai1k6ywvcFscnzs8edMEHDUIjRAq6lP1l%2Bkow2JCvqu0Jp2zNIu6XtGO8qSmo7z29ONwJQUCTaHFz0gYFN98nmHxgo34ja%2BGV0DpHgercaL1YnGw5mb1APugHzQinG3zIpUh6WVRvrP1Vrz%2BuTDUukR3K7d%2Bb6Se1rrRcSOr0IobxFL8kFbSWi%2FGXgTejc5%2FkOMsaXVVdtqz9hWxyGlSahbbgs4bwm7rwnPJRhmUoyytDEnETK8EyOXUllO5TCDd6uTUD0fiZM9Tbi6bKdnUGGGl%2FeGy%2FZ9279wgPIaZpR0E6Szl%2BlJ9zsEqm0f6c1BM4AiM1pK3uRDAnzD9Z72biOoBPKTldyrb%2B3EsPvrtRuMBOqTL97%2F4mn5Hrk1YNXKY2ncwlP0%2BMxMvVdvas0xULSliCFQ5DCaWvE%2F%2Fh9xeEn5OKHrHF1jQpydGEQSSuLSHddApcNVfmaCEI7ak%2B0xE0CT5tbEV7sx7fMOSmxM4GOqUBC%2BXHKOX%2BH%2FedbMXRH6SZ7y%2BBF%2FXEfUMn1L4NO2F551IHTN7Z4L71NyVIsL2eJb4zEp1CJGCGFc2fC4FsFsmek8qiztddZcXQKmPncVNsCP6HQ0IuPmvKFLuLZaCnrHGSbQj%2Bla2HaGaG3dxC8uBRalNTlx2qALa1UFLgAFkNpluaKa5d3T%2BVnLDqW8THRQ4bViq%2BNqoERZq%2BDX5z85vH9DBQfwoh&X-Amz-Signature=24fe70a3dcd241beaf56612bda16310a48f796ce78e8114d87d5087c16adcbd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHYMJOKJ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFxjpXPlQatyP8yLxzwnPI4omOSJBu9B5p%2B2hNqZeraOAiEAzHrpmXVptMM8eVYDS2WlqtYkKKaQD9DPJwP%2FXTxVkS8qiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO%2F3Fp9Ic6uvj5gK9ircA5R%2FFgYPXVf6Tolak11n2WZziZ8z%2F12VbUB79EdG5F1NBPCxuAaq344uovcVCdw2%2Bk6Q3y2qvjPq2aQxGpWJFfpMsNiiGkMVuEEs%2BbYgUQfSDVuNRYHlVj3EwungbHtJndRintiJTUft2azgUFhpDO%2F%2FyR5Ai1k6ywvcFscnzs8edMEHDUIjRAq6lP1l%2Bkow2JCvqu0Jp2zNIu6XtGO8qSmo7z29ONwJQUCTaHFz0gYFN98nmHxgo34ja%2BGV0DpHgercaL1YnGw5mb1APugHzQinG3zIpUh6WVRvrP1Vrz%2BuTDUukR3K7d%2Bb6Se1rrRcSOr0IobxFL8kFbSWi%2FGXgTejc5%2FkOMsaXVVdtqz9hWxyGlSahbbgs4bwm7rwnPJRhmUoyytDEnETK8EyOXUllO5TCDd6uTUD0fiZM9Tbi6bKdnUGGGl%2FeGy%2FZ9279wgPIaZpR0E6Szl%2BlJ9zsEqm0f6c1BM4AiM1pK3uRDAnzD9Z72biOoBPKTldyrb%2B3EsPvrtRuMBOqTL97%2F4mn5Hrk1YNXKY2ncwlP0%2BMxMvVdvas0xULSliCFQ5DCaWvE%2F%2Fh9xeEn5OKHrHF1jQpydGEQSSuLSHddApcNVfmaCEI7ak%2B0xE0CT5tbEV7sx7fMOSmxM4GOqUBC%2BXHKOX%2BH%2FedbMXRH6SZ7y%2BBF%2FXEfUMn1L4NO2F551IHTN7Z4L71NyVIsL2eJb4zEp1CJGCGFc2fC4FsFsmek8qiztddZcXQKmPncVNsCP6HQ0IuPmvKFLuLZaCnrHGSbQj%2Bla2HaGaG3dxC8uBRalNTlx2qALa1UFLgAFkNpluaKa5d3T%2BVnLDqW8THRQ4bViq%2BNqoERZq%2BDX5z85vH9DBQfwoh&X-Amz-Signature=abe1f10f28d8c413635f16968c64e05b03e1f15961b2e177a6f88e7b4da92cd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YL4KZHTN%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEC2Mthvmf%2BxsrIXr45pMamszP4MnzBs33q2Wtv%2BZ7WWAiEAx5RN2tCL1ljeCHfdp0YhZ%2F2dCt5Pr%2FH0mf3aiTsDMjUqiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLr7ym9uhqrBEwxllircA89zxpb7bOkJSdzL6vqWWqPnJ%2B4qt9OA7oencanyxhb%2Bk7tCktnZPXvwbjgyy9emzJom%2BP99ujTHrrqgWuTt7%2BVXujz7h4oV9iC9SQh%2BHX09WKewHH%2FYZoyNekKJv5MYlur2SiZVRKpJrMkz6g8vSnoHDGrvwP2U%2FzzFjVBthmOVgL4kXqkC3SKT77BdgbeRFsPW0pC7QkkwuCzfVuDLvhTwrUfoL%2B4hId0%2BC%2BoDoDQ5p5o5nOdSmcwvL4rn6c%2BSHE0kuKFm6muFQPNySxc5AhKR0WVkRMN40gY%2BT0ydXUW9uqTWaCgMaijQQhwXz7SYeAJK6AGjNQOM4BxgM0zPJ%2FM7GlYci62JgfIZZKkfU48f%2Frlp1S57CO2gyyXO4NpzwlEd6fRv8t8zXrlzV0jw81YnwCcRp7OFa0vjtBbJDUy4yZmpz0j8d7Og3gw2OQhsIGBytQTfOEhiwJ8OZ1%2FVQDI02V2yp4qvPjAjJxQY7DpwOjhmkghdNsceprgEvV%2F0UOj3VWhDPI2LHfImdThYpWGJojIJzr00%2BpuUpYYZO236SeWBCm0X0PvG9n12otwj1JSvKl3h5jtQe09SU21i2z%2BrzpawT2Ib9cm4CU8hx3kl18efT21rDNBX2JBHMPGlxM4GOqUBEedQ3yzJQKllf0eYbjPDZyNB6vuT2K7O0zBsN7b4Pjt9GRzuA9DzzqLTZLeRflCX1QJiEo3hYO8EuI5a8cy095BShFs7TF2L057FAk0Ri%2BbDJ4XG9LOvcd%2FDTtO8pSi9%2FYEuZiUCmMbwSx%2FgKl3icd3DOJvie4Dau40gs4fQHoF29g9Ay8k61LygwI1K4hRH1R483v13Pvx3zBiHVBpiEFCmeTTX&X-Amz-Signature=f1a79f9ff5d4454993d6483de435c53994323da04e1c75f6619585cc0a91d87b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PCP66GX%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMU2oPBg%2F1%2Fl6Wc6V0vUPVmsrz3fxZKtdY8qShcSystwIgbc1L%2Bs1PzbhEqrgLTHmWd%2F6AdhmsCCLLkKeI1ojiEyQqiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHA%2BtbC0nqTtIC7JTSrcA8owxZa5zYW4%2FW5nkKB31ikWRSvmgVkN9svcAe%2B%2BJa5znCLnnI5cgYOEHiCT8vzniMqJU3PXmr9w1dSGRvZEvW%2BEJ2UrRdOzMK1627C2kNcoMawNcwRBOWKWfYj5HlOJIfJ%2B6F6GPrLgB4ee%2BwdW8FDYSgx6TizViwp9AG%2FmHW%2FsMZxsYkTtdmm6x3JgmBikZwWuULOkHJ9Z%2BT3k8RCim%2FlAeKURFCFlzigaYuhH5NWomYoSTbbPZANMfH5koOLqTFGiDqn5B%2FFtpA5rx3M3pzvJVe0ZlK7mGusfDdj6%2FHYFyqRYMa7oKMK49rpugMOfCuBhUDMJw2OOb6nmTwVgbuhhutD0gn0AQRLJUu70cnywJuNJrEAf9NFU8K7NkubO3TyU%2BUI53o4%2BLqGciFn23eM6Cq6aEJpIDYuKofcI0xIG8wSnCfGimaRgxEp%2BiSowuFAjUIzmTg%2FJWD91qY6rJytrv1F%2FM929HjrcxLsS5Ygfqo9Qbjb8dfFHh8yFdyxrLxdazm%2FSFZwMXNjn9EpYhz2CJsTETdqSwy8prmalVV1lzR4o6CBU8d6pUlCiJ0Ft4BDVyIp62ZA8lyTGWZrdxJzE7IADt6ZIAsgz9MfYkUHEwIqtCeZRYTMbNH2BMNOlxM4GOqUBhkSc%2FYFIxY%2BltoDnLvNXfA549wSbZZKCl93KygbrZ0y2aVDJLgUPGMgyLBC5mAG5cC%2F3DNVAdOGtZBhWpjtutuysqw%2FbOjmDz6eqXCsdbJ5wf55b5xlxeiSLm90h9YudyUgLHVvulZIrqJdsgbG%2BEArTbCgHCE4Mrtx%2B1Cw7jGM9dxlySE27311B6O1np5AME3wnFgB33715B%2Fz2lYb%2B6ElofAkK&X-Amz-Signature=a9b79ecc4f760e53c17a1b75e816c9e3695f04412ca3c8937be0b4ce319105bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PCP66GX%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMU2oPBg%2F1%2Fl6Wc6V0vUPVmsrz3fxZKtdY8qShcSystwIgbc1L%2Bs1PzbhEqrgLTHmWd%2F6AdhmsCCLLkKeI1ojiEyQqiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHA%2BtbC0nqTtIC7JTSrcA8owxZa5zYW4%2FW5nkKB31ikWRSvmgVkN9svcAe%2B%2BJa5znCLnnI5cgYOEHiCT8vzniMqJU3PXmr9w1dSGRvZEvW%2BEJ2UrRdOzMK1627C2kNcoMawNcwRBOWKWfYj5HlOJIfJ%2B6F6GPrLgB4ee%2BwdW8FDYSgx6TizViwp9AG%2FmHW%2FsMZxsYkTtdmm6x3JgmBikZwWuULOkHJ9Z%2BT3k8RCim%2FlAeKURFCFlzigaYuhH5NWomYoSTbbPZANMfH5koOLqTFGiDqn5B%2FFtpA5rx3M3pzvJVe0ZlK7mGusfDdj6%2FHYFyqRYMa7oKMK49rpugMOfCuBhUDMJw2OOb6nmTwVgbuhhutD0gn0AQRLJUu70cnywJuNJrEAf9NFU8K7NkubO3TyU%2BUI53o4%2BLqGciFn23eM6Cq6aEJpIDYuKofcI0xIG8wSnCfGimaRgxEp%2BiSowuFAjUIzmTg%2FJWD91qY6rJytrv1F%2FM929HjrcxLsS5Ygfqo9Qbjb8dfFHh8yFdyxrLxdazm%2FSFZwMXNjn9EpYhz2CJsTETdqSwy8prmalVV1lzR4o6CBU8d6pUlCiJ0Ft4BDVyIp62ZA8lyTGWZrdxJzE7IADt6ZIAsgz9MfYkUHEwIqtCeZRYTMbNH2BMNOlxM4GOqUBhkSc%2FYFIxY%2BltoDnLvNXfA549wSbZZKCl93KygbrZ0y2aVDJLgUPGMgyLBC5mAG5cC%2F3DNVAdOGtZBhWpjtutuysqw%2FbOjmDz6eqXCsdbJ5wf55b5xlxeiSLm90h9YudyUgLHVvulZIrqJdsgbG%2BEArTbCgHCE4Mrtx%2B1Cw7jGM9dxlySE27311B6O1np5AME3wnFgB33715B%2Fz2lYb%2B6ElofAkK&X-Amz-Signature=a9b79ecc4f760e53c17a1b75e816c9e3695f04412ca3c8937be0b4ce319105bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665W3WBVCV%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T134242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCK%2Fqd7WavJEJQhcFhC7OKbfhRJf7HoBZEs1DBT3vlX2AIgRz1dflBUpTR9U9X0xkg8MPukpwSQeoCNDBLlxMn6QoMqiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFVJqBTlOka3CieUeSrcA%2FMvXTwZLkvBlKE2mtyzntLoaAa6qrRoHRiC%2FaMDs84P26awn%2Bpk2WWHsWU26JVPrh8mdCXZ2EBT4xvqNbzm9d4kIQcceVs6eIvdbMADGjIZ2qbECFEzxq8zY8Yk2JxDtr3%2Br4msrQDYSc9avDjWP134ndOxl57ip4yLfULLsVoGj9W0qKQ15YPSfC2icAm%2FTiyyUw7t4xrkfO%2FQXz5SAeJtabYmDpNjwNx7hX6tsx9chtaZL6S0NybZRj7nt5BAWOwIA850U63Z6oDm4pJqpcGLl%2FNkpsz2MkcwGYr10ekGUVKIKhRHlrvQels9%2Bq9pnZfHfUHyoppWGRhhBSayiAGCyMXs5F6kUmaQD0po7SyFoDUyHFWwZ%2Bq75r%2F6arrkMxSANuSUytNax%2BYyxEkvgiN5O2Ez0N4ZTzI0eAmSkMtVuf%2BWHytCaerfqLiYmyU2Abz1xJYRD0uNrcFxdeSZEHG3IolxHTeVit2IPIJEmuoFqs6fiLoRT0idXDKMbPRnfeIOVklE4jeBoK8dMTbDjziJwRWwi32eae3IdUjMMVf4Wlyh8I1Je1wxEXsHcUDdQtKxQZIONUGGxOBtbjso1m5WK0vNb8vDRrhV5KuZWulyUJC7UBCrYN3ZdIeiMOaoxM4GOqUBtWTrRviKj65toGPl9j%2FjEaq2aX27DOgfYYotPBHnrxl6pLBwis1xH1wh2TKx%2BsbT627IcXY%2FqwiLuFKiuhLtu5ch4M2ko1pxnb1JnLrV%2BxfAFUOkUiRxQMCI0Vik7T9FRPC1lmNA7%2F91jmUiv%2F6ipdrMW%2BOT0VSBVVKpbuoUi2n9cu6NLamv%2FzKUtaJl6TZ9Qe3AJMJqTjwzkCZ21pynINHlR%2FlK&X-Amz-Signature=cee651e425fdad6ca76c6def12d32c9bec605a809ecd6bb181edf7b6622b86fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

