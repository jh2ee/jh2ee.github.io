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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRWBZSWZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDLb4tFRR9wwtBK11nF6VSU1C%2BuSuV3x0j64v%2Fd7MH2tQIhANHbwZIYCu73N%2F7GKg1FufxYBc3bPEqnUpM8ddFTCj%2FSKv8DCDcQABoMNjM3NDIzMTgzODA1IgyoFxdV%2FJs%2Ftg7Sk90q3ANUL3I6Inkt5OtR2NjXXXz%2BTDCVPq8maRFOxBDE1OzSA8oRKDj6MNkATslUQ7snK3kATmyKsHRNaErnJtGwYJB0BMbt6jj3hEG84dldhtoc3b13q%2F54Etxsw9smBkh38buqBKU8%2B4S0JeWra1JnBT52kf30cTpw8xkRtEgR1JZt%2Bp4HxpMqSlI%2B9dmOF5gvM48ZaATyT6WgnTr6%2Fxf%2FCDm4a%2FhuQKy6fsmu%2BC9eqcUci9kC7UyWZioVjl4P8deTpdvntjG0gyRoKniJH%2BLewCpvXLSn9tfIRHcze0mlX%2FyFDagmy1jOMDyPbn7IPFcFTG70VAHXj8rUMspEWpB6pNLe5k00seaqzYHT%2Fnr%2BD9uw4D%2FJGVE8tCxxaQhommEwPjplHjL9yMUMMW9D9hA0xgWJ1w5RUEYEa%2Bmc3laoqmCsRCnQ%2BErKxnk5L5Hj1a4DKBtOzzjuttOjVAjjUibLqUv467Y7WsvLniH8puolHxjLNxbvAjdAJg2zsSFaphhpF90rAO0%2FrwNi7VqOzS4s2W8F7tFCQOHiijkPcP0Z6y5JlCPZiHHDV6kyO2fY93yUNKCyF2VFASOX21J50eLk8Kg2TniLGiB%2F2S3XPMFm5jvp3mxJ28oLmsuuZT78fTC6y63OBjqkAXIJN7PR0R%2FWwgtSDHkX7aNw8Cg4h2fA81LzfzEjcyhCJ%2BtXy0FOcLelAppjCSX%2FcVWzSzFR%2BV7X7xeZ5%2Bix%2Bl%2Fw1PRk%2BnK9lkdXIM%2Bahe%2BAwZSo3efR%2BADE3YGLJQNHGjyE4XRWZ1I6kUn%2B9VopW0J3K2QRPuqTt6ZG6wdhXhHKhz8ecWSR1ex11IEOMenaRf2WmhRUTJuSM5dP2ic%2FqePBnA8z&X-Amz-Signature=bcc6bf8eaffdcb753f9b288ab0de06be36172f3d6b03c061d26c6f7397f06f96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRWBZSWZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDLb4tFRR9wwtBK11nF6VSU1C%2BuSuV3x0j64v%2Fd7MH2tQIhANHbwZIYCu73N%2F7GKg1FufxYBc3bPEqnUpM8ddFTCj%2FSKv8DCDcQABoMNjM3NDIzMTgzODA1IgyoFxdV%2FJs%2Ftg7Sk90q3ANUL3I6Inkt5OtR2NjXXXz%2BTDCVPq8maRFOxBDE1OzSA8oRKDj6MNkATslUQ7snK3kATmyKsHRNaErnJtGwYJB0BMbt6jj3hEG84dldhtoc3b13q%2F54Etxsw9smBkh38buqBKU8%2B4S0JeWra1JnBT52kf30cTpw8xkRtEgR1JZt%2Bp4HxpMqSlI%2B9dmOF5gvM48ZaATyT6WgnTr6%2Fxf%2FCDm4a%2FhuQKy6fsmu%2BC9eqcUci9kC7UyWZioVjl4P8deTpdvntjG0gyRoKniJH%2BLewCpvXLSn9tfIRHcze0mlX%2FyFDagmy1jOMDyPbn7IPFcFTG70VAHXj8rUMspEWpB6pNLe5k00seaqzYHT%2Fnr%2BD9uw4D%2FJGVE8tCxxaQhommEwPjplHjL9yMUMMW9D9hA0xgWJ1w5RUEYEa%2Bmc3laoqmCsRCnQ%2BErKxnk5L5Hj1a4DKBtOzzjuttOjVAjjUibLqUv467Y7WsvLniH8puolHxjLNxbvAjdAJg2zsSFaphhpF90rAO0%2FrwNi7VqOzS4s2W8F7tFCQOHiijkPcP0Z6y5JlCPZiHHDV6kyO2fY93yUNKCyF2VFASOX21J50eLk8Kg2TniLGiB%2F2S3XPMFm5jvp3mxJ28oLmsuuZT78fTC6y63OBjqkAXIJN7PR0R%2FWwgtSDHkX7aNw8Cg4h2fA81LzfzEjcyhCJ%2BtXy0FOcLelAppjCSX%2FcVWzSzFR%2BV7X7xeZ5%2Bix%2Bl%2Fw1PRk%2BnK9lkdXIM%2Bahe%2BAwZSo3efR%2BADE3YGLJQNHGjyE4XRWZ1I6kUn%2B9VopW0J3K2QRPuqTt6ZG6wdhXhHKhz8ecWSR1ex11IEOMenaRf2WmhRUTJuSM5dP2ic%2FqePBnA8z&X-Amz-Signature=bcc6bf8eaffdcb753f9b288ab0de06be36172f3d6b03c061d26c6f7397f06f96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RU5DNMWZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCICQmLysAJNHARAcd50OAjx6xtCtULrs3yaxfkR5wL8YaAiAgMuEydPCLkMuUQTSBfiicMoubA1S%2F0zk0hlYckuhAdir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIM0LbBBlVzMKdfb%2BxgKtwD4pivy4MyPQ%2B4jv8Ts28763YbG2XnHi4rGjQLu6qZgS3BmFx6qkO3u%2BqQ%2BkoLlws92ueiJjPS%2FOUoIoMEppDuF41jlJ4YmTD27TmE%2BRRHJIjF35pJYo8phdwmc2wWORRAypEj%2BV4bI1ArP0FwfEoU9QQKEsRrOvRaiVA%2BKbRiruTzpB3ir3O26UsAr9EkWyTbYRhmRpL1gSCLNWQ%2BTxzYHh7dMSHAxZwKXaQ%2Bye%2FJvzZSQb5JvUgeWHF9cEH6qVW4rSSJMY%2F%2FQiFdLa%2FfHvzQAU7XuTrlAuqIS2Lhf1hTPMWUNgCtSOE4WBwbkfgo4eSp1Tzm4DFOMtuyMMZCy0Kk2G83AMgIJ5jvGDNigapzsUabtgYndIRUDXA2wvFkNI0Puc0fy4o9zibZdyGU67DIY%2FQ2%2FA8h2hykwA49THoQHHe3cLYC%2BKb%2FXI8ttwdWllbSCeajPI5FZf4rnDlHttFYrFurg5MBen5NSUreYRcj1Go1hvDdAYxXASjD7%2BkAJE37BQnrwkqMR22JALqQ8yyL4Jn8Ud00o7PbeAqB6LYu54O6MeM91Czaz8o7WsBlL9Lmjj57QQpYs43Y%2F145x2itkD3Fn5GBNreV8xcYW3Fu4E5pB1Uf1lfDmzI1iHUw5cqtzgY6pgHImII3x%2Bq9D%2BtneQNOfRX0dCx3e26YG%2F2zSUf7AXHRE3SAFORnP5v2OXLQ6hCfEoCRlaTfk6fmVLEOpjGrMwoJ873ULD%2FIZsmfJPblCI61GTqttUSsVfxgsGHuZ9%2Fug%2BET5aUZpP72gHK8NEtPVDft9hQfDtlTnnkRIzAwIf1aA0YRBl%2FAX8hwzLehdxeNpUEmVBbWNKLfgNU5b9ZqWxmSK1%2Fu7fO8&X-Amz-Signature=6649186d7551061e2d5a286868473c41f46a74cb92668af75cf29bb2b1d3e933&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUOQN2ZK%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIAOCSP1i1Xc8iKdPr4fLEalaFV3vFEtEAyW79EvDCS%2FBAiBuBXNHwvbYTeCibm2q87w7eDlwpCqzb7xwZsAs8reU7ir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMVA7my%2Fs2GJSvhWsBKtwDRMJvIYv2WpjKQqh2%2BXzRIbMYag42TaGRzE%2Fsq5deDj9qslg8b4WdVzjufJ6Z%2Bqp1GSN0a4DLbQvvQh8CQZXF4hSM5uogBZYtT%2Bd4H4ZoCTe%2FMe6pR6X5oY6c3yg9s6RU9Tbgllo4%2FqlP3v75PHHgsF1yF%2BctVSc5Cda4duAFTKKos4TYTSzPyRMCASpw1Olp4YPsGGR5zhxrv8FwfO%2B1U1Ojfa4Yk3VRcJ3eh1xZ9lA440y%2BJ83mBm4NGWJ2k0AV045L6Nr%2Bqi12JTtvgwzFHzFsfg29My4oE%2BRxlIvod01lw51s1rZa%2F2SvBkREhwM1xZ%2BCqw4KOtiyrZwMHZL0pZREZ9eFzwLZ4CjRpSyx2U2ClfNdkisoYbEx5Ls5qPtRLLlnDmpUtx8xy1Zsjf0DNgTKxtp4qnauza3RZgjvLkEnRO10Qo02LhbkTLgNABpZSGqTdUpqUSUweh77tvUeG2kq%2BOd55X9fL2kpgzOJVZ%2BK9TLE9MLFSFofFMUu%2B1uPEdlEK3XJ3767HYR2K6BKKy4Sv6B1RfUXHxMlkRvPu0FJGC4e7dX6krjFRhkEXMURQffekUDG3Dq%2F9WFHbUrhRorYbIl5W78%2FZniVSYPr6VKQYzHfx29EeypB0isw6cutzgY6pgGVm%2B7c5Wn%2FbHwW0Q7LLF4yJRf81PKECtl8K1T2xJRSoqogUJK7vElAYwvC8mDLqIyoCSnuTeFIqA30cu%2FYteu5MXvfRV6tGIbii14NmelDBhoSAzKs2csKyTVOSyAwABw2k7cKrOcXYvD7BpCFgkFR7HhUHkrIPxG4Xc8O3v2Wh0DofxUigpGko26uMLYXSvxQHlZhn48Nm3FddksgKit8wLTGq3ct&X-Amz-Signature=332981edfc6b240a7d79227c3f6e98b20ee5d5b21494a285d54c0b2aec4352dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUOQN2ZK%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIAOCSP1i1Xc8iKdPr4fLEalaFV3vFEtEAyW79EvDCS%2FBAiBuBXNHwvbYTeCibm2q87w7eDlwpCqzb7xwZsAs8reU7ir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMVA7my%2Fs2GJSvhWsBKtwDRMJvIYv2WpjKQqh2%2BXzRIbMYag42TaGRzE%2Fsq5deDj9qslg8b4WdVzjufJ6Z%2Bqp1GSN0a4DLbQvvQh8CQZXF4hSM5uogBZYtT%2Bd4H4ZoCTe%2FMe6pR6X5oY6c3yg9s6RU9Tbgllo4%2FqlP3v75PHHgsF1yF%2BctVSc5Cda4duAFTKKos4TYTSzPyRMCASpw1Olp4YPsGGR5zhxrv8FwfO%2B1U1Ojfa4Yk3VRcJ3eh1xZ9lA440y%2BJ83mBm4NGWJ2k0AV045L6Nr%2Bqi12JTtvgwzFHzFsfg29My4oE%2BRxlIvod01lw51s1rZa%2F2SvBkREhwM1xZ%2BCqw4KOtiyrZwMHZL0pZREZ9eFzwLZ4CjRpSyx2U2ClfNdkisoYbEx5Ls5qPtRLLlnDmpUtx8xy1Zsjf0DNgTKxtp4qnauza3RZgjvLkEnRO10Qo02LhbkTLgNABpZSGqTdUpqUSUweh77tvUeG2kq%2BOd55X9fL2kpgzOJVZ%2BK9TLE9MLFSFofFMUu%2B1uPEdlEK3XJ3767HYR2K6BKKy4Sv6B1RfUXHxMlkRvPu0FJGC4e7dX6krjFRhkEXMURQffekUDG3Dq%2F9WFHbUrhRorYbIl5W78%2FZniVSYPr6VKQYzHfx29EeypB0isw6cutzgY6pgGVm%2B7c5Wn%2FbHwW0Q7LLF4yJRf81PKECtl8K1T2xJRSoqogUJK7vElAYwvC8mDLqIyoCSnuTeFIqA30cu%2FYteu5MXvfRV6tGIbii14NmelDBhoSAzKs2csKyTVOSyAwABw2k7cKrOcXYvD7BpCFgkFR7HhUHkrIPxG4Xc8O3v2Wh0DofxUigpGko26uMLYXSvxQHlZhn48Nm3FddksgKit8wLTGq3ct&X-Amz-Signature=5d317f831ff22c95449982270e5fa8d59cd1c54a3f06a95405c5370e6373a4aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZQ7F6GU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIAkxhmii8RLKkJgXjNWQNNMM8KsMLi0OSNZ9irO3xXMWAiEA4OtfkuB%2FxFv3zl0DnGfLyc%2B8cnUdXLC8AWbIgjkVXakq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDApbcEMRkTW%2FM%2BdTRircA0dXTeGbIe0Q8WzMP2XGoOjZu5RGIFu5MoMABSbPxD6XD3GL5kI2M%2BCZmrKFKxChndTlwMW53YqnL6eenQYQX3ko5MOj9GOdnYeEuO%2BjBg2tt%2F2xmYGrVZL2S9vXFASU7UlbsWsks%2FNt65epVgSG%2Fg43bWRPYN7h3H1rPEBl%2BCe8q2zPoQyKnHGElvPQRh9%2FncuS23puLHoL6sHV5kUHvfd9dTuw42u2plcvX89hOO6Y91feQZNqwvUUPxyFATnRbPBKt6lNt5Tyemqo4amu2s2CNcuQjeA59dCW3XWY2BNefqH5eyJzuZWZkKdQnlY3Ha0dsvesYpgWHM2d%2BkotBDy3gnaqa1WJXInE02Njm0iiiyCAQsRdoW1Zo8XKk1brGvn20%2Fzjpu0hALppl1MWEp4tXFnLG71gsurTRzsu57Nn0d8y9FiGdnCy4%2BqSh4i9cp2hKxdxf1xG%2F7ZDNdVdGt3RL%2FTk4jVkcyHmtTM9nhM%2F%2FISv4t7MDRSPpA25w02NR%2BxnVpxwH58gFvPXkdCPf2QsWSIjcSsypMWucsCmX5jkbzucGv4TWTA3V7xtVSpi%2F%2BFe0ThjxTH07G9gimsuS3CCEBlXzJLEN%2B8wXbh5XjLQOpruOTXI98kmxFwUMPLLrc4GOqUBE57uEZcvF37ozEGDJb7tDQAhOjNetcKiTQ9wSNuMl3uzjmP%2Bl2bc97c%2FpQUzcvz2Rw8gLkDsQTmqKjVdWbTw%2F6z3DgKOQyV6QNio%2BNqYJLIEbCW0U65ENTb8TPRPalXpdcb2osKbU%2BOLyeJDdidmHlblSQJQH7yAOcatMNd4sTdAMkyc6Ej0V4ZZQgQiU%2BRD0JYq%2F616xlA%2F%2FoyqWdxS0fkACvyo&X-Amz-Signature=9b0fb82f9e4d8b2766472ba1d1fa51b9ef483f9dba3a2d980074b3c8bbb304b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDNOOTVO%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDyUOk5Eqv9sh4%2BzKwQuVuqjWjAJZ3Ne%2FWxrq6roM0d6wIgO4so7om5HLeQ8c%2F%2FXNn00hKtku2q8DVh65X0eNrr8ksq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDI4KX5OuDr5jOa2e5SrcA9DINXxDd83Cu45r6uvmlTWQtpsRAOoa6Up6CMU0f4eiWFsuHtOqXUc0zO0z6vb1RGK%2BE3on6wVFNBFRvIyUXihB3O6bTK81liOmpkhnySrgzV%2BVFOz%2ByMJwRHTN9fbMWJ03eDv0%2F0%2FbeMDs358VsInNVXm%2Fj2NCXg9WCpYbqkX%2Bi7RNEWHAg%2FbIIZNRvNmDKIskT%2FmhX4x4Vt7Hg%2BbDFIcWBC8PHgJyfY%2B5c4QTSFAxP3%2BxQ7dcUyfR58ukFxYi6a1u1RzyTaz1210v1SqAywKjwbBrKVkBsIP%2BpNz5PIc7n6D75jZnuHtrmeXjYdR3Y62t02N5KYyIT2BsmOgZQVZ1NnWbZDy03DA2GPEKMA27%2FQa5un5jLOPrs%2Fxn9yOJsu8Ls6fYC4lXoRjaYK6JJoAPk6x4%2BQ9fHyRxtSvE0hrC7y7GAUtD599GXh9VeEQTCOCAkzL14Sb8iz5eadC5xBvBBdg%2B5dWP0fDTTYgVXZAjxcT6TaFUYWswr4jXvKq%2BgFZkHOggnmv0kjK9lfLd7M9D3bBQnqRpK8EmSm5aGMxYiTDL98lCxql962qzi00EMFoccCTicONfF2VgeUd0qLh2DC05tOu%2BOE89JJ4fpUBPsfsCesEk70yf69XEMOXyrc4GOqUBTcBxHeykE8the4r18AP470TvX6DVoShfhD7VMi5xypvoelwdNtzis6oyNIHe%2Fa9t4wPsvdb2vApDi0nW3oPBWExsQ2s5luXVNqAm8sOSveokZZx1ssyRqN2pbwEneDLJZkjSCB9iatmfe4Vg%2B5RLRoKIMuNU7%2F1U9am%2B2mx6peHS52ywcQPaIwEhCwAgn5CyG85e6uAgnueFjJslo4%2Bb4EtcY%2F6Q&X-Amz-Signature=c169b0c57b9e6064167cdba05fb8b1bdfc00b768919fbdb9f537bb1087010d30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ3K3KX3%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIEjbS7IQvNIaIlZ8EQ2SIfKL2lbscynuBsyIGQzXTdmXAiEApZp9T1uOFMcslgQ%2F7S7rBJ0g4O7SMhBfkAOzg6Dqua4q%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDKpkEAVVj0VSQHYTtircA4dUPw31Rf7J8W76XkA21F%2BHSRcH4TTPY8mUJ2BBOMV6XM7E%2FVx%2FTU45fzGBHL4FvScXvyq%2Bqb7MrqQYV9svhpE3zFYuh4P9GaKHmcMqoL8XFk%2FTyQu1vXmKX4IDh7PKvMXg7uWMNR8s16x4diwCC30cf3XDyZbnJFYHlRZyg1NpG5cQylR%2FwpGimBo1xgi5AZj9D1N5QR2mqMbOx%2FSEaWx2Qqvth45TP%2FAZr26rSfFuthT8gSgpV916RENw%2Ft2Y64DqDSTXTedjNqW8DkUizxnR3Q5GG1cK4D%2Bgz8TLIt%2FRsMu%2FToeUQ%2FhNvXgsBYT3RQV1Q3jnfSoqL70yNMa6LdMB5zc7YafPF26JQOaZZWLoeFgHlDwhBwiJd7HQa5xnPbBL2s4a4tKmYSOJ3cSW2fzGJymcMAKqRBlzkPci0l8vz4VV0DsAqNyS%2BxNonZq9sua%2F1ZkHJcjjgbCSth4ZUri6lEsf3cNldAwNYIbalqwBayDjNJHLVjipYHn9b1oR1TDWc31WMj1fAy8PAyIIPb2EsS1c7xNKdKdW1PxeuTsRagjTsPYhX08t%2BCYEJrfN%2BuiMjpEa1prziwHOXtAkVG8XZZhZoG%2FNeXQumT77DQuKkTGMB5M73YUrX9TlMIHMrc4GOqUBxsYondIVWaz9iahHM9B5a%2B2oYkLQzs%2BQYAtFHWtKLPVa98rktWWe0xqkWVXkzMTzKm4dpPS75PPkDU8J3GQALnCTSItuw%2FvMxksUHKVyWL%2FMHxYuLz3WgzLjN%2Bi8eQeleU%2BbXyxhmd7HCgrr41Yv5mCUPid7ROfGNUsLkRHOgJhJ7%2BHXhHwkrllaI3MWJ%2BPymyj7OGyeKgk2ekQMKJ1ZmeOrv1BM&X-Amz-Signature=c5a236e8e52808a3dd8c7daa5eb874abef42835ea0928546d1d91970eda60cc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5MLMQIZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIAoB5RP8yuYv%2F3Q9dfXGIE4UQScIyh98m7pfXEJIcs6dAiEAw1gbd1zO%2FPM%2FhOjL5RQaq765RlMC4ce2ilTg0l1vNOcq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDFbHoMZs1hG%2FgElL9SrcA19JyPSujz%2Bc1Zq8%2FkgHfnPz00Ib6eZY%2Bf6oCCAiAOZRQjaPOo0cmFmt%2B6n5sJdghIYrn5XMGJ1vzC6pbbd4%2FMuqUyGoT9ZF2L17Byd8%2F1EVieU%2FX75u1m4p8XyDyDSzGkdb%2B6vVci5ltOMUNy08y4ATayYOJrAPpt9bg7hCCKSJtGrDvtRCyYQ207D%2BI8z8bEhPJB%2FbTy%2Bpw4bEOFyqqqQB2BVbDd87oGMvEPq4nJKHfNkhC5%2BpadMTBrJmqmarYDtCe5DHM6I%2BLolmfYUvdFsJi%2FQiDjEDx4z6tjb%2BGJavrGS11Tb2mX6%2F3BhZYdLhwVISJdx0IBlcRYC6ID1B5LjQ7U%2BDn1KreAYZs8RPVLlDz37McmJyw7e7l3sKx2dpdPT8nJjH5HhxbQdVt2Vx7ydbIOAWBgibVXHfbZm%2F5d9CNJlRrh0Cx94XWtXDOkLvO3RbF5%2FdFrJQJReXB1iIGH%2FN9jg7PI8oG3vMSgdAmJ4tJuUDlEebrfeTv5LCbJ2bfxUMZeIy90MzRoXFVl0AbV9iKhv81%2FyiQkAhlNQiAGkVyupE%2Bk%2FfaJDHvKaEEox05bQZtn7ACfuwpaCZB5WPiI880VpdN7k0NEd2HSJdf4eEXmMsz5afDmXKRjFYMJbMrc4GOqUBwIHQx0ZZVsWqku30wufkz%2BVKK54oarG%2FLg%2Ftx6hKbylqZqBcmX2rgPXiWFVVNOk%2FgoGKZlaKPzcDsbs46mGbssf%2BTcPIP9kdtd%2F4N8QDmP%2FFSMVIc9McgfdtURg3krTMRt3sD9d4MpFbStPglSlORcyJ8a3D64DggPWBjgr%2BviXqLNEoatXT1TQYqJtulynbdStcA%2BY8P8HHoLpWnehSu6a%2F1zw2&X-Amz-Signature=e4f6146787140d269382288c4b96736a1a017438ad87634bd218c044864e7d08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5MLMQIZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIAoB5RP8yuYv%2F3Q9dfXGIE4UQScIyh98m7pfXEJIcs6dAiEAw1gbd1zO%2FPM%2FhOjL5RQaq765RlMC4ce2ilTg0l1vNOcq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDFbHoMZs1hG%2FgElL9SrcA19JyPSujz%2Bc1Zq8%2FkgHfnPz00Ib6eZY%2Bf6oCCAiAOZRQjaPOo0cmFmt%2B6n5sJdghIYrn5XMGJ1vzC6pbbd4%2FMuqUyGoT9ZF2L17Byd8%2F1EVieU%2FX75u1m4p8XyDyDSzGkdb%2B6vVci5ltOMUNy08y4ATayYOJrAPpt9bg7hCCKSJtGrDvtRCyYQ207D%2BI8z8bEhPJB%2FbTy%2Bpw4bEOFyqqqQB2BVbDd87oGMvEPq4nJKHfNkhC5%2BpadMTBrJmqmarYDtCe5DHM6I%2BLolmfYUvdFsJi%2FQiDjEDx4z6tjb%2BGJavrGS11Tb2mX6%2F3BhZYdLhwVISJdx0IBlcRYC6ID1B5LjQ7U%2BDn1KreAYZs8RPVLlDz37McmJyw7e7l3sKx2dpdPT8nJjH5HhxbQdVt2Vx7ydbIOAWBgibVXHfbZm%2F5d9CNJlRrh0Cx94XWtXDOkLvO3RbF5%2FdFrJQJReXB1iIGH%2FN9jg7PI8oG3vMSgdAmJ4tJuUDlEebrfeTv5LCbJ2bfxUMZeIy90MzRoXFVl0AbV9iKhv81%2FyiQkAhlNQiAGkVyupE%2Bk%2FfaJDHvKaEEox05bQZtn7ACfuwpaCZB5WPiI880VpdN7k0NEd2HSJdf4eEXmMsz5afDmXKRjFYMJbMrc4GOqUBwIHQx0ZZVsWqku30wufkz%2BVKK54oarG%2FLg%2Ftx6hKbylqZqBcmX2rgPXiWFVVNOk%2FgoGKZlaKPzcDsbs46mGbssf%2BTcPIP9kdtd%2F4N8QDmP%2FFSMVIc9McgfdtURg3krTMRt3sD9d4MpFbStPglSlORcyJ8a3D64DggPWBjgr%2BviXqLNEoatXT1TQYqJtulynbdStcA%2BY8P8HHoLpWnehSu6a%2F1zw2&X-Amz-Signature=5a50d09d6acbd6f69d20ea9670c98a211345100b9e4826baa3283ae28eaae66b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWF5DXS6%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIChUlZQr1E5wiIYuzRk2nKDW6DUCv779%2F%2FHkUyH4ikSuAiEAuMA%2FXSnYCzcdLo3ibA0r%2BYHmUVI0svbREv6OXm475zoq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDGnOHwlBDFXH9wEdIircA8hU4f4b%2BcEk1q%2FLew%2BMRs2ALJOaz4GMdU4AbHSArlYY5emCJ4BZb5H86rwPil4K71oL13DI8T4x1oqEgMUdzaUFIzOHcVlsnxzfa%2Bpyq49uTSZNK%2BipD%2By4LL8Aj%2BRlsXQ5p4vIakOxffIvO9h%2FH43lfnrXb8HrLUbzmF434%2F5tAf%2FJCCqZB9EVQ9G5tWRzOrW8hDAuxfEX0L4hLyq98K0%2FS%2FyH7Y7Za28oMjLG%2FNVXAJr%2Bh2S3og5IRZM1FK7rZC7%2F9egF8HodzCZnu%2BZiO2VnkXUULkqB%2FHf9YuW19d1hCv1DNWl9DYFN10x3g9H1WlPvfa5YiXtEQplw1F3m4%2BXeJJkjc4sepDJLtuxEyTT%2FWqzxT12v2tid8XgOTQT28kEfbuHpbblMiEhOisqo0vpG%2FS3UVYLeNfCc2E3IfIhzxvlHKK5%2BWO2OqHMctYwjhgPA53IWRpa9LC3jw1nK%2BTWRe4PZInntuectQnmEHWFiZ%2BLp39qznFIFFH1CNtcdwc5BZ9S8a3A8in%2Fm8D2g52vvKRqZ8qSI05DPi53ZQs4%2Bh4iToYCmnyIYw0EbF1p8yC5xm4v5szwINq7XqLqrYxtbplR4hVVCA%2BH3pOfw3HjTwO5WGir4qL%2FNb8cNMJbLrc4GOqUB5Ink96phRrRhsqwE9RtC9D24UdUl3akk9SD17pHmR0E6q3o9Yt1rPZv6xULLVWj5R0i4Ojb6qvpgu7qnbPQcGgQBYb8tO9V%2B2v2NwQgmdBXqZ43x6Hwxm19F0BQQVHSPc47HJH7r1fdELHrvdEmsAcVx9WardZvFTnFZAXvohpTkvItWfUjriL2wEf9%2F%2F1lzTpSWlKmEy0TMvgGU2rzblr%2FywIVf&X-Amz-Signature=a969dac956f82b426f929ee3f47c754cbe8f8ab5ef18f2c3916ea5225d537476&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWFKXBMX%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDhPvm%2BdKmI8EIXZ5OTPz3T4hF9YCboC7bvlOuYWIA4eAIgbReuE3aTLKUCvk4nkRWtI6KKXE3FvuhTR1O6vjS1eLUq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDDvTN6nHSwSLi5jHxircA03GA8vyu7NCbe3hlAtLOIUqV9XMHkfpYaZ8jDqpddlWeyro0qjvB7iaT%2FggcG9eu0rCvzH0YNUdJAoi9DlzT5vJXTsH0ZNJVbbo6sOf8dZUrLGQ2qjBrabuA%2F36eYwMS3M7EG0kK3J1R1aeEb00broGEa0tJGU%2FgkSenZrPztZu%2BhV7l1hnr9tAq7cOuiJLfj%2Bmb76%2BYRDl4FzUdrRDNr6e1gZ%2BnLan63rSWmy7MDkDb7w1bHwR4OsrDo7%2FPYhgJskegAMvwBeFb6XUUV74pHIrC23yfN%2F0wu8OvzizPHv3zGt7RZKXrMNs8%2FCqaOVAugUrKd7YgbHyHEzzSvVVx%2B30zUtag%2BCSLihEmZBHJxWrjLWOI56lA4QrQXgTXPnvXaRz4JfK5I%2BctBNwRBuyCUMwqwLXJpSsetwdCRMy5Xp7I1hDL9AcGpcACiLulENvLB0P1Q8ngihEIN0uoiUZLNEYCTqHpcABgVkptwE7gpG7TT%2F39JxI2ZNoBCmJDwbzFxkb15tV6mbk1xrYcoFC%2BPZVkOdIvoTEzhlGASctROh%2F8nMJ9Hsu%2BvBjel%2B0WiWPgJFn0Qvh8BIw0VecpXrOyja1UErzcYZIyaFyf%2FEHHFaOv%2By%2BeIsI28GGY%2BpFMPLLrc4GOqUBYpSGbDAd%2Bc%2BoznR9v9DqSgYOZq5zc9sPu7cO12R64u2DSdpHshEsFoUmIa%2F8OLm76IPf5LOM9yLFS%2FHU%2FYUWlpzkqUptugnKt9pIGPw1TNSzGahlw1r1xrsZ%2B7JuOqkguGDOVqutXae7ib2JxuUjsLGsdUCrnmI3rj3I1ICrW0z2ocotHlYugT7c%2B3XQ6iWBnZLuAVUVD2YaQr1nDHX4OcKtlnn3&X-Amz-Signature=b7cffa8307e5bf30963979864c5bdb843a97cbfc13d7464c8a47f3b586f48a48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWFKXBMX%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDhPvm%2BdKmI8EIXZ5OTPz3T4hF9YCboC7bvlOuYWIA4eAIgbReuE3aTLKUCvk4nkRWtI6KKXE3FvuhTR1O6vjS1eLUq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDDvTN6nHSwSLi5jHxircA03GA8vyu7NCbe3hlAtLOIUqV9XMHkfpYaZ8jDqpddlWeyro0qjvB7iaT%2FggcG9eu0rCvzH0YNUdJAoi9DlzT5vJXTsH0ZNJVbbo6sOf8dZUrLGQ2qjBrabuA%2F36eYwMS3M7EG0kK3J1R1aeEb00broGEa0tJGU%2FgkSenZrPztZu%2BhV7l1hnr9tAq7cOuiJLfj%2Bmb76%2BYRDl4FzUdrRDNr6e1gZ%2BnLan63rSWmy7MDkDb7w1bHwR4OsrDo7%2FPYhgJskegAMvwBeFb6XUUV74pHIrC23yfN%2F0wu8OvzizPHv3zGt7RZKXrMNs8%2FCqaOVAugUrKd7YgbHyHEzzSvVVx%2B30zUtag%2BCSLihEmZBHJxWrjLWOI56lA4QrQXgTXPnvXaRz4JfK5I%2BctBNwRBuyCUMwqwLXJpSsetwdCRMy5Xp7I1hDL9AcGpcACiLulENvLB0P1Q8ngihEIN0uoiUZLNEYCTqHpcABgVkptwE7gpG7TT%2F39JxI2ZNoBCmJDwbzFxkb15tV6mbk1xrYcoFC%2BPZVkOdIvoTEzhlGASctROh%2F8nMJ9Hsu%2BvBjel%2B0WiWPgJFn0Qvh8BIw0VecpXrOyja1UErzcYZIyaFyf%2FEHHFaOv%2By%2BeIsI28GGY%2BpFMPLLrc4GOqUBYpSGbDAd%2Bc%2BoznR9v9DqSgYOZq5zc9sPu7cO12R64u2DSdpHshEsFoUmIa%2F8OLm76IPf5LOM9yLFS%2FHU%2FYUWlpzkqUptugnKt9pIGPw1TNSzGahlw1r1xrsZ%2B7JuOqkguGDOVqutXae7ib2JxuUjsLGsdUCrnmI3rj3I1ICrW0z2ocotHlYugT7c%2B3XQ6iWBnZLuAVUVD2YaQr1nDHX4OcKtlnn3&X-Amz-Signature=b7cffa8307e5bf30963979864c5bdb843a97cbfc13d7464c8a47f3b586f48a48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652L4GBJZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T075843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDtUGXsFO8PGtY3u%2Bh6i0DX6WcR4AmJeZLE6f5qf8iA4QIgH7M4J7wy2AIqGTVhkLywfXQSXTs2GylkQrof9psUswEq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDIlOcj0ymrt2%2Bsz%2F3yrcAxH6uKWy%2FI%2B7Hb1oP%2FQY50VkXO2iGGtoiRDBCsyI8HdzwxnjO0gEKgzuk3%2FxmXDAc2I%2FLOFEFJ1Iyj5zhZv%2FbbESmmmrVgsf133mBSsecBcQuqDFiiswE2t9AtJT4p0kAQSr65JnunSAjF%2BT0wfud2ruykh5JWJfSwHL4QegJL0gFeci0SeRhJPJEnvs2u%2BftSVmLoobFPQdvydcDWY4RC5rQxaySB18UOElrpAYLaRme6z4SqjySQBmud%2B66tVNiDU5c9fnifbPXsKpqXIFUfz%2Fio0rbwjJfAc3dVuo8FFxcWy31cSzrFxMbI1kCGz1dzP1IT5Y2dTX39RWRDeHJ77iF%2BfoSR%2BifjKUe72i5CUeChMLkx2Bmahdo9c%2Badlz%2FIaS1JylC0hV2rnt0fAUk0bDNjIu%2ByIFvciDvVTRXDzuY6FqyEQmhcXqla2GeNLWlkK82XahydylL6cM6mk6a5R6rwUbgLJukErInf0ZtLperd%2Fz1mW0Y1XQDiI5pL2kzvP5R0nn21kDYm9CcSnTW0EU1%2FhP4y3gZ%2BPeiWB77ijJa9xqIp7Bnys7rktAIqUujIaHsvmjBe%2B4CQHCDDFUC3UpZ%2FNqgCXiyOykVzep4i4dP9KkBqbhj%2BKQ5XSHMN7Lrc4GOqUBYxEs0qqb3hYsCRwhajYXPPsYyTwP9fbJ5NAqyhtalcMLUdr1IEqJCXZ0Sznt9qbE0%2F9IseXc8QTqPLp%2FVW9KXZ4C9CTxIb1eBKaCfZR%2BGq2efrCigVREVrFtW2c%2FyNSNjdjXT6K9ez3RxP7ShGlPND7LhlFy%2FZwwqy52m3hkORy9LsRSdHsRENYf2bXm6KanqXlqzSYGQEvmP%2F285nmA%2BSs%2FpUKJ&X-Amz-Signature=1ee07ccec7c3801810f799a3be00f4739663af5ac3f621c4048a2e195b5288ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

