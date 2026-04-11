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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656LKXP75%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIF8QfIABPQd5ep%2BF1crjrDa2Mfjom1fa2xti2S5CLwQxAiAof9OlFV6xyh5%2FGBOD%2Fh1hG7jgOdFPqho8IjqoMGTfgyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMCx8pvT7D%2BIUF5ZiLKtwDgDe6Sm6jnO6S9hCuF%2BJScRPJ61C9GQx%2BXfTJKeTtAtnqg8MTcTYyP4Uycro2jBldiLMxa%2Fq0H4Gf1ZIsgkQNsCail6hGuqM6YwYC8c5uIORiwobkctGPUDYmkxrXkpxC5VO3JuoEgvtJWkPbYV5EEz2yGIzadaXB5DKvAsk1M8x3lP3oz0AyVdYLf5wI0JPUREAApIdHL0KUGZ2MLJAWf8M7l6V705YkWku5yAIOTM3UJQFlimsvd138baMEzRLnJJYQLuoxEpbHlAx%2F7XucYYSjvze0mCbLqLXEu8eyi2Xeq3aHtQ9GW%2BFo0UC%2Fv%2Fw5%2F%2BbkqLiSRRLobh7kBdRhNjvFn69ZpZVYiYOyPk9TPSg5MisFM3PC3ku8MjjgmpwovH%2BmoEW990VGNDVgVKgtZXyHOsHpWv4rDy%2BE7FwUsl71%2FlZrDN5N9VBMzSiZCuoa0xU%2F3PPuDPIYGPwFpn7yPCxFz%2BXBz04ISFOaw0eRXHzyKZM6DQt8BzGYgCOqhuJlvQM68oRCQqJbelNEQTMXndfnTwdrj3zOfjIsYwqB2of33mkbNh3gIUycVMc8e9AmbPd18OXxBSTYpXBb4gUAMf0h%2B1zI4n2qevq34slITNEikZiKLptD7RiKLxYwpK%2FozgY6pgFj36mGCTAZ9W%2FZ0Rb5%2BYIsfZtXkdxjRD0IKA%2FMXR78sEDBd5FvvvSvWgcnufKJrA%2FXZ6%2FVpCs1ovJkUB%2FB1%2FT%2Fgxpv7WwMASGUP%2BsfB1BnHDod0VT0Hzy4SAXECnctZrWFp%2FrfSLnh3NMI%2FuPNKxEW9HrRn5ZflPe8gDPeghYiQHNc%2Fnpzk5vrRWz7c%2FXFKWmHORdF21OB8OIQVUkiDc4%2FCDDwpQYO&X-Amz-Signature=86bf5292183a0e9ff6b4f4d4d2644d3357e632f3343617a156f9d8893d0d1c22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656LKXP75%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIF8QfIABPQd5ep%2BF1crjrDa2Mfjom1fa2xti2S5CLwQxAiAof9OlFV6xyh5%2FGBOD%2Fh1hG7jgOdFPqho8IjqoMGTfgyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMCx8pvT7D%2BIUF5ZiLKtwDgDe6Sm6jnO6S9hCuF%2BJScRPJ61C9GQx%2BXfTJKeTtAtnqg8MTcTYyP4Uycro2jBldiLMxa%2Fq0H4Gf1ZIsgkQNsCail6hGuqM6YwYC8c5uIORiwobkctGPUDYmkxrXkpxC5VO3JuoEgvtJWkPbYV5EEz2yGIzadaXB5DKvAsk1M8x3lP3oz0AyVdYLf5wI0JPUREAApIdHL0KUGZ2MLJAWf8M7l6V705YkWku5yAIOTM3UJQFlimsvd138baMEzRLnJJYQLuoxEpbHlAx%2F7XucYYSjvze0mCbLqLXEu8eyi2Xeq3aHtQ9GW%2BFo0UC%2Fv%2Fw5%2F%2BbkqLiSRRLobh7kBdRhNjvFn69ZpZVYiYOyPk9TPSg5MisFM3PC3ku8MjjgmpwovH%2BmoEW990VGNDVgVKgtZXyHOsHpWv4rDy%2BE7FwUsl71%2FlZrDN5N9VBMzSiZCuoa0xU%2F3PPuDPIYGPwFpn7yPCxFz%2BXBz04ISFOaw0eRXHzyKZM6DQt8BzGYgCOqhuJlvQM68oRCQqJbelNEQTMXndfnTwdrj3zOfjIsYwqB2of33mkbNh3gIUycVMc8e9AmbPd18OXxBSTYpXBb4gUAMf0h%2B1zI4n2qevq34slITNEikZiKLptD7RiKLxYwpK%2FozgY6pgFj36mGCTAZ9W%2FZ0Rb5%2BYIsfZtXkdxjRD0IKA%2FMXR78sEDBd5FvvvSvWgcnufKJrA%2FXZ6%2FVpCs1ovJkUB%2FB1%2FT%2Fgxpv7WwMASGUP%2BsfB1BnHDod0VT0Hzy4SAXECnctZrWFp%2FrfSLnh3NMI%2FuPNKxEW9HrRn5ZflPe8gDPeghYiQHNc%2Fnpzk5vrRWz7c%2FXFKWmHORdF21OB8OIQVUkiDc4%2FCDDwpQYO&X-Amz-Signature=86bf5292183a0e9ff6b4f4d4d2644d3357e632f3343617a156f9d8893d0d1c22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ITN2AX5%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIDLwsymLKewZwXVwatMEsIyIwiEzFCFEMleTZ%2Fu52KVUAiB8CNcYcwBTijbLT1YQc356SIFOSPIfJFEjTxYnY8NzICr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMpmgxjywqqmaVakfnKtwDfPmgkwZ5RtUsyE%2B4S%2FuYZ5ST8S7%2BrZ3JvtmpTZwMv%2F%2BUeHE%2F%2BWwHhC5KyvrTRLzpVBmNW0AV2lCVj9I%2BwGjbhjHRQoVqpvi9Ace5rVbGYBDZzKgkbne7Nhv5J3d6HVz1vzJCpyUdT2qwtowp8Dpk%2B%2BrGrl9DO891OlqSheX4iMhV8bFCMlOw%2FzaKeSk%2FXModObW0OXzxHeFcH3X%2FHm%2F7c18AckyQQA%2FWeA9pv%2FOvxW3eLEyLffDwApeVJgdQdX5%2Fp0rXq48gyN93a93c0ih8%2F6drf8thu4BQxM%2F0sOvEJe1uj1J6IxLe%2FJrjktseuniSghOol%2FBSjWh6bMPGIhbHrFlHNY2DbJ3HILh3UEZ1EqAgBh6q%2F1xuxVxbr4qbkCph0ssRDzcr1d7FplaqTwuD8wCrtdiLdiFgBHzFBZ3ynSdQIfxo88ClQTQSIti5xegarP7cMXp29oiFZwzW6B2%2FMifyRM%2B5K4tphg1Hr%2BzxEbubG%2Fo%2FfBtv9tXG84GacRsyRFJrjJ0TnzT1GgG%2FH51bhVy84bqmD73C%2B92JwvkSTx2t8yi8IT3kGzTGmZm0dpoaLfG%2BsjNzcjY2moro33qmMe24auzzhPckCiLFdYtxWGBseST9np0VeUCSuK4wpK%2FozgY6pgELq3EOtUAO5HdyU%2FMbxbJsYtxb0kymME3pN1Oc0dgm7ohIUi5AJ%2Fy6ULAk2pVcphfH5kXiXr8KPwEHKQZJXbiYR6CAPet7wbT4IcO7OeADTVsMrNr7fbeLDudFGf51X3qn5VmOBUukrwQ7c01MfClGgquUcZJybVZoCHzhd0msHnNiC84vG7imqhovZLdu57n2vX2%2FPqSkCUKxuv2CzxFWQLm1EdMT&X-Amz-Signature=061a7469828e58c1d22c3cfc2a8478e75ef4d24be140b6bab7fae6cfc17cb7c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HFSDLIM%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIGlHGtp%2FKp0wyYUuBGWbYFAs4A7l9Idq0jM4tmjU%2BbuKAiEA0Q6BkyLC%2BongOOo7etyR9hwuC9RETpKmVGca%2BhPCvtoq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDCnb7OAd6JvL4%2FG01CrcA%2B97vnKlFOFbNJ5dAE4inmyGQ3EQjoIpqkztS5sj6uPj980FggMLh0f0wbs41qLZkoRMbt8ad%2FeRvOx5IJB%2Budl7eoHs7esQYgCjZs6goEO2icVpUQ1i%2FdYaaoWA0xA1I2c5vLMyKgArxY0GzD6ZYgle8bG4XYjwtbMQMZx6wnW%2B21fBqubvnhT7wOSoK%2F5Y4pbYz7Q68xkqKBKno0CXNyBRiI8J8XmlX%2B%2BfA962JD9qEDZb%2F36F49ESaGMxgivKgtL%2BAYKujxn0lD5NjcjG9sHo29w0IOLHq2bSwfaaEyHatSZwJgupw%2F6%2BGH86kpAQQBcpT%2BSUFXeqFHsLMttNbRPbikvd2llkmYG3O6Z6tVn09to1RSZDOzMcSRVU5%2FGRYiBxvmCXRFV2%2FU6zj2X9Xd7GBeHKfv0JuL5Q4iRI0ugdrgtWxNOYAvbazkfPpNYy7bNDLVM3wEF9fr%2FH8mxHvps4k%2BBJgmnp%2B%2FkVZ5eQGi62Uqx5owC9RYtBF1tz8CH4c7GZgKfnDKODvdPR%2B3bdT138YhDCu5gA1tTVUu%2Bvd%2FZiH3dxqINPxsoqn8RzCJ8M5wExSV9PUiaWERXGnig9WcRQM61kbTuVUnm47xmI%2BymvoOsTFcLQqmGhdudnMPWu6M4GOqUB2oucCOimcltiRykWWcXiaMsYPabTYo9v5aUqYxmfBVkqmb282kCl8yDhzbWw%2Fx6FdhuZH6uVisFngjyP7c%2FnaFbPMJhQISDFu%2F4abbTvZcqVMaG3zIuoxQuq%2BSisaPmDminEOgkDmVibwNS5LfWAX1H7oJFLylScKGZpukAK0mEMfoZCH34gZq12RxEcsyr9nsl%2Fv09MQ0tgyGz0yLViznv1Mysy&X-Amz-Signature=d57ba07d3d8ff3d2a9978c681709cf3c995e0bbe9f51542dabdc67311bce5223&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HFSDLIM%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIGlHGtp%2FKp0wyYUuBGWbYFAs4A7l9Idq0jM4tmjU%2BbuKAiEA0Q6BkyLC%2BongOOo7etyR9hwuC9RETpKmVGca%2BhPCvtoq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDCnb7OAd6JvL4%2FG01CrcA%2B97vnKlFOFbNJ5dAE4inmyGQ3EQjoIpqkztS5sj6uPj980FggMLh0f0wbs41qLZkoRMbt8ad%2FeRvOx5IJB%2Budl7eoHs7esQYgCjZs6goEO2icVpUQ1i%2FdYaaoWA0xA1I2c5vLMyKgArxY0GzD6ZYgle8bG4XYjwtbMQMZx6wnW%2B21fBqubvnhT7wOSoK%2F5Y4pbYz7Q68xkqKBKno0CXNyBRiI8J8XmlX%2B%2BfA962JD9qEDZb%2F36F49ESaGMxgivKgtL%2BAYKujxn0lD5NjcjG9sHo29w0IOLHq2bSwfaaEyHatSZwJgupw%2F6%2BGH86kpAQQBcpT%2BSUFXeqFHsLMttNbRPbikvd2llkmYG3O6Z6tVn09to1RSZDOzMcSRVU5%2FGRYiBxvmCXRFV2%2FU6zj2X9Xd7GBeHKfv0JuL5Q4iRI0ugdrgtWxNOYAvbazkfPpNYy7bNDLVM3wEF9fr%2FH8mxHvps4k%2BBJgmnp%2B%2FkVZ5eQGi62Uqx5owC9RYtBF1tz8CH4c7GZgKfnDKODvdPR%2B3bdT138YhDCu5gA1tTVUu%2Bvd%2FZiH3dxqINPxsoqn8RzCJ8M5wExSV9PUiaWERXGnig9WcRQM61kbTuVUnm47xmI%2BymvoOsTFcLQqmGhdudnMPWu6M4GOqUB2oucCOimcltiRykWWcXiaMsYPabTYo9v5aUqYxmfBVkqmb282kCl8yDhzbWw%2Fx6FdhuZH6uVisFngjyP7c%2FnaFbPMJhQISDFu%2F4abbTvZcqVMaG3zIuoxQuq%2BSisaPmDminEOgkDmVibwNS5LfWAX1H7oJFLylScKGZpukAK0mEMfoZCH34gZq12RxEcsyr9nsl%2Fv09MQ0tgyGz0yLViznv1Mysy&X-Amz-Signature=b6e09417ceb1a0b9d5665748603970f69de2edf5acf623700bebd7e8f05c3bbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LCLEZRZ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCICe1VEh4YI6bIEwvLZae%2Fg6WilJyjPIU7qV6uAOWUZhuAiAuX3iM0FTeKyQTliRc4RyrJ23xuBjfEMhHb%2BTCBXkswCr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMchZOAz8ijyvQb3HLKtwDUeH8RsmW4iou5P86%2BfaCPJBN6Pd8%2BDtnHFBfxscOpsUuPRIj5GIeX0HJ0ks%2FK2uZCHDGbVkPOpggYSivMOrHoxXyD1Ul5rsEm47LG%2BWxiuxGCG5gcJNGyqGH3fUkaXzedbTaA2hi7YjoM5A39Plggrv%2Bvp8443yU5E%2FE9ue7kAp4IAJYd5AE5I9R0PloLM0qDHBsse%2BzWHupDeGKJZUXRtCmGr89xjRIx2t76E2XwtKYTAcaXBpW4fqj2O%2BpJloQCJv5GfOf1%2FgH0vPpta9bDQk2g2JeUUafanytEGlpesU1f%2FjJmmWXbnwlFsL0XP7fWm17QOEyNzFk%2Bq05m8n3CgSg%2FxhjAV4LR5cdLT1xGSjGv4wz8JoTEp5d58GvqTbjI3XcxTgKd%2BD5bZX%2FmEUfx0zBXVxHAaxqvYjg1j4tQAUV%2FMlF8%2FYjbMWDGRl%2BfJPdHbtHkMOWI%2F8pyjJKIg3O3FMK1BBkqUJJIig7Qth0E4f8JzyvVWtcwGlM3ksj3obCnjTDKWB8EIUoyQz%2BSoUWXym6EdcEBDMrJWuPJ84deb4KIZ6ErHx1F4IZE4o%2B1K8qh6C2WaE69rWnYw5VS9NxE9IAatWkFSB1NLhPyYAfVLcLNCLN8cOnoA9vFhAwsa3ozgY6pgE%2Fi081BqJbItnh%2FuJm%2F6nSDpnZFh1xiRKjoN2IZiTzrVzXfq%2FsphH04gdPJBlfIrvHXiPEObXM4rpRtqZd3kRAb7WAEkNuWgFHQDzt4scM0LLdjwHXGeZOLLP3Iai6Q3Zb5Nls5wXDltB4oiujcYwXYWNPrv%2F5e1OpvSlyt0Wcf4uI4jdVB6V1ilaft8kON%2FoyWKjGIMEulNbIY5QoRnObxT7OewGB&X-Amz-Signature=01f9d86457592b1dbd8a2f0408b02e7e15b070e000ab34e0c0f25c631346839f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CCD3MUG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCID8%2Be4D6F0JaU1MyeUn69G5tIYmD1B22mOldSdgAc9JFAiEA1pslpVQ8Nx9AM0y5yDVJvFr8hv%2BBb%2FXm8rXuCaoo%2Ft0q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDJiQB43CAEiURkiPyircA9WYFz64QYO%2BDiCSxHElxsDOMukTMY5iV%2FQY3XkR8tqjoNYPiwhACBtnrOwfviQ5ZFsH%2FZTK%2FAzml0diV2a1IAaS7Cfr6Fl6x%2BFE2Kk1h859OdmMD5OdJR6uOi8HKTcbfrP%2BZ%2BvN5pGm71bbDkHNIT%2BTwCUkQMSS2Tl3G3z67eHFxg%2BJOQNoCtUqb9JLpJ94b4oRXVGVxjsgAZZVpyRO%2BltsDxIIRvxSOZiz7JPQwI37pZymAveY3hUKFjD24fY9JPNWcQDDBKSEk4LeI%2Fb98AC%2BAzX%2F%2FZPh0YU5LB2IuNmFr113mGhWIyhMrZoVLRT7x%2FSTYTJFHAtXwU8GmYl56F1kzr4IykD7%2BmsnbJAlHGknVXQby7i7tAVrIyWpznBVqboaV6ugvPOJ0b6HCwFFr3osOtAl2b7wuELbuGnBGXayf%2BxHymjLdweMBnhLOlaLCoj5qbYWepDWFosD8EcoaSVdigckB0TdHHjNQO5CqLhLAunY5wSyYk%2FigsrU8%2BcX2q4zmz9ARZ1Vls7eXN%2FUFomHyK3%2F%2B50ug7aDYxiojxOyyfhMpJflnChBr8loSSIOPr9A1Bdp7NwOeC4gLtxJJRdXpYxaIzshBLlb7EegB50Y3w%2Bf42MWN3p3KfApMP%2Bt6M4GOqUBN6%2BsdnwowOqhRGVZCdoTIL8Nf2l5PSibqxi8XGmlHpNd36mBvZkOXJU5zoFkzKxRkzddnm%2FnzMJkeLOGNpbToT58Qrz5qI9k5doTYxhyQ0SzaOVVifVyui8RE2Ar5TRWGmn0NEyYDGuaDosbq%2F%2BMidIFbkjmXecT1nZcaiFw1lyLhgJJJynoko0f4HrsDn4iadzYV5ZEWNGnsUA%2B5f8ZuCFlXQBM&X-Amz-Signature=fa3fb024bf57bc036cd73678ae4108a64460f9650aa45c22b1153e7f0edc33d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMXX3P5C%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCuE7TCrBK7Av9AngAJ8EMCzL3hIUoRupS7gkQjUiSE2gIhANuhM89wjD2IEIX83xkV8LQDNUH8yEN1mv4gTnAGHj7eKv8DCEMQABoMNjM3NDIzMTgzODA1IgwtbPJbIWiaDf5GnEwq3AMbMrIemTQs4QjBt5Ivc%2FjMRqxTH0wwo2jckW3U%2BNjY72eAp0b9MVyNVXwZ57fjBZMBvh9%2FOpKNUFgVfxIAf%2BdV43nVg%2BZE2c8qCf6isiVlHX5rpqh1S4FaV8WwOclqur7a9Ka2twGId9fao0ruwK60bc5udLJe5H7ja7tI3VBOMW4UgNSzwasOstkdRB35C45eSrMWaQrfG1Cggax0QTh8Tx%2FboIgqRLIOKFvYFH6aKZVhKzHMdMVCwF2KwMOYI7lSt%2B9F294CtLtqXjotnMnqPr78X7GZtQIz62uOpR5v33FBhpibL1PP%2BWW6%2BbfOu%2BNYAoNwbq272xeLAMd31EbMXRG2aRFEKQNTxCzCtFoDX%2FQL52YNivdx4yN4GrgR2lw3ehBj5p31CHUdjVRo9VqH%2F3bqmzzSZcPh44f%2FZ0jYYFn9EGpGGWmAsj2PSYHylB2g4P31PnM5r737K3IHJqp3cwAblAZu%2BHnb7loMnoNBZVuIxyXqMAmW2NCFvZe8I8aU%2F7H2ojrUxb%2BcIqWYAbXv3B4v%2FTsAQ69DYYHuln0YLM%2B5%2Ff6TFfV%2FAT0tD7NfGju%2BvIdXNUH9UMqYby%2FrW2jqCOObaL0Z5TRu9nNUPfrvYSnxnXaueruGoqmMWDC5r%2BjOBjqkAQHWmzDkptZXjboWRrStcxOAHBNix5uD0T4pOFcMTbP3w0ugs09RzCYJ9cGxU5uIs8QYTkQE6b8jTX1XI8n3wSTjWLmt2jkpm6l3niMjOOXFuYKM5O%2Bick2IECBYUhCxC1WGV75dpQKnP%2BsT3Wtxl5xuAm%2FMhuXWaksLgxViIXrY6pjD98hIYCnGRQZX%2BccCuGQo%2BWaND5EBlhD3Rt%2BUddfkg60C&X-Amz-Signature=614a1ddc2dc987ccfd86523bd974b53c38bfdeaf61dc1d2a1b4ec919e4e06287&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662S7KCJ52%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIEJcca7PM7SDxRuAl5V11yy%2B5TtHSRPuEG5likn0Tt8RAiEA0gk9m2NbFAwSRqotL2s5DjSNklBCrZ8JoFyM8cr7Fb0q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDDht6hausHg2iuSJuCrcAzjTrD4WfyjN1neU68g%2FxSjawiajgcCYbgIgO%2FEBUKtRcZJTKRgMOWVCTYSRK1633x8mpY92f2jXgo2TapBri1SeL2IbfmxnFn2F86T5U82NZ6vpWRikJSZQZMLPdduYd5w%2Bv%2Bgxr6dOj7LkxGx3%2FXpZWryTJxI3sSl5cRLB5dOayhVMABc0OAWZ0Xfw44qhvA7DfzbypC8UFbvK6jB%2BNWEudq3ADMWnMrTrsZjwFtqcGTF9gNkaqyy%2BxhepEu6jpD4zkftV%2FESyIIKbb3gniaiLd2eYA4Tu6jEDh0K6J9%2BkZHp1fT6LUc8ux9J4K6DXPrTPNr1vcLl9vszGXF1npxk%2FygRA7jpLPv3BNd5FePuNV%2FR2XpOWhAsqF1ct9v8qcY4NBhdlYeAP8SuCvMWv9KTmaYmrRf34J0Wt8UlDIw7JxdYrjW38lmqFN3fIDu7cYLUVWqHudPHxQHptummQXFNGT3QhFUJKGILGFzVPtMMTM2Jek4rNlUpgIPnu3HdiwsPaQylgQj7VgkjdRX%2Bcknh%2FzFyrSxttCv8XTNbtKFDJ0Hxwl6Sp%2Byy36GmJzBEBNprzjVK3ZZ%2FNdEr2zPqYjWFFs2IMMTLYgwGqZUkT%2F%2Fx397pqcgMp0Sq9mbqDMJrX6M4GOqUBfISKFNuQqOYbgw7KY1Xcez48sS0Fpf9417tz7rxSDx1cedYNrZzepLTh2bSymHQ4jEjE9Zo2B20ZNjUmTavgYtTHsbAEsbdU3rzMeMMwPZxmrTbT58Bo2YACwULBGEpVpOW71c51dA6701tqy%2FLUj47borzJOhIe1wcIivqgs2PeJhlw0yDlkmN%2BwOM1ASnuQdmHlyHT0E8jL5Db8qDBanKUnmgm&X-Amz-Signature=e058950b6aaf7dd86bd916124c62345d1a5d470f5702ae02b9676e672566acff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662S7KCJ52%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIEJcca7PM7SDxRuAl5V11yy%2B5TtHSRPuEG5likn0Tt8RAiEA0gk9m2NbFAwSRqotL2s5DjSNklBCrZ8JoFyM8cr7Fb0q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDDht6hausHg2iuSJuCrcAzjTrD4WfyjN1neU68g%2FxSjawiajgcCYbgIgO%2FEBUKtRcZJTKRgMOWVCTYSRK1633x8mpY92f2jXgo2TapBri1SeL2IbfmxnFn2F86T5U82NZ6vpWRikJSZQZMLPdduYd5w%2Bv%2Bgxr6dOj7LkxGx3%2FXpZWryTJxI3sSl5cRLB5dOayhVMABc0OAWZ0Xfw44qhvA7DfzbypC8UFbvK6jB%2BNWEudq3ADMWnMrTrsZjwFtqcGTF9gNkaqyy%2BxhepEu6jpD4zkftV%2FESyIIKbb3gniaiLd2eYA4Tu6jEDh0K6J9%2BkZHp1fT6LUc8ux9J4K6DXPrTPNr1vcLl9vszGXF1npxk%2FygRA7jpLPv3BNd5FePuNV%2FR2XpOWhAsqF1ct9v8qcY4NBhdlYeAP8SuCvMWv9KTmaYmrRf34J0Wt8UlDIw7JxdYrjW38lmqFN3fIDu7cYLUVWqHudPHxQHptummQXFNGT3QhFUJKGILGFzVPtMMTM2Jek4rNlUpgIPnu3HdiwsPaQylgQj7VgkjdRX%2Bcknh%2FzFyrSxttCv8XTNbtKFDJ0Hxwl6Sp%2Byy36GmJzBEBNprzjVK3ZZ%2FNdEr2zPqYjWFFs2IMMTLYgwGqZUkT%2F%2Fx397pqcgMp0Sq9mbqDMJrX6M4GOqUBfISKFNuQqOYbgw7KY1Xcez48sS0Fpf9417tz7rxSDx1cedYNrZzepLTh2bSymHQ4jEjE9Zo2B20ZNjUmTavgYtTHsbAEsbdU3rzMeMMwPZxmrTbT58Bo2YACwULBGEpVpOW71c51dA6701tqy%2FLUj47borzJOhIe1wcIivqgs2PeJhlw0yDlkmN%2BwOM1ASnuQdmHlyHT0E8jL5Db8qDBanKUnmgm&X-Amz-Signature=5b151f0e49e3f6171b519acf667b16b1268b1a87fd4d21f31ed0b533412784c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DDWQ7NR%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCICkLjVzxvE6AqAEiRyWNa39BEZeV8O2Elu7FQQeVyTeNAiAmRsCfDTzmLZfBjTqn1xec16a7aS3W3VoqUoBp2Rx4Syr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMlxET9Ol7D%2FfkAsqgKtwDfCDvxKZ%2Bh5QB6PHMCcXs6ln3fSa4i0n%2ByXyj71hZCl40lpx%2BgOTDM%2BRcx7w7Hf7rTQLd9IXU6zcXI0dMQSuMicThxzn1n1bWEfTO8WaijA9XFZCLS32Zp1MmcWZIOiTAaT%2BGwhhun68yGnZIkGrbpPPJeEIS1rr%2FZXm%2FUurFJQgO7WxU%2B1BkyurZrDR4ts9Sz9Y0resIx0mlheKRg7qxqfdCYOVwxxg9Pc5ggd2XBqbOl209iQTc%2F0Ni7NX8Nn%2B%2F3qFJOftRpeT6EZnC5az9TlC03l4zpQXkXOTKbSfjtyqJooDi1IS2AoppbGPzzaGVaJe4i2GUTqdJa2iMP6jiXAIsl1O0ElirvRAjkr2MraCRhAi5Apa3AShoXr1ZHjZOa79tKs3r3Zon4MCSTx2mC3eIKdr%2BKuvO0ygTOd9ACZi00TplQDXe%2BU%2BNeoJEqgO17jKVDPCbXMfECrYRh2UZiqNpmqOoiNjfuNJ8AnBELixrSs066wbl9c5cYwa%2Bkk3IjVtWVAxaYjlHeb9rBINTCI3n1Y%2Fs7KwdgyuncU9pcBwE5xyk%2FS62IVWH%2BmDPlaa%2Fe4dtAJEhJVs2fmFuPlbiVouU%2FZyQbrFiyRhdQIeMxxKmdjMDGAREo8%2BMxa0wvK3ozgY6pgF8%2BVnkmDSbJuhsyqzOQuLuvo4g1EJC9V07AoyeX2asjV9gafMUy6CCpm9IzDEwX%2FTI%2BbgGVP3Zeu9NfSfXhhDv8apnkjA8oRuSe9LLca0NqstTMbF8GSEIppCVjCIImvfNrud1VJ1b2W0UI8ifacrKVVmUQ7FqDMMaQVidvz4lYVjLiEmqLPsUvRzjx87GGNr2pHD8NyhC0XA29E40UjaS4V3NNpYp&X-Amz-Signature=304d6a602c27c374a3d6b2ceeb1a1a72f2877d57a208279e4151f5f3448201be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG4G4XKE%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIGggVSbXd2c1Nx15rGGanNaL%2Fv%2BTnGipTwRHyJA6mQUKAiEAiDknoG9kC%2FvQb9gBtgLeEEHRiW6kwrHfslI4f8LXc50q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDAZV8FS1wjXG2JGYwyrcA37qESA1%2B5UKAYYa5xpe74cwPyuQJwBduBbtUA0bPeCJLrme5LvhPhlbf%2FrwZqpu%2FvoTPUHPAgi8TFrANGQWsd0hqSMye6csDbSc8n5h7rPER12CM%2BXFw2DbKbPrbLMuMnDqTuC24vQTmIQ1oPqMLm2pSzq%2FJ7GlMC%2BrZnr2Zo1lFtc%2BEs0rUl%2BtVdCP4JY7ADMqpsesbvAKy3w8AsY7yXTCwYPQaHo767XZWuSsZCisMLHODh6l%2FE%2FlUbKVlqDPfMA%2FheQqLsrpCruPJZFRe7%2Fdhw6ecQQx%2BYeHY52c6ebRAQI8%2BYGoZyFTb5YvEAcKEc79wll%2FUHm%2FQsoMBMAYj6heeye1s%2BLewpV0JmyWZfRX2MO%2BI%2FCsz3U2hEOaAo0MRSO%2B3W8zcqP1UbJqWj1NQOaTp3ziig3%2FY%2FMYgxuUPfJgVuE0KjxWDvXGCuFvWyucvnoPgpMSium2w9vhJfxf%2BokexEioDEMMbgTOY7GoDjniTSleS8XvZG6E%2F%2BysVE2cR49lsk7mSP%2FNhOdeCaE7QGsaxuABQjTAJJ%2F5gvmVjqTE5h%2B5wFxQIWPQ1UPpI%2Blw%2F%2BegxgrD5WTjPFQmog%2B%2FCimk7pg%2BejLTXDQXiC0FbbJ9nPXSv%2BGhk7FrE3b%2BMKXN6M4GOqUB2JIh2pz96vCE%2BF6zY9QfmvPa6m%2B7JNqDB9FcBnmvmPNCMhCl3fKFbXBDGS4mH7WZCl11i7AiacNWs0wb7Lv7wcMBcRqmrTgBz8CXiheUJkIhCbzYgPyVBAaploxQWcnhGKn%2BQ2k3PhPZFN0adFI03WdWc74qAxwkwb11oCVEmLPYx3NwHDRm8TTk4NbbCXFcJMo9%2BNrDoYWvGGxca5V%2BV46GXouM&X-Amz-Signature=627cd5ee62558fbf18c4b0e6793a8e80f5290eac414a7d4963e8574a18931282&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG4G4XKE%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIGggVSbXd2c1Nx15rGGanNaL%2Fv%2BTnGipTwRHyJA6mQUKAiEAiDknoG9kC%2FvQb9gBtgLeEEHRiW6kwrHfslI4f8LXc50q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDAZV8FS1wjXG2JGYwyrcA37qESA1%2B5UKAYYa5xpe74cwPyuQJwBduBbtUA0bPeCJLrme5LvhPhlbf%2FrwZqpu%2FvoTPUHPAgi8TFrANGQWsd0hqSMye6csDbSc8n5h7rPER12CM%2BXFw2DbKbPrbLMuMnDqTuC24vQTmIQ1oPqMLm2pSzq%2FJ7GlMC%2BrZnr2Zo1lFtc%2BEs0rUl%2BtVdCP4JY7ADMqpsesbvAKy3w8AsY7yXTCwYPQaHo767XZWuSsZCisMLHODh6l%2FE%2FlUbKVlqDPfMA%2FheQqLsrpCruPJZFRe7%2Fdhw6ecQQx%2BYeHY52c6ebRAQI8%2BYGoZyFTb5YvEAcKEc79wll%2FUHm%2FQsoMBMAYj6heeye1s%2BLewpV0JmyWZfRX2MO%2BI%2FCsz3U2hEOaAo0MRSO%2B3W8zcqP1UbJqWj1NQOaTp3ziig3%2FY%2FMYgxuUPfJgVuE0KjxWDvXGCuFvWyucvnoPgpMSium2w9vhJfxf%2BokexEioDEMMbgTOY7GoDjniTSleS8XvZG6E%2F%2BysVE2cR49lsk7mSP%2FNhOdeCaE7QGsaxuABQjTAJJ%2F5gvmVjqTE5h%2B5wFxQIWPQ1UPpI%2Blw%2F%2BegxgrD5WTjPFQmog%2B%2FCimk7pg%2BejLTXDQXiC0FbbJ9nPXSv%2BGhk7FrE3b%2BMKXN6M4GOqUB2JIh2pz96vCE%2BF6zY9QfmvPa6m%2B7JNqDB9FcBnmvmPNCMhCl3fKFbXBDGS4mH7WZCl11i7AiacNWs0wb7Lv7wcMBcRqmrTgBz8CXiheUJkIhCbzYgPyVBAaploxQWcnhGKn%2BQ2k3PhPZFN0adFI03WdWc74qAxwkwb11oCVEmLPYx3NwHDRm8TTk4NbbCXFcJMo9%2BNrDoYWvGGxca5V%2BV46GXouM&X-Amz-Signature=627cd5ee62558fbf18c4b0e6793a8e80f5290eac414a7d4963e8574a18931282&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634OFMBW5%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T142510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIDl5J6UuZ4%2Fum%2Bxsgy5iECaoA46pdfU65YksJmaH0f3AAiEA2t7lfkOZZgCAVHM0XZENy5hvQrJL7vRxN7WFjOoSrU0q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDNkN%2FuXeHyD%2BG7QRsircA089yHz9J1prU7y70%2FfOHHSdeh3MYX6Mxmb8SIuZFmpMDlidAHGv%2Blbb%2BrzV%2BS9AsZHrG29sxbdODOiWsER0e7Aw%2FQpQaepNV2ynlb4QBbfv5nYco5TG1tVoaGdW0SL3yW%2FOc%2Fuy22jXPTHGtc3eFT2SlLUcusZT0vq22cSu9LQjNIFidL4FKkAV%2BWBYhrwbtk63cTd1rtfvTqkGUrk%2Fj9ROb1WIRdjJ4IOonD%2Fz5vAW3wpqDh6Cads1xfgGu9mrauKY1WJVypcEodv9fFrUrcuxkr4%2BXshqtg0BQKG6kjF%2BVjJ0UiuRNBwk6a8g88FLvMsa9wJCyP3wBcIBBosg0M%2BulP0vQRHyNHrmTVfWF6UDfNanQ5j93G%2BJXXOWatHV6UQRPFkKGIBdSKn71nBVTZEPqJXz3qN040gf4gRILAK5%2FICjIs6rHCWoUuiUlxdwGav1DCB%2BMQ27n5%2FJNM1lEsFn0juXHWn3nDLC1JOeYYg8CHFosVobikJOYOTYVpADrPWz%2BToYZpOg%2BF9%2BeMtmi2M2NDAaBYaf0s1145HMWPlB6WwZtsXYsL9z4Td1rYA%2B54fxxXBfsNS5elOMKAwAQn5zkUmmU%2BIxPJ0NbNNW1LdbLkpPs9dZX5cLtvotMNKu6M4GOqUB13UIFS1M1yF1%2BZRVD%2Fx8XzUOIpf0O3urBPxON%2BVEC2bVgYmlmHc2mrZCsKj6IWoDHGzfw13iutS2QwmCjGMDMdSBtBnLoaWCbYqSfFBk5hBxktyxahCTeEWPyW8Jt5%2Ff0y2DDZXAEivotRedWT7x3cXuQDHSCmAcY4TkAvTH7a92%2FvVIpcoCqIN%2F27QWZKOk8hKR8y3CmE5r0lHe1Sc%2FJECA3Xh4&X-Amz-Signature=3af151f9eacde05d699130f1a17223bb962475e3ec9fa6c5e8550ebf43131ed1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

