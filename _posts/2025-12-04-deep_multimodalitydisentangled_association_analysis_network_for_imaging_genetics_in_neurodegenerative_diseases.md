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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJM5IR32%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCLAshIAhGtxtJhNoTGyheqG1zfB9fBGIL8msWRvcEw2QIhAKd3t0bMdBT%2FaJsAzlAiVsgWtVN1aXQnLXiY%2FJoftaGCKv8DCCQQABoMNjM3NDIzMTgzODA1Igx%2F%2F9WBn8pAHBiHq7cq3ANdwI2tTUhwtCp3AGJ20fpyeW8CockRi133WYE6lKSrmUlH7hU3h5tpnhjndZ4TUVBSWXWxUENI39j5KEIoTvf9x9O3KlvlqeqnA%2BnZPxGqCBVnsizWuNI%2BGorpr6bnphoaZ6i%2FRC6vAitXd3Ov4cm5wQNaFS%2BBZ6FKLYFS7WN6RG3MPSlcbTCOcpqt%2FanosTbLEabqtPgV%2FzeQYsVP6tP7fH%2B3QZV5u2btnZF3RxiK8zNpLWl7T3MmnIw%2F8gkR4ew4IIhQ7sj4iCypkzkEhafC%2FvuYbqeX%2FuGzKSwsIYIT%2FPxGKAUu5xqiZTFzT%2Bq%2F4xWILlbifTn5MMqb66x0h2j%2B1GIY8RWGFbgHbnGNfHJwcoK05I4jRCyQcB7gl%2BtIVFrzqdSqUQHru%2B3%2BgPFD3juZXy6Gxgynm9wbuDow6s0IDoIgXWfPRioG4uTb6JRNXrDGo9XQADysGs6RI58oiy8HGvG%2FdYZIn%2B%2FC3xs2WE6tfnE3lbsW2fUkbedwqqI13KjfXCDdnC5Jv0KKBrAE5NrbQIqFn5fpWC%2F7rTfSDppoibl24gKAgcovHLAQSVZYewXdxXI621zQJqfg67901Lea9sdFvw4AnCgTxsSdtr%2FSPBG8ZrPLL%2FJQqnAXATCSqOfKBjqkAa1jzOtWNdxxwkt2Wa71BC4%2BUYfRC%2BiOn34wRrT6Kaz69o5Iq55fBuDJOry9mNoOeauUmp%2FUfAEsoWic1bmXNk179rCoUsPRnZnY%2Fk2vfp3BrEL9KJC5dHrb%2FhA332W3F9RmPckhz3VmLI4R5r5h%2FCeyYmdP4JnGR2ojTDyv6As8l%2Bsk35g63AgmIGrMLYNCBEKh8x7L5RmS%2B3cvJDW1Oc2E4ogM&X-Amz-Signature=b3e8dd5734f9f8cb8a88bd5e9b21336265cd4157e45f7bb47984a87c048ebbce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJM5IR32%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCLAshIAhGtxtJhNoTGyheqG1zfB9fBGIL8msWRvcEw2QIhAKd3t0bMdBT%2FaJsAzlAiVsgWtVN1aXQnLXiY%2FJoftaGCKv8DCCQQABoMNjM3NDIzMTgzODA1Igx%2F%2F9WBn8pAHBiHq7cq3ANdwI2tTUhwtCp3AGJ20fpyeW8CockRi133WYE6lKSrmUlH7hU3h5tpnhjndZ4TUVBSWXWxUENI39j5KEIoTvf9x9O3KlvlqeqnA%2BnZPxGqCBVnsizWuNI%2BGorpr6bnphoaZ6i%2FRC6vAitXd3Ov4cm5wQNaFS%2BBZ6FKLYFS7WN6RG3MPSlcbTCOcpqt%2FanosTbLEabqtPgV%2FzeQYsVP6tP7fH%2B3QZV5u2btnZF3RxiK8zNpLWl7T3MmnIw%2F8gkR4ew4IIhQ7sj4iCypkzkEhafC%2FvuYbqeX%2FuGzKSwsIYIT%2FPxGKAUu5xqiZTFzT%2Bq%2F4xWILlbifTn5MMqb66x0h2j%2B1GIY8RWGFbgHbnGNfHJwcoK05I4jRCyQcB7gl%2BtIVFrzqdSqUQHru%2B3%2BgPFD3juZXy6Gxgynm9wbuDow6s0IDoIgXWfPRioG4uTb6JRNXrDGo9XQADysGs6RI58oiy8HGvG%2FdYZIn%2B%2FC3xs2WE6tfnE3lbsW2fUkbedwqqI13KjfXCDdnC5Jv0KKBrAE5NrbQIqFn5fpWC%2F7rTfSDppoibl24gKAgcovHLAQSVZYewXdxXI621zQJqfg67901Lea9sdFvw4AnCgTxsSdtr%2FSPBG8ZrPLL%2FJQqnAXATCSqOfKBjqkAa1jzOtWNdxxwkt2Wa71BC4%2BUYfRC%2BiOn34wRrT6Kaz69o5Iq55fBuDJOry9mNoOeauUmp%2FUfAEsoWic1bmXNk179rCoUsPRnZnY%2Fk2vfp3BrEL9KJC5dHrb%2FhA332W3F9RmPckhz3VmLI4R5r5h%2FCeyYmdP4JnGR2ojTDyv6As8l%2Bsk35g63AgmIGrMLYNCBEKh8x7L5RmS%2B3cvJDW1Oc2E4ogM&X-Amz-Signature=b3e8dd5734f9f8cb8a88bd5e9b21336265cd4157e45f7bb47984a87c048ebbce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IJKK6EF%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQD%2FXtnkMkFSv%2FjML%2BklW7DXeS2xryaBppVUwQOpgmeFXwIgeypm8HBqGf%2F7hDLsi6%2B5XWmtqgNClkIih4LphzPLPNgq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDONdzt7WWRaKBd1FOyrcA1f0sh0ITtreHm1u0k6mjReeIpd8r8Y%2BWjIybNSslt2WCOKGqTeFa%2BiXrXizCCHExOYRbhUY7liuPIZh%2BfBpm5m3ozO%2BfkZAVCwpYsTikF1QkHhNf8%2FjRtw0jfnSq6gzhPMxWV9p6xklMHa7cWdNsh6j7ddWxjlCjNvGOY5LQuHl4cYEb079FGp0mIpOMV9dv7C8AvaZkSAWz2OYgOv36CGR4aiVOqCjeolI1DmZaTlQc6PUrDNGJgFrKAwHz1AN%2BVpZiUIsulFvIW6Fg1U5pfh99x5S1A2yeePmSdBbx9wch29sHKau5o6oWY8M1ATmnoZDD62Pdj3ZwWUf%2BbiK5KbXG%2FtC5YHyt4sHT8bCS4c5PZRH9VepsxTxz0PyffUy%2Be1BIN5zfxVaIFW2aP8HkhL8LcBeSx975TbKKVpk1xdh4AxwInuVZ8rvOVlwnMluH97njuxbc2oU56QrxVDwD64%2F9dXcc5Y3Efm9s8S1UquflzpSpK%2Fa%2FjusxLYSP1%2FTg%2BkEZzyJk1P3tkOFRQSzY0mUtqw437AjZVTy7k9zVg5po%2FXmSy4Eo%2BCzdZb61BvKaQsV0RDnOx3LUFtW6T0T%2B34ZEagYj9NmfsyHXMz6XDFQ9ZnhMMdwU55cNCuIMOin58oGOqUBzot77%2FBoR5qSw5%2Fa%2FzKZQ9jd1MQpIQpaoSyyx3r%2FjoYmRPUuuHd9B5qfBhAktJLQq%2B5zqQOtlTMh1DV7ovBQhgvPuqzRst3pPMfnuLVQ0wB3xxOPzgpJp9U4N2GmCqza%2B6boUwRBtDHtEPYQQswQd4gWL%2Bz6FqBN8ghytFgd2WV6nE3yv%2FeMZHOYpfNVA4zAer4dBoYXqDGCoHyzs8o0A8z%2FmbAp&X-Amz-Signature=b03ea2039dcb074c4868529aa7601c59064af9c14b29cdcbdd7b38a6cb272f84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QGKEMYF%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIAmb0ESbjY%2BK4qfSVc56%2ByZMdTXAfgfQ%2BL5oij%2BLmoqqAiA6SPYX6deMU%2B8hUGNdMyO9Iav7sQ8CqFk2CkQ%2B05zvwSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMJ%2FqTLpZshK6aBpHZKtwDJnZm0gqvk3zLsdyd0jVx0IIWUdqENm0olHm%2FW37WKfK%2F5eTEZRmtp943oYOyhLtZiaeF%2F5yhNsW3%2FKqpq10UjYE1CXMa6t15ttTL0u74a3EzEILR9AnYiLNM8kbih%2FvcVWTTX1MeZpNZUjvsSqrPiXnQiTV5WWSKgd2Adx2sN7xkNcJVNfvBQjNaauW9ZBWYjhvYjGiAdUQjw8ACmI4N2HXiOBo1MsTBSMW7y%2Bs8rRexTw%2FTh60ILWod1sqfj854JYlY6BC4aDEan44jSyrcpBedlUaddLug%2FRMt5N9q0Uq5N4gMLA8qAXxNmAug3SNk%2BVKTIHoKXs1Or5Ld%2Fpgu9WDkUO7oEbt3w0rip4Gd1HY9av1M2Y1hgkMvxWpgHqHGl%2F93S5lPWrdJTj8Uy8FrvMxny%2FNHQBYsMyhfFrm8NW7rnC7slEQ5Hb8QtdDaQpN%2BnhZRyE7ItTEc6SevFceUVl58yIkfN2sIVGGn0YQiZZzzAzeZxZc%2BNho3jDPNmshm2weviHqbHEezojVOUo1yOmEcgirbq9K2%2F0dYUFTgD7ucUiaJjaI6fVXFZuhxDBOUSfkDLpjDHYRGxJJJMN%2B9WVmLIWt7Rz3kkfIg4ADC%2BdEHAR7beJC486cvINMwgqvnygY6pgFjkBX9QbTS9HHM0GuSddFXhyodwfjIbTKIbWjCtJfO1qkIe3WG9Xs1%2Bd7zkC6sS6O%2FOd2e962at1IYW%2Fq0fxLlY6rCNSgj5iQoF7c0b7kYNdOfDWgmKlZYzOUECSj8mBrOenXwLHlJbOyQ6iKUCxmvSn00WBZIvkCMJcyGNCeBmpptmy912OVIOssybUlwMxHPYlQ%2FIh3%2BUqmoY1PmccBAEeYawg%2Fx&X-Amz-Signature=2d588b38805407b2bb67c4f6fb8f147bc6d6cdc0e157e38d2ee737e4b0dc7dfe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QGKEMYF%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIAmb0ESbjY%2BK4qfSVc56%2ByZMdTXAfgfQ%2BL5oij%2BLmoqqAiA6SPYX6deMU%2B8hUGNdMyO9Iav7sQ8CqFk2CkQ%2B05zvwSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMJ%2FqTLpZshK6aBpHZKtwDJnZm0gqvk3zLsdyd0jVx0IIWUdqENm0olHm%2FW37WKfK%2F5eTEZRmtp943oYOyhLtZiaeF%2F5yhNsW3%2FKqpq10UjYE1CXMa6t15ttTL0u74a3EzEILR9AnYiLNM8kbih%2FvcVWTTX1MeZpNZUjvsSqrPiXnQiTV5WWSKgd2Adx2sN7xkNcJVNfvBQjNaauW9ZBWYjhvYjGiAdUQjw8ACmI4N2HXiOBo1MsTBSMW7y%2Bs8rRexTw%2FTh60ILWod1sqfj854JYlY6BC4aDEan44jSyrcpBedlUaddLug%2FRMt5N9q0Uq5N4gMLA8qAXxNmAug3SNk%2BVKTIHoKXs1Or5Ld%2Fpgu9WDkUO7oEbt3w0rip4Gd1HY9av1M2Y1hgkMvxWpgHqHGl%2F93S5lPWrdJTj8Uy8FrvMxny%2FNHQBYsMyhfFrm8NW7rnC7slEQ5Hb8QtdDaQpN%2BnhZRyE7ItTEc6SevFceUVl58yIkfN2sIVGGn0YQiZZzzAzeZxZc%2BNho3jDPNmshm2weviHqbHEezojVOUo1yOmEcgirbq9K2%2F0dYUFTgD7ucUiaJjaI6fVXFZuhxDBOUSfkDLpjDHYRGxJJJMN%2B9WVmLIWt7Rz3kkfIg4ADC%2BdEHAR7beJC486cvINMwgqvnygY6pgFjkBX9QbTS9HHM0GuSddFXhyodwfjIbTKIbWjCtJfO1qkIe3WG9Xs1%2Bd7zkC6sS6O%2FOd2e962at1IYW%2Fq0fxLlY6rCNSgj5iQoF7c0b7kYNdOfDWgmKlZYzOUECSj8mBrOenXwLHlJbOyQ6iKUCxmvSn00WBZIvkCMJcyGNCeBmpptmy912OVIOssybUlwMxHPYlQ%2FIh3%2BUqmoY1PmccBAEeYawg%2Fx&X-Amz-Signature=f3a82f1de2670d9f4e991c9ebe1ea6148149c98d8b1e7a9cef7462453270ef91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YA7TP4OY%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQCN7w6bGe9TzFcP6AlE%2BgjaOf2ABUENp4lVyIxLfbe3%2FQIgSbneWAqeZuItCVyrCClID3WI2YBgkqEWiFHA7HC4waYq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDGLqhxkNPZTXA%2BSPVircA5vsz%2BD3ft8J8lvN5eFoY6mEYV%2BKaZUA2fSIUOosoztSp31DUFM2B33Ej9tQcWLv6lv%2FYwKcxmDzkWlLTh5MbjeVurrbRCnSLO%2FYBSfPpkfJdqN4OUagJCYymtFakIGdiaxi%2BghAzfFcWQUQXekpft4EPr9ifB9Irab1SsKBiA7JI22gfel5QaZBJ62XfHLYlkkvwCzR13SLF9u22rWvf6eAogrrhPst6unemZkYPNYYO%2B0c0RJrM1qkz3XvoTIxz3QoYPT%2B7jFrFgSIYuiMyEqHudafwcuibTfkjqGAtmh85wKCkGgCvnNzIezMyzvfVCF%2FdY9OiHW5LWQItLhY0j4d9TW65CAdRqF%2FTiNZK9G3f%2F3NJTVRVDGqwA4yROoF2BrNZrgWrmfqvQCS%2BKbaaIjUpyrFDEOUy%2BzGR0qfyy%2F0xaFAZPORpT1va%2F6EQnVzQAzwWxWEgUkEcM6odOe93eAOVK4HKnZDTc0ryFS8zf3NDW6wo8%2F2VvrI01VIhJxpYE3PlOUCPVpzaJLKSKPxfuvVwfp72HvD%2FD84NDxcSB%2B0KYn2ClLuz7xFngp71DF1QfeXKBw8UdFFYA32zxamv1PdJyy7XofDhAUhOo8ykcHlFeeERsc1FVuzIgEZMKWh58oGOqUBXNrQ%2BqVr9aZ8T%2BRbQu9B9pM0hOMXWTiXZRrxIb1YQE6HEUrc9ZS3jxRn8mvv47q0ZdwqLaQMNtW0YNHCo35VtGwDqFu0KMMnklZmpzFJGBPwH%2BcC3H2HmXxTzK5aYIJKKbhuHaH2no8MPy1KBW6GLdRosvmXZLWVa5k5KGaMGItkR%2FjvZLBR0aoKa2JHQLaSup7%2BDVKMhQ9OC7n5CdeR3CE%2B7rMI&X-Amz-Signature=84696fe5d37899260d54a0309c9cdc6946f08006debed3631df86937eb8748e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAOB7NID%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIA3YTooilPxzfgczURzU0P1PeJk3VMPZ0AaAXVT0tlL5AiA56BWASqfiz0uzzGIhX%2Fj4qi1YZjJ3LckC1hOdaEmjvSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMeEGotpgboIxGXj4UKtwDDK05Y70WDOFUV8kvKVwc5hBVDWyBOmwZX7Syam2SrdaLmExnbtKUtaySovc6mQNuDoEI2mFVwsl4EaZSW%2F8fdWS7jfqjU%2FrD%2BjgN4POXrcwJYac0SbK54nQJqhNiu7XAh1sc9bBzKwlsv0Su9kELNoIpj0a7k9H%2Fv5SQ34Z5%2F4ry6vyNaIQv9I9gOgSW92S3aNcJUSg454MI5ABlG%2FFB9v5sMxj9gyAVclVveS%2F03zhkhyLI79u0SNAls3IbCthnSV4T3nRTXiZbq1bZUxTVYg7Mf3beEnG7hEA99ZyIZRsX6v2Vgf4xOH%2FJFfxWK8xNwD8rcZLUISfnmaVl2kGTINejsHoXk4byhJyxJcJwelU7MvcHnSFlVOShx6Xm9SSeuZDOnSzmRXjak3N7UXUGxnsDOJOLeT1%2BztzimKWTCzY73KV9n6g0LOrNfmyRcHFLBiLLgxjh1X01EpQInWD7XX1fI7xs2xyaDXzStoNSXB%2FSxOUowBFtonvKDyiFzqh4y2ZojjwIXdzoA17OY7jYCeN2uVze%2BMyC9jh2wfhuKTpReYYapEp%2BXj6ZsbQBq0iZY1hZzCfJ8jPHKGPmueOwujJvDIecFVBPB3o1crKtdEhiDmmMvqMaD0YPntYwyaXnygY6pgE96YcSR1mSLGkdnQWb2cUZfSbqzfqLT%2FT9YqXKZcJ9YUq3fg1BmCRB3ADYptfYt1ITx3SrbchsbLJaSvQ2ZZ06qWAY%2B464Ou3lkoRPyjOUyxXXB8BYDoWm5Gmp8OCkzNFOoBS8gb86SrZGaBP1nbAYqPDg0rkOX78jeR5YnNGC3W9nBGqrDOm%2Fkfge1QBdUJ%2F%2FmuhABdIO%2F49tIIF%2BtzBz0qLZEBt6&X-Amz-Signature=256e2e1d6ff5bdc526712d90404ba907af9c60769e4f12150f34d9087cf99731&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UL5M6I2C%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDecl9ZGlzrLS7N1BcCi8%2BwBRfP5R%2Bjhw6rJrTV7XVUjQIgZtoeq7vSEaooup1ApPhRq5Up8UCi99uwX5cNit1DXN4q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDDqREJ6sngCY0N%2FgFyrcAwHLvBl4ujNwHcDVSc6z3oztwAT7aTSN46346T9JtuIpnwOrCtJr0QKBOOScpEUfcHf%2ByS%2FA5dhY26EOUChh1aL%2FJ0WnvhZ6m4rmcisbG%2B60Mt6jkprlzmG12OgP7mwPi7epSe5DqzHaOamKx%2FQ7cSO%2Bfr9GO8BGB%2BsbuWvJ%2Blm%2BQMKMoOR3JV5NzheipHQnQI7Bu52RaznVImnGx3m%2BiM5gfcepN8qvi9C0M59k7cx9cUXcTy5aPVkjHcQTHgdKOEwaL2%2FIykbqQp7O7fLmoesd8dgJJHapKhfCUMWtrwgSq5%2FWbsZjdqpKMZeTzmQUwCv69OkAW%2BN73bFRDo2Hq9OZBRxU%2BBHz0G5kIcUwRTcNxujKEKq4o81oExnl6YpT4FTFYtrcFX1xu0zgrZ%2FmSc48bbghDDH16YHNoGOvQuWHP3jOEFOA5ntzT3Der%2BdyA61fhk5vCkOgCXrpkJfppI63sHstK7gMfk32MSy61qxe3fO4rOOSCcwL%2FRZzKjyFjKVmM6nwM8B2xAXA7zPPAt%2Fuu6mZbfC41t9TKDyGQzb8VHl3S%2BWmB6DM1ssaiSMHDQfJpPpRPDWJcO2ANpbkeH0ydVdTFA7iWEbA0%2FaJZhM%2FS3v0ic8Xp4VSAIb2MImj58oGOqUBIKWKmclkjoFjJ3LekUK6H1rsbmTsV90eTS%2FNzY09%2FX6YG6u1zJzcxdD0N2kaTn6EaDCIHQ9Qv9J35X%2Bmel1tmERGaCCXdFh6mNYnnvoJ4bQJj77ji5TXdCj3Pn%2FKUjwzK%2B%2F1qYTn6yf7pKZ3%2FxUAQbM6MTbCjV1EDdyuvQtmWKDd%2F6BmhyI9mOGVISJn4F5dcEQ2yXB5XItw96mWk0FvShmpPtsh&X-Amz-Signature=b4d493e4bf5a578a76c727361895806574ee46b95a5a5802c474f4149f751a13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WYXXXNI%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIEQ7WzSEoOJPLUgpNGgfn8ATT1Qwj5luYAIzcVeuBBfoAiA3lur1IA5MSl%2FWoIiHznA26vK0Jdj4%2B%2B0C8eFTL6AupSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMCXMHcWGHKX8RnbLTKtwD6M664XNnmcHzCJfydBMYt44KtiConkvp2jzW3WzYLBoNnTMJDgbkMbhJvcstBaozyl4a6gpszkBuD0DOc3Hc1EnNcw9scMPJQvJxb0IWh5S36wmBps%2F%2B%2B7I6NfTgyXf4UQcwYqk24sP7Kgh61S810FEfpFc%2F%2FaBg4Eqr7xM41lKr7rDrFNT%2FLZXsj6BodzYrgNcsxAwC2xL4z%2FmGWmmIV1aGkCztUk2e1%2BCeNJf6arVRsvivKt%2Fhq2vBPRuUO6Um4kD%2BKQ7zWYcsTiCVss2f9H%2Ft2HwMGqZluQGfsMbKbgzbd8Wly%2F%2FpqNh9qBI77mrZ%2BDv3bn%2BhDWTcwVYt7T%2BoedsAgvyrSooh9WICt2noyRKxLLJiMi9XOfZQex9n653lWIhWDqRUtUXbY2R6oPUqIYLIBubjhymC1YbwbzLNHq%2BhQdUjd41fIw%2BPPJFHZU8%2Fz0uII9FlEr8N3jDhd8uWbfPB%2FGLI4PcBXONQ8uMSsnHeD5rIKAcQlSJJIXBgrWRggNBvJYDfpoLqUUGKxfHxrNP2HcEHZyeOQgQNJx0GwyA%2FZpOLqzZ3PfRnEGDp6PTNPYIxFuodNA2mVfD6jlk%2B4r%2FTj5hREUejxN8UASjv0m68%2FQEciJJOKxQc%2B%2FMwyqznygY6pgHFgQaZRtEHn2cGdzRr3epnk%2FHrlLOxDFM%2BetwKSFkpv9KZrqm6v20kVKBTPuJC2539l2YJ43DfbnwDqvH3vw7VCnqJWjLwQnvE7wzqHTLa8qzoy2OBT1%2BIB4uJ%2BGs9r1q1Xj49srf%2FxhgeYCzdYyLD%2B6d0GrXG6ZdsdNlqywuhYZdDlnmbbuB3bcgERv%2BfmBiiNszxcu2N3vGjAVsCTl7YwsEWX%2FUQ&X-Amz-Signature=460dc88da4ca922658f9bb282bb087018a3c68becbac30bb5da9de5b036c103b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WYXXXNI%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIEQ7WzSEoOJPLUgpNGgfn8ATT1Qwj5luYAIzcVeuBBfoAiA3lur1IA5MSl%2FWoIiHznA26vK0Jdj4%2B%2B0C8eFTL6AupSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMCXMHcWGHKX8RnbLTKtwD6M664XNnmcHzCJfydBMYt44KtiConkvp2jzW3WzYLBoNnTMJDgbkMbhJvcstBaozyl4a6gpszkBuD0DOc3Hc1EnNcw9scMPJQvJxb0IWh5S36wmBps%2F%2B%2B7I6NfTgyXf4UQcwYqk24sP7Kgh61S810FEfpFc%2F%2FaBg4Eqr7xM41lKr7rDrFNT%2FLZXsj6BodzYrgNcsxAwC2xL4z%2FmGWmmIV1aGkCztUk2e1%2BCeNJf6arVRsvivKt%2Fhq2vBPRuUO6Um4kD%2BKQ7zWYcsTiCVss2f9H%2Ft2HwMGqZluQGfsMbKbgzbd8Wly%2F%2FpqNh9qBI77mrZ%2BDv3bn%2BhDWTcwVYt7T%2BoedsAgvyrSooh9WICt2noyRKxLLJiMi9XOfZQex9n653lWIhWDqRUtUXbY2R6oPUqIYLIBubjhymC1YbwbzLNHq%2BhQdUjd41fIw%2BPPJFHZU8%2Fz0uII9FlEr8N3jDhd8uWbfPB%2FGLI4PcBXONQ8uMSsnHeD5rIKAcQlSJJIXBgrWRggNBvJYDfpoLqUUGKxfHxrNP2HcEHZyeOQgQNJx0GwyA%2FZpOLqzZ3PfRnEGDp6PTNPYIxFuodNA2mVfD6jlk%2B4r%2FTj5hREUejxN8UASjv0m68%2FQEciJJOKxQc%2B%2FMwyqznygY6pgHFgQaZRtEHn2cGdzRr3epnk%2FHrlLOxDFM%2BetwKSFkpv9KZrqm6v20kVKBTPuJC2539l2YJ43DfbnwDqvH3vw7VCnqJWjLwQnvE7wzqHTLa8qzoy2OBT1%2BIB4uJ%2BGs9r1q1Xj49srf%2FxhgeYCzdYyLD%2B6d0GrXG6ZdsdNlqywuhYZdDlnmbbuB3bcgERv%2BfmBiiNszxcu2N3vGjAVsCTl7YwsEWX%2FUQ&X-Amz-Signature=48cc433fa17ec88ae2081e4149fea2452d368fd2aab1d923f84423db3618d5c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QPJZ4N7%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIDTRZfC2gBCqozSmyvcGG0B0Aqf0qfSLVNhZ7D%2BOb8XfAiEA5YmwBKjFN07nqJj2bT%2FhRbMmuoinklFCNuaf1HGwUf0q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDCg19lBHqII%2BCVCwmyrcAxcoBJ2cWndyyx8shIIxnLiFigrl%2FKOUHevjrEpapPKvi7OgWQzbotp32LrmGMDRSylfcE5AreB6HDOhvkX5XETid1oOLHfcKGdYvDZ4gZY3G87OAtYYl%2FuRsZ3W8nbYhP7p4rk096ZYUwlRJk742%2BulG4WFQFxmtavroIp5uiVj8bhtpZM9sHCz5iDvXZDB3swa0fZar5wspH5xi4sND2ilfbhgC6H5ZRVieiPjFHg78IC2HKloJY36Is1FrKK6xffLQcfJvkwJwCBqUm%2BwkAaOTm5e8OFIZAuMJFsfVbA26UrE6UFteL%2FXmgvqGjnrKhT7Q0emeEL%2FKiQ8m4fm%2BURh9O8eK1G01VdjdAZcmxiNWl8%2Ff5BMQvqGh%2BzxBTjIfi9txLsSla17vTl5A%2BY2DoYSXeMHnwF4YcZDESVt0u8AJvfanJh1Uxh5D6z4mluO7eN8gJvglJgVZvF3onPWFPOR7Dv6VpxSaIS%2FiOLU6bZ8AQG1%2Fz0u%2FjEB%2Fgvg7adB6yokR513CAG%2BHzb7D62n5qQuBlNnjKBr%2FiRfZWp%2FN9YHBs7%2Bfexr0ezDlPFcBx5J%2BhXXXHZniv%2FEjtj2IzjU1nKIE6bHpiqkGYSeO1EAJdg4mXVXuZDJjNR6NQn3MPem58oGOqUBKzsDFxmFfPUGBqlrRDN2Ygell6uLi798yMORTe54EHUy1SuJwrBSNs5%2BoJCqonA5SukFvvPWzn3hLGwiYFODFRwCsi8%2B2LBCvBr3yNeb4V0MYdzrEEEr41R%2FztZG2QmnwApqVIEdZ%2F5wBJcAPBrmrJsF4Ml1PSuP9olmY1L3gqhFeP2E0MPyOH0L76KqPX%2FbTZVmenOZQm4a21IW%2FA3q2oZBxl78&X-Amz-Signature=498426239aa7f6d8cdcdd7b02ac034ef06d97ab88127f4aedd26ef4cab3a2a9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHHKCHKU%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDXc6VrbSwef62jM1Ht%2F5Z3lHrzta9tI6STgdnR%2BgJrXwIhAOnhw7%2FOBTZozX2nGuQAXM3GlEUtanD0dz2KqstNloXrKv8DCCMQABoMNjM3NDIzMTgzODA1Igw6g8oVYAs5YSdAL7sq3AN6vqXW6t%2F68m2cnXuY4qAeopTFK4TNSNyZTWm%2FbEGM0EHiCKVsVDFVjq47idduA7UABd6lFXQ7b4a9qLgW2iytABNudinmvgivbbrq8860EQChRiN2lB83%2FDDVPXoP08hALBeTb%2FfkS9cxyBc9l0r%2BXT67CbRxtQvhXUAoSkkEiy85BruScjUgUmdxdsO1N%2BIj3SoTlm8Nu2R1tCNdrPNjRJPygE34J4Y2D1M2zPWYzJ%2Bg6qnlhehNV5CdhOnxnqVm6youQmv4KyGI4V1hQosHjpV7TVNizFxcJ6N43qPQ43wi1%2FcEpoeUIx1t%2FAX%2B4oIagpbZxMSjlLtTYm8FlzUsatrLa%2FHqQl9T%2BsoHLpUBk3PH0t0gAxHEJRNsTYaUr8EwWC9yDsLwgMNhNqr56B%2BjgO%2FdTdKXhZIs6JuUH%2BMvCYlRzXqZtMjqIVqO7wnNbuZjE%2B2A7SDwBabtpnjbS3rBXTGlvKwvTt69wkQbJEECf2OcmsmPLAWPp6jxubM1i0sJwUpcWhQB8A7OacRFTFp2Nrkg9swKNSgSkMEU9BdacOzmjp69A7m4KykqIQ4cDcR9XogPXbqzoFsU2ku8mFznqKwaG4mq6Mjrw5nbHttpt33146ZJwigehXd6pzD2n%2BfKBjqkAUEuOySPSjJb%2FtsuFFJ8Dsf%2FtibdEKB3OMNCY%2BiBZYFs8mtJkPktzfXvc7h4j1s8mVeL%2BqwS3j9bPZXQsgGAkav59O8%2FEyr9R5ZKBKga3RDL%2FaWSctkd2Eo1dU6wZsLT9apck4vLzuOGSj%2FDpQjZyDlINfZwLHQndcTvelzy7aGeoG1qKP%2BMDXsomKHGuS7C6VdDwPRIruWfZiIei4WPVqicqf6p&X-Amz-Signature=3013a61a9fd473e0a75b62d19578266c7016f679d8f8e9b954f780d331a32e77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHHKCHKU%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDXc6VrbSwef62jM1Ht%2F5Z3lHrzta9tI6STgdnR%2BgJrXwIhAOnhw7%2FOBTZozX2nGuQAXM3GlEUtanD0dz2KqstNloXrKv8DCCMQABoMNjM3NDIzMTgzODA1Igw6g8oVYAs5YSdAL7sq3AN6vqXW6t%2F68m2cnXuY4qAeopTFK4TNSNyZTWm%2FbEGM0EHiCKVsVDFVjq47idduA7UABd6lFXQ7b4a9qLgW2iytABNudinmvgivbbrq8860EQChRiN2lB83%2FDDVPXoP08hALBeTb%2FfkS9cxyBc9l0r%2BXT67CbRxtQvhXUAoSkkEiy85BruScjUgUmdxdsO1N%2BIj3SoTlm8Nu2R1tCNdrPNjRJPygE34J4Y2D1M2zPWYzJ%2Bg6qnlhehNV5CdhOnxnqVm6youQmv4KyGI4V1hQosHjpV7TVNizFxcJ6N43qPQ43wi1%2FcEpoeUIx1t%2FAX%2B4oIagpbZxMSjlLtTYm8FlzUsatrLa%2FHqQl9T%2BsoHLpUBk3PH0t0gAxHEJRNsTYaUr8EwWC9yDsLwgMNhNqr56B%2BjgO%2FdTdKXhZIs6JuUH%2BMvCYlRzXqZtMjqIVqO7wnNbuZjE%2B2A7SDwBabtpnjbS3rBXTGlvKwvTt69wkQbJEECf2OcmsmPLAWPp6jxubM1i0sJwUpcWhQB8A7OacRFTFp2Nrkg9swKNSgSkMEU9BdacOzmjp69A7m4KykqIQ4cDcR9XogPXbqzoFsU2ku8mFznqKwaG4mq6Mjrw5nbHttpt33146ZJwigehXd6pzD2n%2BfKBjqkAUEuOySPSjJb%2FtsuFFJ8Dsf%2FtibdEKB3OMNCY%2BiBZYFs8mtJkPktzfXvc7h4j1s8mVeL%2BqwS3j9bPZXQsgGAkav59O8%2FEyr9R5ZKBKga3RDL%2FaWSctkd2Eo1dU6wZsLT9apck4vLzuOGSj%2FDpQjZyDlINfZwLHQndcTvelzy7aGeoG1qKP%2BMDXsomKHGuS7C6VdDwPRIruWfZiIei4WPVqicqf6p&X-Amz-Signature=3013a61a9fd473e0a75b62d19578266c7016f679d8f8e9b954f780d331a32e77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VM3BIYQ7%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T071200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIHXMOKNjEACL%2FR6QUzqAG9XWaapRVzMjLegamee23RYBAiEAmNszxaxKMhEJUtbDHoUMYD%2Bbev8JBYougJaCN5DQY3kq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDLkxotDDnCwX4fj%2BryrcA2BKKRgW%2F1l%2BGBwKwOBHWeqL1BFSjfhaWe55FGe%2Fqhxrzi1rjd9EJUPmCdw1ewqBaaq70ZkuHwejIWVwXJGSajomQnM%2BgIfopUXSZgMTZEMT7irkyQqMcj8wf%2BIGhESzr1MIcsAKrG7Nyj4IjquPUiuLlD20Sb2NVhmVUQkBi56vfpnwt2YHpuzdR7xVtP84r2v926UZCsP3XCqvKPNzR6jgWv8avmw6sKlKASxND0oWkE9qJVF49osSJZv4P17bd95OPAnUHI0OiprOSFSPr1B905xMLE4ZTrvWan7%2BZIHY2ExIrLKEwuJ7Dh3qllJVUNgXlbFNGbOmdwbta1I3%2Ft3%2FiyrcO%2Bi43AJ9ItRLiy%2F6camx5LCHlXe2E031BLiN%2F2uJIYJ0Zsm6YpfVXYBYX13UfV8Iy9M7UGaCO%2BOny2Q%2FQivfq084sIU5hJSD47tVJTjRNVYWRiC%2BTJvO1r%2BkyMFF5AkPgyl71fV6s2gFscONRqzJdNqNJwRcZRwM9VRdF%2B202FDQj5bDetqsHLfMcO3Z9YLSssvt7HFPU8vUH8dzD1RcA0jGldd2%2B8V5qK1BbxtAAW5Yfllr%2BqGboohCBzk5sgDT0ZKWXfA7%2BIMxDq7WHt0HRJayqeOUpZrmMMG658oGOqUBpQ5gxwuioRmge0B6YThvy6JuVlVTVDcxGHTxDBZ80KKMRe2LmXfrtijhdCxJOgDNigRHgFd2Ka9IR68w6B2y5qXMj7gB3%2FhTEU2cRiXxiquy0On5LEg4PBt0N%2Fj0jaL56vfdvUtvdMaxdjck0UZ4i0Mfd79hSaTo8%2FW%2B0%2BkjLNboLEhpWBMefqNtvVOxpU%2Bd7kRjBayo4KjGRTJkwQj%2Bij88lpZ5&X-Amz-Signature=a907d2dcf1edb823cbd4d8b3e15c605f46e3875ac33a03992558cba861310805&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

