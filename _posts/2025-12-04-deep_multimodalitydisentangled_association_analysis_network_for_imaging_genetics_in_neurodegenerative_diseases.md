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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBG73EKY%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCDa%2BavLsQDSVR9meVYZFV5iNCXSkhbCikVjvzbP79ZjQIgDVGGcSijfgTtctt7Nr40BAZkIP%2BUQswfC5BveRTZ27Qq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDFwvDtjq64EawitlBircA6LZCf4ORu%2F9ukNLVd%2Fa%2BJ5cKxAwNf20m0BOVwymHBE5zBI8fZv2hAxPVz5JYzY5CgfUR2YYmcjijXTkdoOlHpnXgab4XMoO6uJNskURbAh2E6CFILO%2BqVwKZKZodX6fM8O4PPyJFPHaEOjgFbkFruGFOMVqu%2FXjRvIxVx86lXtR6a4j3zU432oxUM1pDgzyodKvgXfGyjxAT9zs9eWbfTFGcBl5%2BQobtDTClMdF2ScD%2FxVmtr5XMNrtaSPHwVL9w%2FQujg7sPEb1gBMRdUTpHo855pvypwVTzEUPebI6k02Q%2Blh%2ByPllFRhdPcDjl3byReqHM5GIu2uFfsiW1yGVbq8luCTUSbJVIdKi7cwMdSuMNJGTrpcgq2THihrN%2BFZjUo364czvvp62pNE4IoR03UYbAU8y6LzSPZLhs1Gqds%2BXQDN%2BcXtAOJUULDg7mFmSkFYcpq1ucrfF9fjaPk9eYzPbPR8s5LLtHW%2FMZ%2BZHTwfGEKyTr1eSvCP9mp1Oh2j2TkETpJDrvObdYKj7seud54sUGna5YokhuFFIDVqcX%2FINWQePiN%2B1TCiX77GmCwhy9xMfCSoJZXjVGulJyuEUS1ED%2B5sRYETdbsAVwr3uaNVjFNmtnTxpn1VjzUf8MN6M%2BswGOqUBNVQBZ3lipEFOdCUY31rce6gUYiryjojPGRSuZFWGpbkjPZK8B4jYqRWbgQqOlPiUAjGQnGuCBZxaX62RxXeP4ETE6V7QZFPfzYsQ7MYbKqBBuQpFAPA23yLX46p7jwN0hTMSY85XAs7oXgiRuE5Uf8I0IhAceCa7Sdwpq4hawd1bCJGPuVTMhM2buRM0NuVz%2B8nr6r3qt9puDdWVfxfdxXxqNKSI&X-Amz-Signature=a417bb5f0d0368464725569594976beb92a26c0f569a54faf97069edb96b9f2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBG73EKY%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCDa%2BavLsQDSVR9meVYZFV5iNCXSkhbCikVjvzbP79ZjQIgDVGGcSijfgTtctt7Nr40BAZkIP%2BUQswfC5BveRTZ27Qq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDFwvDtjq64EawitlBircA6LZCf4ORu%2F9ukNLVd%2Fa%2BJ5cKxAwNf20m0BOVwymHBE5zBI8fZv2hAxPVz5JYzY5CgfUR2YYmcjijXTkdoOlHpnXgab4XMoO6uJNskURbAh2E6CFILO%2BqVwKZKZodX6fM8O4PPyJFPHaEOjgFbkFruGFOMVqu%2FXjRvIxVx86lXtR6a4j3zU432oxUM1pDgzyodKvgXfGyjxAT9zs9eWbfTFGcBl5%2BQobtDTClMdF2ScD%2FxVmtr5XMNrtaSPHwVL9w%2FQujg7sPEb1gBMRdUTpHo855pvypwVTzEUPebI6k02Q%2Blh%2ByPllFRhdPcDjl3byReqHM5GIu2uFfsiW1yGVbq8luCTUSbJVIdKi7cwMdSuMNJGTrpcgq2THihrN%2BFZjUo364czvvp62pNE4IoR03UYbAU8y6LzSPZLhs1Gqds%2BXQDN%2BcXtAOJUULDg7mFmSkFYcpq1ucrfF9fjaPk9eYzPbPR8s5LLtHW%2FMZ%2BZHTwfGEKyTr1eSvCP9mp1Oh2j2TkETpJDrvObdYKj7seud54sUGna5YokhuFFIDVqcX%2FINWQePiN%2B1TCiX77GmCwhy9xMfCSoJZXjVGulJyuEUS1ED%2B5sRYETdbsAVwr3uaNVjFNmtnTxpn1VjzUf8MN6M%2BswGOqUBNVQBZ3lipEFOdCUY31rce6gUYiryjojPGRSuZFWGpbkjPZK8B4jYqRWbgQqOlPiUAjGQnGuCBZxaX62RxXeP4ETE6V7QZFPfzYsQ7MYbKqBBuQpFAPA23yLX46p7jwN0hTMSY85XAs7oXgiRuE5Uf8I0IhAceCa7Sdwpq4hawd1bCJGPuVTMhM2buRM0NuVz%2B8nr6r3qt9puDdWVfxfdxXxqNKSI&X-Amz-Signature=a417bb5f0d0368464725569594976beb92a26c0f569a54faf97069edb96b9f2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PPHWPZN%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIGp83LWkcazBeRy4JItsu01Yc%2B7fSuftpOYjB%2FvsFiNPAiBUO2qg57Rc6rKP9eGxolHQNWpzy1Gq7IXSIX8DQI9BOSr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMMzsPQkhrTxA4SBVYKtwDogRXqVRW3iSvifu3MuSOh3o6UXXvwo7YaX1stbwcud6MV5dbz%2F64xf9c4DxdYeHOgcQKUAYftKcTGVOleEtiVeFpMIDmJEq5I2MdZUlxNE6V51jN3IY1lkwxt%2FcVJQsa8a3Ik3%2F1vBR1yLdRops73CoWgdKy7XEpv6kaxdfSIh7fy8bQL39iNM5T%2Fno1V6YnyV0uf3igG7ofVnbjBpAF3rGyJDVqTtarH8yrIRdzTeqi8pmafKLWJxiUFJC90PpCxLQjmTw75Fg%2FFKq8w5N%2Br1Cpf%2BWY3JrzxXKb0F6F7BVGhSlWybo%2F8%2BATVXmK5oHE6HKq0ZIXIGteYV5YtTTwYMIMv1Ae62kDaDbbP4oWxXrqRIOzs%2F13M7o%2BxD5LQ1F62Ega%2Bd50srx5AkzsWOue5GLS9330Nd4M%2Fd7Fuu%2FIbH0Xo9rpwsDLpYRuI3Tuqi9I1RfwCPWNMBDbaEsjT5mR2JzVsYCDe5Mfy1ffbXpvJ5RzXo7THxYcMJW%2BC%2FATy8rRdRxSt9LpbiV3JXnvPZyxQ8%2Ft96E6QtBUgeS35H8n5CE0zNv%2FcMe8m5mThsOSwDSTZPyOZnwvs7xD3kQiclhqgdPhNHkMZxTXd8cRjeY%2BOhbXcVQUvQOZwto5HOAw0Iz6zAY6pgFCK6Gsurcd%2FvxeFexWVQXUsiwyA2yufxHRz5A32ikGKxum7%2Fzs1fJffa4f8t7aVtrOkyePclQv8%2Fdse0f%2BnSfXhDvto8XH1BVXclYSBYNyRGK4YphY9SslSVcjwKyaHp9JO6xmF7Ve7ubYkqiEYbR%2FmUzeMq%2Bo0NUgf6wVLUHKkBHxKH0gfkf7ja3aLTjaSOpHcyrf2A2S3lnIrr%2Bv8wVNm6lHiXxB&X-Amz-Signature=0a832cc6853f3d86adf0c0e9028f2298f4fd29e8c9c0a0b77761079c34afca25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5PTVJUA%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIEk00THLgt4Y9oVd%2F7yZvDxy8vsg4iz%2Fz2aAkMu4XTE2AiATk5z3Bf6%2F5sU0F9XkzGbs3gAauNHoW5HzcADNNPGGVCr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMCqSBKsvHqoUOEZKTKtwDsLW5lNKt7emy0EqFYbY20LnIp%2FDhqh9n6ZWZuM%2F70ZQ%2BLF6YpnYazdFwlJ6g8yro56HAthQaMAJ%2FXuHBuweElkSxqg7r%2F0qNwgHcPUGg5xuSzquQleN6DA5gYQnSTXa1BlPceK%2F6rFLFb0XF3pxjd066PzmA7mSWJlunt1rWJ2lMnWu9L9QrQ59kmIG4unqDd%2F7Izrcp60qkwTCL2R25HgpmuRt895rw4pR2790YoyQKhVk0ohzBWzqkt16WNtxJ7spQZLOU6V37eyI%2Ff0VDMigxzt%2FIDZcRblYkyVpoPOIpDYSGtVqjpl%2BSaganGanO53niE5eICddhuDHv%2BoM%2BtTP%2BzkxHMrVt%2BSo2V5%2FlGEXq%2F3boutmIOlhL2cc%2B5IRxp8c9l69gH3THlAPxd5x5%2BMD62IhnmYCHnO0KTcMZfmV1k%2B7r1e4r9mgbSDLB%2FR0tS0BGywgkrSXIjtWltITbtoqWcjTALnfITgZmAfSIsEwrmEJyABt%2B5pijpnZhzSC8Ovs3L%2FOeJtTF1KEpqhq0nOSyOkLR%2BLT4nTn8mx1t35LgqLoU0bKtIH2pNVDrDes%2BRuwoqBdGMhpiYmK0ARxN2OK88TtpNtasfvUGO%2FvumwUFT0MUbcyxn5rf1N4wvYz6zAY6pgEDaxOWnZikC%2FkSB3dvXIcCeNjSznqRCdzy3dSbJVc3Y7f9TNaZKcAqF99gVd9ggicJotVzcfpslJSUGgx7AUPJO5gTAzyGdlLeu5P8%2FDNYCNjNM0rsnpgQgzF%2Fv%2FNN9VyEAtKtij3lRMSsgegzmcZN2aFvea5b9FDfYgtS5zvWcIWAnHOPlvIb%2BTQLJdr0hURKlrQyllDm%2Fb6u%2FfDOKzK9Z2Uk1cTS&X-Amz-Signature=d7b7d7541bf7ba05a392254b86603c154cb805ca67259b1169185aeb934954c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5PTVJUA%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIEk00THLgt4Y9oVd%2F7yZvDxy8vsg4iz%2Fz2aAkMu4XTE2AiATk5z3Bf6%2F5sU0F9XkzGbs3gAauNHoW5HzcADNNPGGVCr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMCqSBKsvHqoUOEZKTKtwDsLW5lNKt7emy0EqFYbY20LnIp%2FDhqh9n6ZWZuM%2F70ZQ%2BLF6YpnYazdFwlJ6g8yro56HAthQaMAJ%2FXuHBuweElkSxqg7r%2F0qNwgHcPUGg5xuSzquQleN6DA5gYQnSTXa1BlPceK%2F6rFLFb0XF3pxjd066PzmA7mSWJlunt1rWJ2lMnWu9L9QrQ59kmIG4unqDd%2F7Izrcp60qkwTCL2R25HgpmuRt895rw4pR2790YoyQKhVk0ohzBWzqkt16WNtxJ7spQZLOU6V37eyI%2Ff0VDMigxzt%2FIDZcRblYkyVpoPOIpDYSGtVqjpl%2BSaganGanO53niE5eICddhuDHv%2BoM%2BtTP%2BzkxHMrVt%2BSo2V5%2FlGEXq%2F3boutmIOlhL2cc%2B5IRxp8c9l69gH3THlAPxd5x5%2BMD62IhnmYCHnO0KTcMZfmV1k%2B7r1e4r9mgbSDLB%2FR0tS0BGywgkrSXIjtWltITbtoqWcjTALnfITgZmAfSIsEwrmEJyABt%2B5pijpnZhzSC8Ovs3L%2FOeJtTF1KEpqhq0nOSyOkLR%2BLT4nTn8mx1t35LgqLoU0bKtIH2pNVDrDes%2BRuwoqBdGMhpiYmK0ARxN2OK88TtpNtasfvUGO%2FvumwUFT0MUbcyxn5rf1N4wvYz6zAY6pgEDaxOWnZikC%2FkSB3dvXIcCeNjSznqRCdzy3dSbJVc3Y7f9TNaZKcAqF99gVd9ggicJotVzcfpslJSUGgx7AUPJO5gTAzyGdlLeu5P8%2FDNYCNjNM0rsnpgQgzF%2Fv%2FNN9VyEAtKtij3lRMSsgegzmcZN2aFvea5b9FDfYgtS5zvWcIWAnHOPlvIb%2BTQLJdr0hURKlrQyllDm%2Fb6u%2FfDOKzK9Z2Uk1cTS&X-Amz-Signature=e1d2a5c0c935317b40ca80f67081e5d5e438497ed477c7509b8800cfb803a809&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMAPJBVG%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCICom3P%2Fxq3i%2FrVN4mOQPsjfRKpDnkCZ8%2Frw7MrpZqR8vAiEAyrKwk9EaYtYVUnS76QYOXuklrXFLYsQqPZSBK%2FgWaNwq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDPXKAookacKbJ1DEzyrcA4KgDrijPMpRZfmHwWfySHV0%2By1EMUu%2FE%2Bs8%2F%2B4uSI9PpZC9sC4RU0Or%2FRNiOPCu8ykD3%2Bi8fdmUEFLcUrbS2UtWNr%2FLcuXDBVucZvwH8olAmojXnJioTRaVwp%2FznRooCPcWHb5qvpqp7mvSUK%2BReG1vzoVUb%2Foawlhl%2BsILjWV4oPpLyLILCEYwZ0yaELTY0c3pAQ99r%2FbOTjTMRIRoVYKFYtEM%2FNJg71SZqlrHbcvOX2iYyqkoP3fxRwPNivvkfaqDxGnGmPi99PXoZKcRSy%2BlNvn29frKLeNLZWY%2FSOAUgozOSU8f8xRuRKe8v2ahwEqEOX%2B7jh67mwZCmM%2Fpbnyi95r8QWYScZcY3OHB%2BEqQpIH%2FreZwiLvkfqOQvxJtZ443A0n2WWXuUUK%2F2xCf19NBODoabPVoCo9kFiHCQHH54iYBnNppxlwDU%2BvPRnao%2BpHbdedA2cPqHeqbD%2FzdgTD2Idhf1NxrG1qOJKNdgBF3CB47ySpcqF7Cl0V9VPg4Cw249XPqCqDT5bcj0BV21VuTcbl6SHl4%2Fd14uvxt0onPbj4YCeCXJCpuwruuSK9Y6nUaNGwXOvu3Vib8kwAKrdoO0OZ0vTg0F5wehk2MklwTz9apSMNPB7X6pzOMMPOH%2B8wGOqUBoP1mZDvBPKJX1fSm3MVHov0XILlU1Hny4v0dmDJZER%2Fdde%2Foq0JBMpSGbS8P0ZO%2BDBFCsiwuwA6EyMkHceR7x%2FUU%2BsKXyYmQqh4Kxa8VpiwqCP7pH69dDwKC5%2F03iATx09TmEn8%2FcTF3EZ1FwJPQfdJ3PiERxw435cC7FgivV3w1zVYvTPe3gvGpj07fm2aPtrhbFEGqa1KJLfHqQm%2B1YVGxQ93B&X-Amz-Signature=966246bc0d86a03214d279e11464747a7276dcee55109ae465717d5720f54a63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEND44V2%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIHWYJGe6FSHvU5bUsIKCeikZp9FVcKPeE%2Fd1UPM8X02FAiEA16ELk51Hog5i9h0IpK1uaC9EVy4HdWvGx4H0mCnxXSMq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDNw8i%2FYky%2F%2Foaz67AyrcA4BrI75Bn7t0WCg%2BFS7Rbdqrd17AUxs16K9irNfYzc4mmISedoDECYS32sjBeimyRGsmSXwm6E8%2BjXMFFxR9Kqr7wnzmo%2B6IVfnHd28rKb2fg6z0wi62JKSGlKs2SlWNZwLCwov%2BV%2FlXJcw6eYwT5oEoP5DOniXFvGrMo%2BOW3OsZUyxZk9OqyXnrkd4K11DgFPlh%2BkvV82UHuzZby3lg2C3%2FInFCWYm718NSMEIUFcIzpUrGA%2B24junmYJcvQgZ%2BlMBUU8pPYG1a3DPRy%2Fm6LIDBi3W0Zi%2BiUC3OSNJ0u%2BAnLSYrFDjVNdcamzdMB1RyJlaEOojuuRvwh2clLPbC0Gv7XbqJ1VCxvadvJjbKKUDMX9jpvhVg7Rj8%2FBrRRydC5KAL3ZDR6Y3GQh2Jp9%2FI1esNIHZC7xoGlHD8zYTaZXC%2FeJFU%2BhV18n1eG2oC79sLNPVq5lNowhjG1bwz2EHx7NPdWTyQdi3RMUFTF317ZJ5oAuuITW%2FZBJkELTFgzCg6xMqJi1Is0AC58wUmyJaejvQEHTQydmcK0yOk9JBs2qlUV4VSEKGEthNot%2FecIxI2rtiUu3JcmHkbRX%2B0CW2vwvJVDtr1s7i5R%2FeLi0OApt6FJ2uRiOHSueiT5f%2FUMJKL%2BswGOqUBz038Q8e3LrDi0KLs7vSfQ2GEho6kgp1Mn1Ea7%2FNMfdHvx27hXFtvoxFL4Agy7khMc1ekp5YU6olDeZIdlydY3wxSK8SZN0zAFqwxBirWP2or%2FhEF3Ka5GZDda6MTMS1Gs7S2erq%2FhkXg%2BfUm8TkFaWkqs0iXaE94LxN%2B838QoSoIDUIQehDn1vPRsZpszLkHLLJ25WwM1rBnHaUA6nABH8k4FlDZ&X-Amz-Signature=1e5700d2597d344d404437438f9dec7e5041c5423e4e84ca2532111b85af58cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NVRPVIS%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIB2aY8qeqmn2ixoYg6r1EfbgqHnioZj1ldQcwmRLX5TDAiAfyoBCCWA8080%2BYDguky9oplivz%2BWZbNFAE5vNVsZTcCr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMZRVkKIbi5yoGLUDNKtwDPDzRnc6SFIg6BEuT%2F2y96TJSSM40cVy3SjSN8dyRS8q6OJYA3AJOBKfcYkguxJPlrB2YIyznBs2C06CbpR9KqrWzroaIBFg1c%2B5d3oJsAkP6tS%2B8IfywmEfRkX1JaFDFrgu0z75X2%2FgpREZes01zTOO2EqyegtrHtCIQJF0Ymdg%2FJbIuDwzWnz%2BQdYiJB4oEApFPybwwgC%2FiwlcUmj16P4ukqxoFNgkmfpAUz0he3mFCQxsQuZABXzYvnOIHoCH5welTzzf91Mqj5c%2F0lBEmN%2BH5%2F%2F1%2BhSiEWeClgc0g0%2BEVnzGYbJ8b%2BpARLCyDIIZu%2BPlzCXH1WUWA9qXNYH8D9YY4EdAe0ENVcO6DZyrGJBq54AWy78OYwfhTE5Uy0kJ4JpC91p7yg3nWojvZU4tgfMkG9UQTSNFUl1JcL%2Bdx7Lg0%2FLa79mpLQ1fapShEdSo0xtKqS98NJ0ZucKdkWq2Vxkd3E0opHXKrlYK6dexrLHRhhifoOug%2BeJYA%2BbYKQ7xPQOFrgVasqP8lYZ5nQN3zJv8Apyj1QBD6F4iZlPwisxfSZLBDEqoAB2BjLlGdu1fcMhx%2BqiZqp1NvVvEzRfxi7KomqgCQUKvhbxFIPMvZn6isvFF0oHpo4fJFM4Ew4Yz6zAY6pgFBQkpGALRbY8H4KA0kunxOKXcu1s96IU8I3k16NxniUcvF5atFeQaIMDfn8mOYfTySjxBkmDsTVbM9JyGa5OcYSLWkJCfQv50uqdIMkmIdpG4%2FPfxe5OQxTAjX05qcfXpbfg5lhQY5uJ%2B2QdSS4RzgMkRFqSA%2FoQd0rshyOjOm81nkFEif0tGKtR0YMlHWkwcVW7ZkEDJ19Fta2FL%2BtDldkJ4NJBmZ&X-Amz-Signature=71d3a54b7f537be7ac6643e72b5d54a5f7a0c973b5b21b2281a762abc8bfbcca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZB3RWBBR%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIGGb5qeX4uzYYTPFp8k5j5g9mdQauRmuQUWle61SlRWaAiEA%2FBIGIYZS2QMoefJpqrE5rYZhD3Dbi1nikBpgGsBY3ngq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDNYe%2BL%2FCMkzWrxTX5CrcA%2FIjDfuFH6xnoy%2FPjqDZizYjixA9y%2BBlG4p6JjfuF7QyflbZQVRfTjNQ75U5LSEOaO%2FcEUj8XN5Cj3aCVCXVXDD8CDkbTLanls1QH1q3HPOTITi19UTpMjeMEGfbdCI05VRc6ZTTcfOJH%2BQ7vuSA0jSXrBzXCCfnhmJzjutkkBCAjxhFWEXzsqfLQ%2FUcfsTep%2B3UZX4orFePsT%2BmIToRiddIsBQ4RRQsUYPGjHbVQRDZmwoXOZzBV6fG%2FNiP5%2BGr2Qx7m%2Fy9bKVjScAnLxrpL4jsHz%2BeKPPNMhkH6%2B%2Bg0tZaDcR7duk5FzgIJLX5225wRIA3uAfyisb%2BC2FPS63ffeDZeS0VKaD788TekiAnSGdszHvU03vyzxlRINEFD8jAwNGVuAF4cJh5TlpHoWwgayx0zuuKanu15zjdNcz5AygRltICQ7lxen816K3AOh3GHpqyQ1Yni8WTI9QfvIpbnJt0sQyVNv4briIlCG9syCRFIV29HMo5TGIbvbtnFmxdTsJNQoWQyjRGV5uW%2FDwFaHf8s7jMSoyipIu6ScU0xE1t%2BDIww9SexFeVFDwLJ2aID6YwfUUG6ZAb5%2BBUgHf8h9fA%2F7KtE2a5KZc2uFgods20QKVBX5I4WOrwz%2BlkMNiL%2BswGOqUB5ovZG4ZZIrRZ6LNyxTrGNV2%2B6YjXNHdaDKCRH3jwKvObY%2FS89Wv2Lj9u2I4ZaxE%2FO6DEA6OGQTjDLc0eHWp3zOegIxx7yHfwE%2FBT8Aae5JFAuWicIxGFvUoEdfSuAuLSRxpe2%2B1sTbVSeeCxavU7h8N1Xn0pFiK30Hhg86wZxoLAmi%2F6JPc05ecnwyqpmopUygUNOIxpCpKopB9HQf7y8lVhC989&X-Amz-Signature=dbe8ad98fb103fd4782f804f94e91a9a34d3dce2e06910f4a0342b8a5063dd2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZB3RWBBR%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIGGb5qeX4uzYYTPFp8k5j5g9mdQauRmuQUWle61SlRWaAiEA%2FBIGIYZS2QMoefJpqrE5rYZhD3Dbi1nikBpgGsBY3ngq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDNYe%2BL%2FCMkzWrxTX5CrcA%2FIjDfuFH6xnoy%2FPjqDZizYjixA9y%2BBlG4p6JjfuF7QyflbZQVRfTjNQ75U5LSEOaO%2FcEUj8XN5Cj3aCVCXVXDD8CDkbTLanls1QH1q3HPOTITi19UTpMjeMEGfbdCI05VRc6ZTTcfOJH%2BQ7vuSA0jSXrBzXCCfnhmJzjutkkBCAjxhFWEXzsqfLQ%2FUcfsTep%2B3UZX4orFePsT%2BmIToRiddIsBQ4RRQsUYPGjHbVQRDZmwoXOZzBV6fG%2FNiP5%2BGr2Qx7m%2Fy9bKVjScAnLxrpL4jsHz%2BeKPPNMhkH6%2B%2Bg0tZaDcR7duk5FzgIJLX5225wRIA3uAfyisb%2BC2FPS63ffeDZeS0VKaD788TekiAnSGdszHvU03vyzxlRINEFD8jAwNGVuAF4cJh5TlpHoWwgayx0zuuKanu15zjdNcz5AygRltICQ7lxen816K3AOh3GHpqyQ1Yni8WTI9QfvIpbnJt0sQyVNv4briIlCG9syCRFIV29HMo5TGIbvbtnFmxdTsJNQoWQyjRGV5uW%2FDwFaHf8s7jMSoyipIu6ScU0xE1t%2BDIww9SexFeVFDwLJ2aID6YwfUUG6ZAb5%2BBUgHf8h9fA%2F7KtE2a5KZc2uFgods20QKVBX5I4WOrwz%2BlkMNiL%2BswGOqUB5ovZG4ZZIrRZ6LNyxTrGNV2%2B6YjXNHdaDKCRH3jwKvObY%2FS89Wv2Lj9u2I4ZaxE%2FO6DEA6OGQTjDLc0eHWp3zOegIxx7yHfwE%2FBT8Aae5JFAuWicIxGFvUoEdfSuAuLSRxpe2%2B1sTbVSeeCxavU7h8N1Xn0pFiK30Hhg86wZxoLAmi%2F6JPc05ecnwyqpmopUygUNOIxpCpKopB9HQf7y8lVhC989&X-Amz-Signature=1c5e01c1168ad9a2c690b325b25f3e35360798551d7b1b6b5564c6c32fafba79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWQUD4Q3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQDNlGIxoncicGc4kIad67FK5hPBlylKjQhqhFSGsiZOOAIgQEfTK0cdac4pcG9qUbwPlwRhyUBwKbpZmlpbVqdjfRYq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDBQ%2BLMWfZX%2BW%2FueaxyrcA4V7ABZDuOysu2mJBaoG0gVsoyRla1I5i9RxtgrdvfzmKKTK90xPTjo50eA8oGMSlEWaeFFWTMEXyPpNdPHT9RTtiOyP807dyht8ZCZ4l%2FbxYl2oYVYeUhKuq93xwGdIO%2BKemj4%2FkK5Om3uDmkY7nhQ9pQhfThVAtFmrTC2nXPRtec%2BiepacNN3EvDS3nULSt0tkvpG2b%2BUHKfkGnbgzhSXn0NFj%2BZLmZJUIQ8PTTzOfxzs0I18aHRNpYBVYHqyu7IKN9iKNDf%2BFUfBLYFL3V98KMs4uuKWEmWJVwnBZfH%2F7Q8cmhn8haeN5Lxjn%2BnHa8t6yB72LLDmM%2FMyOEkUu6V40GaxI%2FI1SsUBnEG%2Ffiw6IriNI6rE5LeWPIqxuAiAfdxq%2Ff177Ds%2FpPVXIc0DEo2HenE3I0mUfKMZh1M3VIX9I3Ht2GppMaGkKEzt3SMtB0O3ty32hgXeie%2FuFURJKpBG1S1ebSQf1BR0m6%2B54U0KapAz9YolgNGuJKiLGKxwQnRBDe2jIy75%2BE7N2Hl4bxOFDFkeTUJpxkhXfTEXlI1xrycSv2CllK3tG4ZqQrkYecMEcLeGUPvMNp%2FhiFFAipFeKdkBAZDn8fZcNfXmsZUWSLxaHjPyY5isqlzOrMMeK%2BswGOqUB1PYxx9srNUCr09EJbGEEvcowayCXEQANW1fw3Q%2FI0KNQSCcdriQCms1pWA2CDCraF4RJRBJ1lNQqeNbG1Wa11HtjtE78xtt6LB9bPeV3ag%2BRdb6ypTlZ8rjdtjAhlP%2FI3sNn9H5cQrkG8ZINglOr0Nx1l6YE3hP2nREO5zvkhvNKjbwb%2FcTdIskN7nXlN7jTEuKkEgyBb9r1b3ZOQPfdA%2FrbBgJK&X-Amz-Signature=2f3a82c80e39db671dab656edb02cceba416e95cb5582f7c48832c2e254ac83f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLACGSOL%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCX1GZTum2JO6EZPqjcAizeC5AA2jwwXVIT%2Fp4y%2FthbdQIgayFvw2WlIi%2BcyIkVvJ%2B44OGLDByJYQDsEms3041tnokq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDC9b63953Oep7UGIaCrcA2REoHi9%2FhEw9PkfeKpadqyTu1QMkpQPK42grPQPnrCilywht0JKUbSOJUZOPdGsKVeNr1TuYVxMuaTRwDpQjyhUlkausC8fpMyz7u%2Fh1a4BTZ2FqEm6k63%2FanvtVgrPps9RGh%2BZzJ%2BQPmmZTRxKbCjUQSCmlgo415fXghvMbfR0m4G5ebumAhB7SYDFFGwSIA781nKKeM%2B%2Bw%2BaBuIMwgcHpECoT9Kq9bJ2ZBB26hNAhhZtUt0nI341FM60XgrF%2Fr9IEPzYe7lfJIbRr0KcBVoBS8qCLr8NdwcUTt5fGtHs7Ww9WgrETo%2FrS7H8tVUXS2h7l0ulivKGQ8Pk7aV76VTf6RFiERqPTqBTSt%2FBbO7cevvznLx0%2BpEkQ5pgGZCUXllRKs%2B7cKZy5PsmWVf3ILr%2BSwv52xrawp%2BOlj0ZOswXOb1dtI8dW2Fghssb6TRfKjz9HfaMUigDn2QQ3hVfeCOLPAz5D%2F9kLrYObtdAwP3nTukQ6%2B%2FO6GtAw3QIB%2FyI1p30g1BWT300qvVLknYgoiGtbNVYT62r6TlQFEKvjfjHa7gZyZ0SEc3n8oSJitjGx3H%2F2NE7HpulnRH2IBgwpcHfogNotHZXyduVm0IZjTJjNK5XF9lhILcjx%2FPiiMMGM%2BswGOqUBoYhGCuOysRdIecFTYIn6irCwbYRdQ7hssEExcPjcfsv3ZsVsxU0lPZjCrBl6kZA4nLaX8TQBkLbCVwpg8V8QZps90ojy8%2ByMpq3eDMqWeulqn6hghsD%2FlzR3lVf2%2FsQ4nzU3rcbh0F18uxbU09uGtvp448pLNywbBU1a0%2FQFLyw%2F2s5hP3ERLcKdRUPdHuF5fYsl1%2B55Ag4ZvlpVPwut2%2BmazU4L&X-Amz-Signature=3228b41d840a08b9934a5af5f3698612ea9846ba00fc11138f55fa8a104606a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLACGSOL%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCX1GZTum2JO6EZPqjcAizeC5AA2jwwXVIT%2Fp4y%2FthbdQIgayFvw2WlIi%2BcyIkVvJ%2B44OGLDByJYQDsEms3041tnokq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDC9b63953Oep7UGIaCrcA2REoHi9%2FhEw9PkfeKpadqyTu1QMkpQPK42grPQPnrCilywht0JKUbSOJUZOPdGsKVeNr1TuYVxMuaTRwDpQjyhUlkausC8fpMyz7u%2Fh1a4BTZ2FqEm6k63%2FanvtVgrPps9RGh%2BZzJ%2BQPmmZTRxKbCjUQSCmlgo415fXghvMbfR0m4G5ebumAhB7SYDFFGwSIA781nKKeM%2B%2Bw%2BaBuIMwgcHpECoT9Kq9bJ2ZBB26hNAhhZtUt0nI341FM60XgrF%2Fr9IEPzYe7lfJIbRr0KcBVoBS8qCLr8NdwcUTt5fGtHs7Ww9WgrETo%2FrS7H8tVUXS2h7l0ulivKGQ8Pk7aV76VTf6RFiERqPTqBTSt%2FBbO7cevvznLx0%2BpEkQ5pgGZCUXllRKs%2B7cKZy5PsmWVf3ILr%2BSwv52xrawp%2BOlj0ZOswXOb1dtI8dW2Fghssb6TRfKjz9HfaMUigDn2QQ3hVfeCOLPAz5D%2F9kLrYObtdAwP3nTukQ6%2B%2FO6GtAw3QIB%2FyI1p30g1BWT300qvVLknYgoiGtbNVYT62r6TlQFEKvjfjHa7gZyZ0SEc3n8oSJitjGx3H%2F2NE7HpulnRH2IBgwpcHfogNotHZXyduVm0IZjTJjNK5XF9lhILcjx%2FPiiMMGM%2BswGOqUBoYhGCuOysRdIecFTYIn6irCwbYRdQ7hssEExcPjcfsv3ZsVsxU0lPZjCrBl6kZA4nLaX8TQBkLbCVwpg8V8QZps90ojy8%2ByMpq3eDMqWeulqn6hghsD%2FlzR3lVf2%2FsQ4nzU3rcbh0F18uxbU09uGtvp448pLNywbBU1a0%2FQFLyw%2F2s5hP3ERLcKdRUPdHuF5fYsl1%2B55Ag4ZvlpVPwut2%2BmazU4L&X-Amz-Signature=3228b41d840a08b9934a5af5f3698612ea9846ba00fc11138f55fa8a104606a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RH5QNYPM%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T103717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCICOWPjAZeCHGL1CFcVTmH35DLcgs1gKcGuNE%2B9Y0lMaHAiAs3QbX67jf0LuUPR9retuNyoAwK1eZ0Q%2F9XI0TjMxNNCr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMP7a2HDH9UHc3ANUIKtwDj14w2w%2Fb5f53Qs%2FfszIe8Gp22O%2FIb1pHliya1pVMzYcjZlQN3lOSxnr8u4GyJs6sXqqXesyRToHGKl43jeana%2BATnRB1h5nyAJUNUR20J7hJFVF%2F2PagUOa57WsU2bB3yxv%2BqzfBQTCTgdCezeE0MGDvEgYLnMZX%2B8jlqnrU1PcxMwlmwZ3LbtBUI8C7vzTYO3jjpbaBJ6Z9ekkexhs9MH1zFJ2KAkyAaYrwTxHNFXozCtyWmT1L8uHbsLGPlLxP7qlEx4MkSplmgyxLDY76ucBe6fFz%2B%2F7Hzdx36ByCbq%2FEM%2BIn5Epi1tttQkGhV%2BSk1DtSICy0AruzH9i1WPGDR0bxEcavtxEM%2FHIHMhAHX54LI2Uc9NaeeL%2BDeWJH4iQiGp3oTdDsjzYlO%2BjxYv5o2JIHxN4qq70AOczsQV1vOOUx9wi0YWb669%2BSRyRxkSW0QuVIhpFFgI4%2FXzTQGdk6rSSJMobOlKLB7YRLeQK8qQI4qL33Hnb3WWZT%2BCTTZ6srKVKrh1XJsWVIHthjAHHHyVLv9voTdDHCdjLNGY1zLmneI1yFsWWT2L9O8MnC59x5PvHsXfUZ9ssBRp2a6e42jp8sD0E7M0v0S%2BDiN2luW%2FFZ5z8RZSZAT9dJsE4wnIv6zAY6pgHxjwPcFLpvNqylyRiz3l2ZgQE42mf5nwkxA0cGNIBrQ2QEuetYn0peZdwY1hcQpe3AUN2xkwDOoIR6A7mZfz8imJ8lFNHRj0afb1RnSlhtZHxaunZkCSIJoSnZ47RNNDOmsWQzBTvwxTgBDgDOcN9t1cq%2F688dlOOBpFVrlKWHaABJsIsQPPuIarXSTfjZlvgG03agcTahWeJXeJRB679j7CZQnED8&X-Amz-Signature=1914f7967f97b9c0093d75e8b7a4084c53a4cd7a3344927e64535544f0122b8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

