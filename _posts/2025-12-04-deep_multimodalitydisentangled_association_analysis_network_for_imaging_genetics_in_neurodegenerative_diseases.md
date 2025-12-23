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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5FH5A5D%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIDovVgwOhiKyXAwV744KolVGUrT0EDtkVePgXsoiphHoAiALeaG6FE%2FzsFgi4gNjpkH2KO2hWfoSuWwQV2V20JMAyyr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMTRTN0I%2BqrmzqNR7qKtwDhUtxyI41hssGtAG8S2DgKMg4qSLfzobGRtQCFf0rzuDVkASsZmYaCuRg10vwXCZDtLKnm0uTAwdoX%2F4RmnebFF8F65k5qWEjvgSfPfQ0FzPRCakErw9yGyqyPXzxTJHL04T822DmsZzWY8dd5cNTAwJhy%2FM11rSN42Coafy90widYkaIBLQ8NTX8qaWip%2F8WbLUDVyl3l1quEJST7R3%2BBOxmV53he9UDjreMHRTKPygsiFJ0PPOhro4OCHdiM5WcBF9H38d%2FUVktN7tTzBlZpYWBRxHievZajaV9JbZemZLxRwmfJ7iawGXpMFXuJpLvoML8yK5Ky%2BxZB%2FMqaHCNugl0EwFaLMyxkxV6hJlxP8cS344mLX9ZocDT3NEuV05rDcrgyLwdycCizepjIgW37b10RxUINqdSvqwR90c9WIXFTBmdTrcDdHJFnhlAC1qrsqDxwdOsbAPIpzyh8sBJmnVjR4MiaquVjxzq72KLUB%2B8GGcy8y71R1jz1IHKhPm7XF3ylckP%2BFUoo6pqbHDztrWv5pu8ttTYuMhb0WIuSFD8H59%2FWompmvWaQ7Qa8GoKyTjZzyiYT94s7zzG73SutmxB8w43IkLvc8bCMr8PyhTw%2BvOXXehdT9%2BOPe4w8b6qygY6pgGdW53U4M2DlXUKTkOXPgi0zLkIfWk7ScanFiY6kEro5xd5L0q3WiJPrJu3F1e45uLKXv%2BA3RNB6xlKlBPTh7YZIaZZ17UcNaByEo6%2F11IkwM2VanfiawP%2BlkbyYGFebpSjM%2FkixuCYJZdd9J%2BJ1uC1StFeO4kYWvjmtyqoz2Eco18R72FU2u3qikEys%2Fe8FIrL3QL6sM0Sdlx9wA1ysaHwPaQWCPvk&X-Amz-Signature=937d267f247bf1e0fea3aa43770bbcaa0011fa6dcd0fdf427d24376d3e06c3a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5FH5A5D%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIDovVgwOhiKyXAwV744KolVGUrT0EDtkVePgXsoiphHoAiALeaG6FE%2FzsFgi4gNjpkH2KO2hWfoSuWwQV2V20JMAyyr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMTRTN0I%2BqrmzqNR7qKtwDhUtxyI41hssGtAG8S2DgKMg4qSLfzobGRtQCFf0rzuDVkASsZmYaCuRg10vwXCZDtLKnm0uTAwdoX%2F4RmnebFF8F65k5qWEjvgSfPfQ0FzPRCakErw9yGyqyPXzxTJHL04T822DmsZzWY8dd5cNTAwJhy%2FM11rSN42Coafy90widYkaIBLQ8NTX8qaWip%2F8WbLUDVyl3l1quEJST7R3%2BBOxmV53he9UDjreMHRTKPygsiFJ0PPOhro4OCHdiM5WcBF9H38d%2FUVktN7tTzBlZpYWBRxHievZajaV9JbZemZLxRwmfJ7iawGXpMFXuJpLvoML8yK5Ky%2BxZB%2FMqaHCNugl0EwFaLMyxkxV6hJlxP8cS344mLX9ZocDT3NEuV05rDcrgyLwdycCizepjIgW37b10RxUINqdSvqwR90c9WIXFTBmdTrcDdHJFnhlAC1qrsqDxwdOsbAPIpzyh8sBJmnVjR4MiaquVjxzq72KLUB%2B8GGcy8y71R1jz1IHKhPm7XF3ylckP%2BFUoo6pqbHDztrWv5pu8ttTYuMhb0WIuSFD8H59%2FWompmvWaQ7Qa8GoKyTjZzyiYT94s7zzG73SutmxB8w43IkLvc8bCMr8PyhTw%2BvOXXehdT9%2BOPe4w8b6qygY6pgGdW53U4M2DlXUKTkOXPgi0zLkIfWk7ScanFiY6kEro5xd5L0q3WiJPrJu3F1e45uLKXv%2BA3RNB6xlKlBPTh7YZIaZZ17UcNaByEo6%2F11IkwM2VanfiawP%2BlkbyYGFebpSjM%2FkixuCYJZdd9J%2BJ1uC1StFeO4kYWvjmtyqoz2Eco18R72FU2u3qikEys%2Fe8FIrL3QL6sM0Sdlx9wA1ysaHwPaQWCPvk&X-Amz-Signature=937d267f247bf1e0fea3aa43770bbcaa0011fa6dcd0fdf427d24376d3e06c3a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B33CWWW%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQDHRUNK9ZQavdWkQWcUdskZWl8Uy2DnAZUN6efejDhcuwIhANshsmaaFWAR3V3AMgVjkUYwyzmFBnuO56KjDxnExS7VKv8DCA8QABoMNjM3NDIzMTgzODA1Igyd%2Bljf5hckMnBWT28q3AMa%2Fv7OUZ1wEm7uxnB7VNXcQvMyUAUHtQcJXLwYLvHXXBYP12IAi9q5BI6aPZAgDit6b31JBmcTu52cAxz5jZCt7taZSh9raT5BXEjZA9J1iMZr0BE7k7RsZ3hO%2BbINu2%2B9vimJdp%2FTD%2FUbsgaB2y65jMLSjacjJ%2F15OcYWVJX7oLJzi2VyXbR4klKVlBCC2Zjo5vJVqSA4T1GV04ndPWPqBCwiofVJg84xOXpZkxZkZtanxmE%2BJ30E1kHoSAVB%2FXc6n%2BPgkfOY2TV3OvVhPq99llAo9XSNdUBajVanZuRIrPC1eW%2BE9hPxx%2BeBl7r7GpdmgsICTvj6f8MQIL6REyUBTdc6FSGe2Q6DHbmKFeJoqLPD2ddI59NYMiwqJZYq7jznUL6ApSM2YviLtsJjyowPkBINU0my96eKbLvg%2FU3%2FLkKJF5Xq95Z4icZwmreyM2euLgogu%2FI3RTDSB0f4%2FmzH2tHTk1gRgSCc8GGXaD5f%2FBUaFIqHyGQcQRuKn9u19elBNGJrVOgnkY65TGHRt2me3bnT%2B3bZzqJUlWrmT5I0bh%2FbfQmKDVsKxtfOUtZOLn7qugnsNvp9dltJ8MATs4bzjdbs5FWuegPDdU0HJtNBUZlNVFuurTKZFgM%2BhDCKv6rKBjqkAWVIY%2BAakz8gV8XvdjFW9d62akyawRoQl%2FMhEBd7EVVCefsUdw%2Bq7p0IKRN00R4%2BmfNmsLhods2G0kPdDuGX1o1gpBTG%2F%2FxGajKkJ7AVJ8qGJ0%2Bc0vNYp2u8mc2ow1A%2BA8TxpYziu8A%2BCksud28Clb6PUaHVbE8M1j6L4UkAcdsqejZSzTbTq7t2C9w0WRBMYH3z6lnZT91b4YPu2I9AG7Kp7z%2Br&X-Amz-Signature=edd9a63e932e3129fa8d617f3a399ed5b6ee2ec202af705d91a61292721f7f1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3XGSZIQ%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCRl31f0%2BkCfvqOQp5qQSpVmj6vLtJMlpLBqT5aHWr18QIgKvIRdsDjlvvJP8LPFqpJVmKNYyn4nzxfqXszv7qH%2BrEq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDHV9IOGHLKhEBARv1CrcA26ZPhVFcIpEGnVcuKgYAyWIO7chh9x0egq60p6tqpIyqo%2FPJroBzQ2gHVfhuwJemrmV9IA1BXh1hXOx%2B3NgSy%2BxnkAhJrY2mF9ddxi4n5SgatqWCgu4kKXpRVoaQbib0Y10MvS83AZpoZpDLP7CKkspunvn8SJzb48NWCxwBeWXHhypej3Rej%2Fmo3UK1SgKiqXPF3YWE%2Bu02P5PuwvzrUUABkNqfJoJ6ETqlFtQLkhpnwoQnEmxpQPUVPZGeoxzniZqKsLxysjgrJZ1WM13vN2u7mFxN1%2FNTY9t3IGZUntm%2B3EFR4r5j7SG3GVPmHgWZRK4UfNlBcmu85WQvdvveNPdLmXDdUn%2BTIswEtBeTzrF7T%2B2npKvwTC9lYuJDxo%2FygTzGmTv1vfVxdyolUBKpAz%2FJ9SfVvqGOUg4R66qOoO7Gvge48WjPNajpDm43lTMJ1v5TG%2FWwBaeKHPYZq3wzgwQs8Z1WUlYILyAZoUDd36%2B45Wy2Ynlz0aucXoi6q4WumftyzgqfhnnAF7rkDQkzfNkwOU7F0plnq0D9Fpt1wDXHuopeZ%2B5lQ3yhUJJTn%2FZ2PBy5RW9yUziV5DCtNP4ty5k4vyuCkSy4iviLy0szGcQbasWTlkJnMalSKcJMNu%2BqsoGOqUB0PKGWDbfMAgG6xr9n4aKfPi89VBcVj1fX%2B6Gry80pIimaXnWNBWYauTkTpyzgxLiQT8bc64SpMk5tHdoUKv6nf36ECXkRuTq%2F74FLAm4aPjWSyLpTVx2vf0KRN2PLoIq9MVI7bD3kFiM6iN7e%2BkYskX9BtXtdJ2SBqkfN93kGUZH7bXzkOM2hou3mQ6ZAsPgr5ih08k6huGIPPCEB%2F3PLHXAzJki&X-Amz-Signature=89e9c2b0a397850ff4b9ab298cbccc4827c54e4718da1f564ee52f2377016e5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3XGSZIQ%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCRl31f0%2BkCfvqOQp5qQSpVmj6vLtJMlpLBqT5aHWr18QIgKvIRdsDjlvvJP8LPFqpJVmKNYyn4nzxfqXszv7qH%2BrEq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDHV9IOGHLKhEBARv1CrcA26ZPhVFcIpEGnVcuKgYAyWIO7chh9x0egq60p6tqpIyqo%2FPJroBzQ2gHVfhuwJemrmV9IA1BXh1hXOx%2B3NgSy%2BxnkAhJrY2mF9ddxi4n5SgatqWCgu4kKXpRVoaQbib0Y10MvS83AZpoZpDLP7CKkspunvn8SJzb48NWCxwBeWXHhypej3Rej%2Fmo3UK1SgKiqXPF3YWE%2Bu02P5PuwvzrUUABkNqfJoJ6ETqlFtQLkhpnwoQnEmxpQPUVPZGeoxzniZqKsLxysjgrJZ1WM13vN2u7mFxN1%2FNTY9t3IGZUntm%2B3EFR4r5j7SG3GVPmHgWZRK4UfNlBcmu85WQvdvveNPdLmXDdUn%2BTIswEtBeTzrF7T%2B2npKvwTC9lYuJDxo%2FygTzGmTv1vfVxdyolUBKpAz%2FJ9SfVvqGOUg4R66qOoO7Gvge48WjPNajpDm43lTMJ1v5TG%2FWwBaeKHPYZq3wzgwQs8Z1WUlYILyAZoUDd36%2B45Wy2Ynlz0aucXoi6q4WumftyzgqfhnnAF7rkDQkzfNkwOU7F0plnq0D9Fpt1wDXHuopeZ%2B5lQ3yhUJJTn%2FZ2PBy5RW9yUziV5DCtNP4ty5k4vyuCkSy4iviLy0szGcQbasWTlkJnMalSKcJMNu%2BqsoGOqUB0PKGWDbfMAgG6xr9n4aKfPi89VBcVj1fX%2B6Gry80pIimaXnWNBWYauTkTpyzgxLiQT8bc64SpMk5tHdoUKv6nf36ECXkRuTq%2F74FLAm4aPjWSyLpTVx2vf0KRN2PLoIq9MVI7bD3kFiM6iN7e%2BkYskX9BtXtdJ2SBqkfN93kGUZH7bXzkOM2hou3mQ6ZAsPgr5ih08k6huGIPPCEB%2F3PLHXAzJki&X-Amz-Signature=711066e981f8a0a0567b471e703abea70646a124b8f03feb93feb5fe87d207da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQXDAYOP%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIGIc3nH1r4BENZRVUKloa5xy0u9pD8tM8Vr3uLOXmxB8AiEAps9S28vQsl34qmzRLuktBu5NAwqXgoN7lRk9zHcdTW8q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDHdeJJZcAc%2F6GNENGircA5dWlPG2sWw3Suyg3gKxtKhsLb3XX5hz8Mhhjr%2BPvk%2FwMcsob4vm1hUvbvamHgKY7%2BtXqRK89EVLBr6Cbz9evcHEpgvN3KoE4%2BWeSn7Ruuj7dvDuuW1DhMewsPt3k1WrIr8b40VoYz%2B1HFaL%2FcnEKul42O%2BnexJcJj5Skhn5IVw%2FK1Vr5DMuRKTs0QJjDx34YgsCf6eYw%2BLqgWn3y7Lk2eB5ALO4eX0VT3sTwFYuB%2FoJ6ObswwMnw6B%2BonPRJRJbpFII9PvcjBEcRNdJbYkTLblCTsQseoN%2BzG43W9v0SUplssGYAbg0D%2F%2BXKb2qajWrgj5kvRKOydipR8j3w6N8qZEysIAWMaF7u4RChYHYEWQHgaqFdYFcfNilwualq%2F1PGlHbEXZR0XmCctVccRrtkfJy1WhXpZJxZvdweIB8%2BtPu%2BIOXeBt5lo4iW%2BsUC5xAMWiQMMWvBSGE6VmhHUB%2BHyFZ0AYl2VcCLCx%2FB7IUOs7VCc5%2BBKLt%2FhV0RVT5wKxAQYfx%2Fc0dq9PR2orAqqgyVgSFjgBUlcJKPMwV3yYOT50UJ7s2YMFnZiMfJiaZV3ZTdk7Yg07vPeCVI6J%2BbXPG0m07Zd1hQMMtHacpFFUdSC7avT%2FqDfcMkAvORrexMMi%2BqsoGOqUBMDRZb3UvYDZxc2ieE4DfdxjJG%2Be0jVg8k%2Fz6ZBKd6wkjt%2BTCl%2FESmYnLyp5idf%2BAoC%2BcHIjOqMmy9DF4m%2FjBU%2F%2Fz%2F0%2BLeG5pgVBOXpxbS4BoZtNur4USAIKmux4PG1EEfyNAs0LuQnYbHBOpNw77Y%2BMhSLy4Od6DMBKGZ8qzcRShZQ8%2Fb7S8d5TDcrw577NxfndfTVJU3mbqV2Ll6M%2FqagQOkNDw&X-Amz-Signature=41da8ed6a9b318489bce1dd5b0af7f1756057ae109c57bf55beff7071068c987&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3OOCF4E%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCUudNOpH2M0%2Bhp7s4dE%2BQdK2MTCYC3ICPMxDZbXJC4xwIhAIOTyFrpWaIkQiY3pCjxRhzkeP0c47YzI5Hzq0liLn3eKv8DCA8QABoMNjM3NDIzMTgzODA1IgwTafnd0sonXiZpZPYq3AN7yOBIlKG9g5JcA56MO60pc5hh8bGoTA6uR7WYjgzZ86k7kuH9QoRdBVS4r01cdTw0u5MXiiqDM0ZsMr1MKz%2FsiPhvahIBlVQQcMCWDtsjo%2BwblGdSpKpsY35loaW0UMc5qKUfwI0Sd1y6lKewGupsQaYMNALZrMg9e2wfGE8vBxdMVwVCpLRIMamuct991fX4moPNMRWopm2TKyLeuYRxwSA89xtbCdKwCUwOspgOWn5rapbMR1xuWcKlhN7g%2BvxKxW4vvSV0qfgluyqJDZhYT4Q6Llvq%2FzyCyPdE6d6ndV4utgB9AaLFwiMGSbqL4AQu%2BmKadB%2FQYcBgn%2Bpzp4uyxMh8frzUd0ABEUl6PQrLTZWhRoiRy3wrhh3wGQdpKnxse%2FpJTLUKA827AABf2tY9Q%2B0E2QrqytnZ%2B7HUfTNvMsfr8qmF%2B%2B%2BA%2F02kRO2RU4J0X84uGCzbodjuvKTlDAZ386gqi3gel4OeVML0Wua0sM06JQEhAetSELj9yYfO%2FJ28xEjK5LmnCEud4iCyrwptIrpN5QjiooZ0LrFskIo4MYyqnAeCCgCQL%2FIfh0Hw%2BDouVi9sJyffO%2BgV7VbflF7PM8ujuvwS0Y17S7gU7MC1wtWFPIv4Hfta8nf5fTCBv6rKBjqkAUSoqRcDyiCj5ASgfSAOtdgKtJC9XVO4GKFu7LuC%2Fwh1uVIBJ3lOhkqOS%2BVzMdWKqWfT6SCcPhbl7wMHUVAqm4WhA9uZQAjQUGFVLbQ%2FyVxzY3LpNrAqbCa%2Bw1feWsNM0qVrA4rhyVvnk2FVI6avmfG6VAFNGAEd7chvZTaaFTTTQFHcjkOSyHl6oFfjhXnkadUNf6QNlhR9yw2GIhlX4C17Dl5D&X-Amz-Signature=817b719f39cafa997c4c420f553b3234dd91f86e912a084adcb6c8dd2eece5e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4V5FD4W%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQDVkEO%2BzsloqGPkCb5Mwb3gEYt%2BiU%2F%2Bc7K4B8%2Fx7d58yAIhAO%2F6vsZa%2FUzmy0quiosWzZruDCDkIES8wPLgW3J3g5OuKv8DCA8QABoMNjM3NDIzMTgzODA1IgzCu3kZN0F3yWHpBu8q3AMxtFEtSihyMPZpk7pctp9azsx3Ap1r4OUP9CK8oBHQdKSCYVpyhL%2B0AjOYK5iD2%2BbjEKS4p%2B1lbKwZj7VEfNOCNJOK999D%2FUMxB5MLb0qDR%2BiKpfe9IPhW8cHvjU2hJnd3wxP3hC4rjVmyCKHdYQwPRluoaM3gNgI7Xnot6ardI3fWfbDa724pgiBFPndlagpA2wgn5w7xYKgnEw9ZfhTFIYyucro1WYUAwaCrsmbIwJXycEWmYeiKA%2BswPFaX245%2B5uWbnbQCvGcHw7nRI%2F%2FD82htvJ5EmffNMndeUSTBSFe0L1vD4b2tJbYLal2sW%2B%2FKUDtz8cT7FlsV7rXqav7dfEGaYDQmcOlzjP0Ixbvt%2FbWJ0RBGBcp0D6vVMSyuANjYkXdKvNwYuD1hxz8lIllR2TWk%2BsUCZxSjRqWcNT5n3sApOGwq7uDSJu2U0bI3ikAGHJ2ue%2FjGQK9cpO%2BG1tfxpdUxxl5p4kUuNvLARSjqa%2FUm4Zjn4%2BqhxsVckvTGU%2Br4pWEi37fB1D10x4jxIsMeB54AMPMu1eZx4qhEFFsbJngl%2BvNtrxDV0%2BTWuwD9HeCpkUnYCQmxJjy4R4IBz12LONVS3UkjXO5hxIt2g87RUmKSGjyzznWv5ITL4zDUvqrKBjqkAc8aX8HND%2F1f%2BXVgHI%2FYKLMRiphRI7%2FsbL7HufcnPn8YA8cg5jgACvz7qrvFxhhK5UwaLJ8jxiDC1rvY%2BUG00Awa4NYRl%2Ft8Fw1rS1usgTHe0G6Zj7I%2BcEAUdlCH59Bhqwn1093X7tnp9FydBH%2FKRzyCkupKkpc6B2PdxVvJToDIb5YZoUIIKvVT73fEab43eNAkBjXv1mR9xZp2nYNWrBs2iHJY&X-Amz-Signature=7713a805b391986a21224f26683c0590d327ead0668fc6f39e8b18ec181c8509&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CME3DBQ%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCGacxzcV20PzD86QIt9aBnkbIr5XBcUjLZV%2BTte8RS%2BAIgGGwLBLXQapWDkbI9zVW9T52BohlwCcXdBS%2BDu5kB6hAq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDOk3C%2BcyJ037nKbGCSrcA56gi40Lf6O8eHQdbTXolVS1FsRjYQOPZ5fVuFmbMANdOkpdiqHs63XX0GKppI1sCZP2oHfY4LLOBVGMUrppIKDfxhHkBchGetY6gWlJqlmVHUQktnvUKvgwRGR%2BQ%2Fy2atBU1YlxcUJQq2OXPI%2FvD4LlCzJuqhMhsY2ikE4nVUaU50IuQCySupSiuOfuH5PozJlVxfWkes7u6ANIe30ne4aX2WEVw9o%2BwISQiIhRYlCUbqlAf3cIpk%2FxLaUfSPJFrOQtQmbwaalf2jaw7rGuFbTEUeL%2BK%2FcG7pCSF10jtl6Ulz0QIorFtdwEVXIgt05kZrnQjzvW%2BPf6nOlsUiwdOqbPu8nBN75R%2BpmUATwT54tQW%2FkIpGw3FyxudqNraNhCrt7ANY9ySxXXtoLU9l9smvJLtEKdganHRf9oOQTG41h2aP1mVbpz68%2Bo3RHcDxJSCjIxfhJsA0pKzL8CrPQci%2BbCtH58aYq6pFOQEuASBOh7350gpUNwoudfCAyjqUhYp2F%2F81fTQytfIRCZzrEJ2j6sT1W6SX0plgxSEKlNrA%2Fikw%2F4%2B0Mlwq8Jfgy5BcH2eth2Aol249Z5uo2vgHe9dLDMwEr97Iz5olKU3tJZLoY2fc6CZL9aDHAuotvaMOS%2BqsoGOqUBBxzE2tsUpTeaUE63WwHfeHcC01S1uZOi0FLf%2FI1NjBBII1vLS4hOfZBPN1pFekjOdaph00FjTek0xNZgnIVRucx4ZdgRoxHjhHxDUPBApCoemleO6%2B%2B0VHy4YRVrizJnay5R28y%2FjzRl8BZjGwX8yQQy6ioUXzHp5%2Bp%2FxmPMyg40OrZzRVsllbWhBbalG11zPDcvzKKs51fHsDXXUxNYCxYrO5Li&X-Amz-Signature=1c75dc148be53c735969287790338fa229d9473bfd3249ce529c85bd7a407d85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CME3DBQ%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCGacxzcV20PzD86QIt9aBnkbIr5XBcUjLZV%2BTte8RS%2BAIgGGwLBLXQapWDkbI9zVW9T52BohlwCcXdBS%2BDu5kB6hAq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDOk3C%2BcyJ037nKbGCSrcA56gi40Lf6O8eHQdbTXolVS1FsRjYQOPZ5fVuFmbMANdOkpdiqHs63XX0GKppI1sCZP2oHfY4LLOBVGMUrppIKDfxhHkBchGetY6gWlJqlmVHUQktnvUKvgwRGR%2BQ%2Fy2atBU1YlxcUJQq2OXPI%2FvD4LlCzJuqhMhsY2ikE4nVUaU50IuQCySupSiuOfuH5PozJlVxfWkes7u6ANIe30ne4aX2WEVw9o%2BwISQiIhRYlCUbqlAf3cIpk%2FxLaUfSPJFrOQtQmbwaalf2jaw7rGuFbTEUeL%2BK%2FcG7pCSF10jtl6Ulz0QIorFtdwEVXIgt05kZrnQjzvW%2BPf6nOlsUiwdOqbPu8nBN75R%2BpmUATwT54tQW%2FkIpGw3FyxudqNraNhCrt7ANY9ySxXXtoLU9l9smvJLtEKdganHRf9oOQTG41h2aP1mVbpz68%2Bo3RHcDxJSCjIxfhJsA0pKzL8CrPQci%2BbCtH58aYq6pFOQEuASBOh7350gpUNwoudfCAyjqUhYp2F%2F81fTQytfIRCZzrEJ2j6sT1W6SX0plgxSEKlNrA%2Fikw%2F4%2B0Mlwq8Jfgy5BcH2eth2Aol249Z5uo2vgHe9dLDMwEr97Iz5olKU3tJZLoY2fc6CZL9aDHAuotvaMOS%2BqsoGOqUBBxzE2tsUpTeaUE63WwHfeHcC01S1uZOi0FLf%2FI1NjBBII1vLS4hOfZBPN1pFekjOdaph00FjTek0xNZgnIVRucx4ZdgRoxHjhHxDUPBApCoemleO6%2B%2B0VHy4YRVrizJnay5R28y%2FjzRl8BZjGwX8yQQy6ioUXzHp5%2Bp%2FxmPMyg40OrZzRVsllbWhBbalG11zPDcvzKKs51fHsDXXUxNYCxYrO5Li&X-Amz-Signature=ae1942ebfecca0149b6c7d594425bad86bf87172ab0b6d340eb1a8af24fdc1af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLB57QCR%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIDaOfL0c%2BPw04AFloxRHe6zPKpH7o2jU7rvf45Q6UYvKAiEAzR%2BPF7wqKR8czGxOqCOkorXFUGKPkzNT3DexCe1ZGTMq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDP0nasS%2BVjwAF7KYxSrcAzFPO4PsRVHO5zAcjPMQmKSHA2lP%2B7xkOdQjtivZppre1ZG7NjtXQmgDGOF6LSXkm6NEv%2BgFoNlAcNv%2FyReWtWJGiEXwGj3p4eP6Z9AI82ABba1GKyENGHta4rGbI%2BOohA1iie6UWazihqke%2BPuPBT%2FJzBbLn%2FHCZK0i18uhrQsMzdlJvry6QQMbHRgCoF1wv0Bldh43a4Q%2FzdBjOK1%2F9I5GgH2rLTIBC%2Bwnl4JNio5Fq48JFRWXmicMfZZUuBWQSLpVrJe%2BDXVyEWMhId2aUkbqcncsJsjYt0rHYuCR2Xl2SZR%2FILDOO%2FlwICaaEtJItyXV9raxoyoRNSAVMgL0a03mcRFcnuFl6mxJxUeY%2FPfsg4%2FjODd%2BTh9hkHDlSZqydE39ClXd75Hlyd2TVhoQICbSNQHB4IsCVOAyWIGIojrGmbdsoe4512Og3M%2FcuF1l6b4HBllDupd4p2H8seRLiw98yvgG1DHQwbGHF7gjaaus27YU3BjQ5DFh8U0TsUFCWGBkhgbE0kZXTKQ5K%2Boq%2FcH7o4tL3H%2FYmgXaa5y%2Bu1jFWL0UXFXYUQh0hyImSRXvxnXQbR%2F5oIPsna00elRvQHgPiSa7c7ERO8usXTX3BcIXNTjcmDiCHXAhHfDHMJW%2FqsoGOqUB8XiBfNijjOHgZ187tuBP39J8J9bStvggcaAbBJKl56vUob6YGZY7aaUdUZ6I2MHyeWOuzKoAcYUNCSsUGjigpLeuG%2BfoEDoA14vsLExJumgDjoW1fIV2%2FPX2IDoPge3OOdyrak6SpIYJGRr4UUs5L%2Bd%2B5KrLto7q5L4%2FLt03UeqPOC4%2BACygFXPpujfQkkdqfbRD8r1Z5GTQjdweJxlWy0glwqEp&X-Amz-Signature=3fba20217c065b3736d850e65523117ed303bc371bdccefaacbc67140acdbd04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626QOEE6I%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIECNVQOEcPwg0pN7fxzEF8wQ1fyH99M2l%2Bg%2FXcTnddqAAiAV8r814dJHfkd0zw6ltSt1KPXs8qQvLDYbDBLaXYiRUCr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMzo58D66XWLGWmAsBKtwDyqwv%2BZYcN131LrH7YycTFc8WFed1K04FwTlwNL%2F9MhSDhc8bKDXR%2FBQzTixUFf53W5CN91gxNqAlkoQClBb17RVH9uojUB03I27kMJjQ09JVC5QzIs5Fcgby9ed9GmfaB8tNuQfpP1iBwsb1rbUkDWI4eaooYuPERPHdLcSOHA%2F3HZ4h59SqoAP1jBIpEoAlmnMOj5L%2BoFCB0huo8zh9GNWSxycU9A82cPna8oOCuzX6VUU5G4y9Ohr45to7dA%2BaeZWP6%2F37VZ%2BDO4B8VvoCoPxNtP8vuOgw3iaxbgKtwo3GkGxvnhvnvlAbSw25JWHyWtdG8MsjTQoeWZIiCTxMnO4S0ynZav8Ez3ymXrF07klLRpopBRtwo3v76TXI9%2Fn9TqryuqjIqcLW9JBgQazBpzk7MwG0P97klqTO%2Bt6J9MV6NcHNZzHG9Q5fAFegV7Z1DV9uWUt3icHYpQ8SfefrysSB%2FAtAdZQBJMHk3%2FbSnwFTFnFXjsfDv6L1TalVGn%2FaED%2FxsCJcT0it%2FYZkihD9WSoCmyQe0RG%2FiBoV60gHIl9wHxAZt%2FxzfXgPcf%2FonxtV%2Fm7pwh9vNcXwEuLX1rvJolTC1MgpQJwg8R3U1zs04mY%2F6LUlxZRHfnuKi4Ew5L6qygY6pgEdIydAguzlaDvlgN%2BL5%2Fs%2Bm%2FARBnZW30q%2FsW8COJqQw6gBGdhIxIkQ33Av4%2FedQpLK14UJV73VFC0BS%2BeZEZmjrhwteM9g0OF13V2%2BkDD38AxoPNxjRYqCOa%2F%2FIHhDCVuF3YmGcgB34P%2FHYNpZwp5eY%2FYy%2Bxp%2F8jr73lamO3me8gGPIa8LlyoMBxa5Ty0SQY95Ow8npA8cwSI%2BPqImgsspTPAhOCaP&X-Amz-Signature=be33a10a8f26d3a41786f0435562fd2c4fe7f72c865248b2cce53b76853e28ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626QOEE6I%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIECNVQOEcPwg0pN7fxzEF8wQ1fyH99M2l%2Bg%2FXcTnddqAAiAV8r814dJHfkd0zw6ltSt1KPXs8qQvLDYbDBLaXYiRUCr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMzo58D66XWLGWmAsBKtwDyqwv%2BZYcN131LrH7YycTFc8WFed1K04FwTlwNL%2F9MhSDhc8bKDXR%2FBQzTixUFf53W5CN91gxNqAlkoQClBb17RVH9uojUB03I27kMJjQ09JVC5QzIs5Fcgby9ed9GmfaB8tNuQfpP1iBwsb1rbUkDWI4eaooYuPERPHdLcSOHA%2F3HZ4h59SqoAP1jBIpEoAlmnMOj5L%2BoFCB0huo8zh9GNWSxycU9A82cPna8oOCuzX6VUU5G4y9Ohr45to7dA%2BaeZWP6%2F37VZ%2BDO4B8VvoCoPxNtP8vuOgw3iaxbgKtwo3GkGxvnhvnvlAbSw25JWHyWtdG8MsjTQoeWZIiCTxMnO4S0ynZav8Ez3ymXrF07klLRpopBRtwo3v76TXI9%2Fn9TqryuqjIqcLW9JBgQazBpzk7MwG0P97klqTO%2Bt6J9MV6NcHNZzHG9Q5fAFegV7Z1DV9uWUt3icHYpQ8SfefrysSB%2FAtAdZQBJMHk3%2FbSnwFTFnFXjsfDv6L1TalVGn%2FaED%2FxsCJcT0it%2FYZkihD9WSoCmyQe0RG%2FiBoV60gHIl9wHxAZt%2FxzfXgPcf%2FonxtV%2Fm7pwh9vNcXwEuLX1rvJolTC1MgpQJwg8R3U1zs04mY%2F6LUlxZRHfnuKi4Ew5L6qygY6pgEdIydAguzlaDvlgN%2BL5%2Fs%2Bm%2FARBnZW30q%2FsW8COJqQw6gBGdhIxIkQ33Av4%2FedQpLK14UJV73VFC0BS%2BeZEZmjrhwteM9g0OF13V2%2BkDD38AxoPNxjRYqCOa%2F%2FIHhDCVuF3YmGcgB34P%2FHYNpZwp5eY%2FYy%2Bxp%2F8jr73lamO3me8gGPIa8LlyoMBxa5Ty0SQY95Ow8npA8cwSI%2BPqImgsspTPAhOCaP&X-Amz-Signature=be33a10a8f26d3a41786f0435562fd2c4fe7f72c865248b2cce53b76853e28ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WW2DHKOT%2F20251223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T140129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIF9Cz9eSSyCBg1J8%2FPNjlq%2BktvGz2%2FSo8XQ2MckRydCaAiEAskbFPlJwLBEtiJcgs1ZBXWvnic7aDLwjLKiDCCda96wq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDP7OkBC2AMK0zskt%2BircA1rQQQWRmDe6PxHqt8v%2FRk33hKZjmkdRubJi5ooLsmwjKJhNMJ8e7xPjo21qcEG63tZMRs8JeouF61C4gvYEwJY2YqIAOKV1U7xaZG6c%2FC6N8g3b%2BDYK0VoJvbHOZ4x8x97iWKteM21JNIdRIAdBsj7X4OMijcbAmHGJQI5Ubp7EMMrnsgRn5%2BBskbiNEiIrgYY9ZypbKG1Kdjwbk%2BItgguTshFU3SlC5sKfNUvbiBegTn7XhyXoikzDs6QOmdiQlkJXucLJIJNSRkEQSFD3CAV1eWDSxwC4veqrXLuRVNHBHiplm1aa5hcGU59O9mAdhuFwOzINTd9Qn6P6I4gu%2F8D4rznuJE0iQHd3nLD71DNDMVKCQ5RSSZc7hM%2F6ez7QWMj08iWXT8MUKO9FFMZeuNeSrkTwrqtFks3W4yCqLcvqu3zh72WvxG1ghIHOEdoWxuQFL4t1VqoSyXjCdi91kGBccaZKJnCpibDzOs%2F9FwZ5gER0TEKbp%2Bnr8Nkyvz7OotUHORVsB08PdbemjIz3FyZqXyco2rNXtGYPBoGAmQvbG61oWJ3vrOA55AlTvt%2BnqKNdWQsYTo9DgQCuV8EEqvlUtz4qVy%2F1LHhv5JXZi0xzjqMVXqj4pwdCASc7MMa%2BqsoGOqUBPxidc3dnvLXUZ00x3OST7Gi8JoWzOj7k6LPIaji3SD%2Fxr2Y5jf6EjFEzUmbUcUQvYMM%2BXX%2F8o40lI8x8xkMJ8P%2FaWfbzwFO92jVOYJf7tMdnVL5Ux3Th%2BaYE%2Fz14GxldKS%2Flyf%2F9U%2BOgCqIrUIxl10u%2BEwPXCgrO7J9yg6tsm7MNcmeyQN0F5ZykqI%2FO8iHNhPk%2FRL%2BCgdIZU4fG7S2v%2Fx2OfGof&X-Amz-Signature=e596a0b9e213a4241c6325b0e8994bd8df7d975c00f15b30073cdab7e07f6916&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

