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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7267UI6%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDeCnd1bpQsmU8lo4pj5fvUTwDegDBmIbJrUrEMj7j7QAIgM2LQxa71BMlvU7ZOwhRJkjDqp%2BIcqOMCL9T2NreDDrcqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLx%2B5m7DGWSDmZ1pmCrcAxipbcDXpdnR%2FzlgJCrrPGoiPCem5Vp83vxNXEtuco86E5SfHPySburCFXOK3XlSuSfVvA3QyW8Y%2BNWTXUnp85RnbCg9K8hNtDSbI5vFXMS%2B0uEk5qR1kHkwLMpP%2B0MjAf5TLgreLM6zUBn9vQkoAnmJLg3hSz%2F0hHvGiC9cAx45HR9VlU2z6Eh1ON8yifxolHiOj%2BjvIbBmMQJOGWOXrO4Gry6ozHgIrE%2F6BXKarE7%2FKA%2BJR%2BlRekDFyBQYcjIrqmc4iIn91h11g%2FSn8AxzJucBr1FccQKc2oulYCA9hXeol5otC7RXBo%2FLpA%2F4MT2T6lmMLfafc%2F858Az0PWsBWvkxC3hb15K1RHxaDQmr%2BSUmDHAAjSXctOoGidfDn1CDJjCZvyM7URt7SUvyR%2FtuuCkRZCDx7pXJhNU1GvkVMxzvR%2FUTlkAuMZSNLUamkscMczQt22NARwTM4Lg0ZEHNig5xt8vDGdMGbv3WrQ4URYvWFx5uM3u7wDb88VIflnCg0cg2ANvSZQCJ0YcO4T2GAR2XL49C2KIH%2FqYrJZtxb3E779rjkXnLe91sspiHsxd5N8s0EBQy2J6VbP%2FHvW8T6rWNNL6ANJ7hg99FD1TIOrGJ6Y%2BgZGXc%2BplJFbyjMNDh1c0GOqUBo%2Bt93doq2562pIEVQqIgfLjzXIjdkCuzPN8B2%2F2qdxV8wrkVCmcGd3Kbo0umY2gI11k5Y%2Fj%2BO%2Bld3JRO8VM1rR5GWI4aVDLO%2BLCvAD8mT6y5vbMMuXHKSH630YgA2Nl6GKey8rfIcl3J0ktkHpvR6DfnCy9C%2F7ZkjOj5L0d9%2FNJIB9smnNuNqzFvg9d2qik4cHibCTf8UtfwQbniYvlZXUUUJdkU&X-Amz-Signature=931cd4c32efedf1e8bc43f71fe9a8f46d043699f350767a4f6f4e9d5ac3c2be8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7267UI6%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDeCnd1bpQsmU8lo4pj5fvUTwDegDBmIbJrUrEMj7j7QAIgM2LQxa71BMlvU7ZOwhRJkjDqp%2BIcqOMCL9T2NreDDrcqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLx%2B5m7DGWSDmZ1pmCrcAxipbcDXpdnR%2FzlgJCrrPGoiPCem5Vp83vxNXEtuco86E5SfHPySburCFXOK3XlSuSfVvA3QyW8Y%2BNWTXUnp85RnbCg9K8hNtDSbI5vFXMS%2B0uEk5qR1kHkwLMpP%2B0MjAf5TLgreLM6zUBn9vQkoAnmJLg3hSz%2F0hHvGiC9cAx45HR9VlU2z6Eh1ON8yifxolHiOj%2BjvIbBmMQJOGWOXrO4Gry6ozHgIrE%2F6BXKarE7%2FKA%2BJR%2BlRekDFyBQYcjIrqmc4iIn91h11g%2FSn8AxzJucBr1FccQKc2oulYCA9hXeol5otC7RXBo%2FLpA%2F4MT2T6lmMLfafc%2F858Az0PWsBWvkxC3hb15K1RHxaDQmr%2BSUmDHAAjSXctOoGidfDn1CDJjCZvyM7URt7SUvyR%2FtuuCkRZCDx7pXJhNU1GvkVMxzvR%2FUTlkAuMZSNLUamkscMczQt22NARwTM4Lg0ZEHNig5xt8vDGdMGbv3WrQ4URYvWFx5uM3u7wDb88VIflnCg0cg2ANvSZQCJ0YcO4T2GAR2XL49C2KIH%2FqYrJZtxb3E779rjkXnLe91sspiHsxd5N8s0EBQy2J6VbP%2FHvW8T6rWNNL6ANJ7hg99FD1TIOrGJ6Y%2BgZGXc%2BplJFbyjMNDh1c0GOqUBo%2Bt93doq2562pIEVQqIgfLjzXIjdkCuzPN8B2%2F2qdxV8wrkVCmcGd3Kbo0umY2gI11k5Y%2Fj%2BO%2Bld3JRO8VM1rR5GWI4aVDLO%2BLCvAD8mT6y5vbMMuXHKSH630YgA2Nl6GKey8rfIcl3J0ktkHpvR6DfnCy9C%2F7ZkjOj5L0d9%2FNJIB9smnNuNqzFvg9d2qik4cHibCTf8UtfwQbniYvlZXUUUJdkU&X-Amz-Signature=931cd4c32efedf1e8bc43f71fe9a8f46d043699f350767a4f6f4e9d5ac3c2be8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL4BRUP5%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDgosziCKsTrVXX6eEWUELRgXSVdaoCIaYBLKt38yvdnQIgNAC9wQJWxVM6RYrovwY9TsEr8x0iyYfLMyYls0CAq4AqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF1ASAcUJyBGpR3gDyrcA%2Fq54BIYqApoAj2PnAgUxCe76H6RXguIcslSWSvh3SGz9Nmi1WiCTi1qUQwGkiD0t4nd21UC7BsxVGf0Q1goxVfjB6zKokG0zaZXTNxf%2BdZTJy5%2BJA%2FSlbP8rHZnGBucAw7RBl4%2BAv0orJumgvqNxyid38fKjnYkMZrrw9%2FbgPWWiCwol%2FNMepCdVceTTOMHXKek2s4Av0A30K5nXoHhlo6QDV%2Fkw6%2BbFNt61GPq4Ds46GSSM71XzPTIfv2hzvyZTiRSK%2FxKLkJ7CMtxZG4U%2BgwtNBNmapdb9bVAGwstpAhq659c5QOmEqBgWRocHUDr1M6PH6jw4%2BkIjOIiOOqhfN6Mm88WWOIJg9uXvJsDew0gTvA%2BAq3gIwvJ1nrj8yfm8%2BhcvKVh%2Fl4sbO4XNqEuKOBNUFIBKOAmgpOWEd9E81DVpHmZcJBlY%2BBC6%2FcsNemettU4LIZTi3jeO9hV0%2BBafsD0UJYe9odAMdVyM%2B%2F9sc5AULEeyxik7deJm8EK5kHaejmrgDPCEJ%2BmsdezrtH%2BfbX6jXoMcY6kHifzFHb6Tvsd7Ijew4vm%2FRIXBm18AtAOhHgl0b1oevTpLZ2rbJvJtDEgz7DWlkFynEFBP74z9%2BnEmfdAv9YlBefZ%2FAGCMNbg1c0GOqUBQC7WgcKSSrtXe%2FKWZEbZBR3L%2F8ml3fEhHHpViRym6%2FF2Is4fmxAHREwQox7jxsg7trtNEZJXo9w4CNIKp1RkPG9P5fvMOXh0Eq4pV291eRR6kWiWurSlqjZCFabRK6%2FS%2F%2FQIDJzw8hkFYRCObtYz1wC1dwql9ganZvAt1J4K58z3irJsx2N%2B0y5OhoPkGBYWlw1ckHJK5oBtQz6SA3aAP%2FDJFNG8&X-Amz-Signature=1491d6816057b5fd24ad52326b8e83fe30a06ec1fe68062014adb6e52605cb81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYPCGDIS%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCaTZIv4a1c%2BPPkXQUT4ylQlPduxxNediQslaOqD0aTawIhAMgYVL2lk4Qi1AE5rOV%2BtmTXrLK85wuStjMn94BgEEv%2FKogECKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzudjdxVfn%2B0PZTJO0q3AO3HjU4GG1uZEdLdnCT2e9Tot5K7uet5dzDw%2Fc1Fk69hpETSpdc38PVZO%2ByMZ4NQIurbsOUbj0BEdbPW9FH1WkeLykB2%2BVmhX7%2BWLXh5044kssOQ1wjJRwsHIR5nruvqOi7OlKjXHokTCETSQ%2FIitIaFYCQZuKgGhBD1rkYaNOYJaIkGH25wnKt2TLwxI7Nf2MnlcIp4Y65bM20WZgbE8Hnt04cAoa18VN%2BTyMPPqXdzAYybcrP21mLQMryUdW0cwR1MQdYE1sQZgZBqAMI8hnp0AmmlcdHoSbT8kF2a%2F8Eb%2FjX%2BZ3rHR3M6g8pT78qAw2rKjnZKLcRFoK94tg6VcdBfo35x7LcoACacUaIqz5JKh45H7qoUtq0hHmXN5zgVLkxuJoUcid%2BcV3hZs3vLpBAMWYFEFwP2VBq0LQ5WzFWmonWCg6ZFL6Msk1Q5dDeDxkHWG%2FOCRCEnghLtYPzmXu%2BxrCczkIjK6rL0KM9fJCYnC9dJiJYOjwW2wK0vaVcgIFWsXRHj1nR5ErP4FKmnqDJtjdRDZCKr3jxiLOrmsA%2FuuqO8hddxASW1pDkhAoiJhuyxEC3ZqNIuLu2vSPwdxGbf22PDnXGBJLMeOnWczd3hkUbNzbMWInQC1hr5jC04NbNBjqkAWCP4%2B74KxdstcXRJpnfLd8ml5FTHRJtoYFYSLHD0qFkFvVr%2FofOXcxrOFxt9I0FfNOELRfto%2BB6MDerAfwYTTMAyKs4jLW41gnuNLxW4XIND55RK8B1FHiH%2FvINMIMZsmuYsanRiHnpDVThKAxTc3t%2FTY5jQweYGcilTxSgdW5Qi1Tpf39shlqIF8hJoZxqZ3Dx6CGsKszPqIbYf9b1oP%2BKhfDz&X-Amz-Signature=15be5d095218c35b710e6c68878eb226004bcdf37ceefaea1786e0859282415a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYPCGDIS%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCaTZIv4a1c%2BPPkXQUT4ylQlPduxxNediQslaOqD0aTawIhAMgYVL2lk4Qi1AE5rOV%2BtmTXrLK85wuStjMn94BgEEv%2FKogECKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzudjdxVfn%2B0PZTJO0q3AO3HjU4GG1uZEdLdnCT2e9Tot5K7uet5dzDw%2Fc1Fk69hpETSpdc38PVZO%2ByMZ4NQIurbsOUbj0BEdbPW9FH1WkeLykB2%2BVmhX7%2BWLXh5044kssOQ1wjJRwsHIR5nruvqOi7OlKjXHokTCETSQ%2FIitIaFYCQZuKgGhBD1rkYaNOYJaIkGH25wnKt2TLwxI7Nf2MnlcIp4Y65bM20WZgbE8Hnt04cAoa18VN%2BTyMPPqXdzAYybcrP21mLQMryUdW0cwR1MQdYE1sQZgZBqAMI8hnp0AmmlcdHoSbT8kF2a%2F8Eb%2FjX%2BZ3rHR3M6g8pT78qAw2rKjnZKLcRFoK94tg6VcdBfo35x7LcoACacUaIqz5JKh45H7qoUtq0hHmXN5zgVLkxuJoUcid%2BcV3hZs3vLpBAMWYFEFwP2VBq0LQ5WzFWmonWCg6ZFL6Msk1Q5dDeDxkHWG%2FOCRCEnghLtYPzmXu%2BxrCczkIjK6rL0KM9fJCYnC9dJiJYOjwW2wK0vaVcgIFWsXRHj1nR5ErP4FKmnqDJtjdRDZCKr3jxiLOrmsA%2FuuqO8hddxASW1pDkhAoiJhuyxEC3ZqNIuLu2vSPwdxGbf22PDnXGBJLMeOnWczd3hkUbNzbMWInQC1hr5jC04NbNBjqkAWCP4%2B74KxdstcXRJpnfLd8ml5FTHRJtoYFYSLHD0qFkFvVr%2FofOXcxrOFxt9I0FfNOELRfto%2BB6MDerAfwYTTMAyKs4jLW41gnuNLxW4XIND55RK8B1FHiH%2FvINMIMZsmuYsanRiHnpDVThKAxTc3t%2FTY5jQweYGcilTxSgdW5Qi1Tpf39shlqIF8hJoZxqZ3Dx6CGsKszPqIbYf9b1oP%2BKhfDz&X-Amz-Signature=d4f4bcf1c80de5407c58b9fd71c4dc5462091675f5919b90d1ea775c19fa57a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OOZARCG%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA6GdMXTxKoxYiIRvEPptKpcghjOWS0iSfniAxadpef0AiBb0z21%2BZaGL86clDPEBojzQxrvm5QoxlZ13l24xJLHayqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQFpJiaE8iAN1iBKWKtwDaqN3KYM3%2Fv19Y1lTO0iuxKt%2FmEi9tw6ZBPDRX5aPM9qOBIAXoh1QW5ayPPYf5gX5brPAJXb9ymEt7q%2BM4PkX1ckIV5N1eHGI02tHba1YakmlLfSjt90JriL%2BFQRz0ryqPXAL79dCkXRLVDiRZebRwSX7sEGagKoxl4Pd0y2poruFR4jy67Y915QPYA77m%2BvGJ%2B1%2FvDj9pSwwMnTh1q20UUYxr21Pf7iyR3HgQVwQ3HhPuBnnJl36aVfQYQ0EtyKGoG7qTY3%2FVfS93dc3UDvHC6Vh4BM56UOzF1UFBaWHz9ZvlRWb5kEPX0y9zhtfQzxX4Q%2F2yucX%2Bn9nVK6Ne3f5QiHUnD3d%2Fk2tsxWZxpLJhYxycs9k5cWQWo3t7hFyUQckqlbc4hdQ6mLuokAp6aazVuFVzP9kh6vQ3fSOS1WA3OhK%2Fn68hzjJ6RtilrRWPJxj4k4mJ2kycf93tay6cFwhzQcFbn%2BoTGGrOQ4jAgOyzBBgWgoBanfqx3cgUR6OimRDr%2BFrq4Fiz5sJznFO1ufMHJbiakRGVa18gkK3OwpBNlfryVnnL7alOmmjRuQFO6Bex6ElEPXwX1nmjuaSlTMYj5uBxMqcAuZF3KkF7S9BJxTvrDQo9rSI0WE1Qp0woeHVzQY6pgGoCK%2Fz3NZ78vW6NwmDvgt3DMp2zv5u3mn2Vv0UgfcLzRI4RM4NLIBSEPyBW8QdUWQCmTdnTzWaOtnjq828jnD52XhUS0W7AKaJhXpizTIyhyYzSrUBz40KRreB0PXFJbT6P7XESwrLu1ooPt42uLE5aTBv1WDKpaYZZcZL%2F3aXM0WvVy7zNLYx47k%2FbpdZFroeGuYdRcJMpaQrkenD5shTrAcSq2x%2F&X-Amz-Signature=1112f1b7597d9c8f3f9eaa241fe556ffe47a920014d96a17c741c883565acd0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QA3SZKAT%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICmq%2FiyJp5uC7U4CDnk4iIdDa7HRkFryCMsHU7TfaFpHAiEA654GnevKhe46zvnDQf6Yzx9%2FqadvxL8liN%2F%2FZYFMouQqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPtqmYDnedry4aUpMircA0WCkoHW0uMVm%2FKJhpq%2FQ3qBKJQPI5UwG8MGld5kQrUfLB8gqKDpMCrvoiy5s0EJhJYy%2BbtQ2qfeNrI%2F5bGAZhaMSc%2BY66cZ%2BkZG%2BTI74%2Bg1nSEQ%2FKPS40pvr8YL1x6uD0TVI6SJ%2FM3IeVhmTUdMObWa0nh6qu4dPb7Nu1fdBkbZZdet%2FFzvUGmN2J6uLBw4CmpxRl6tIoTF1zDHRCMLDdqhy9m%2F20SUd7l8e6fDMoyGPj03Lte9%2FNQ7p0Ivr%2Bt7emcaVZ0p4x%2B%2BY3LBPm8l6VJZ4ZjkiEdEdk0mPuQhY%2FbbLZUEuaIrxmkFbrLGNOOVe0gEM5mvmY3htZpoKX8kbCf67rUSl0aDZWTck99qtIl58DXjmk3Hrahdy6KHVvFHtqvkPd2Q9GzdELvbrBuh82WS%2FsaTF37%2Bh4NcnYnLWaKR%2B9hG4StcPzKmiIJA%2FZAyZQ0H0j2dzH%2FYciB8nQv90mrw24CI6pJIOgoNtY7jSCqQzmpo88w6jE0zX3AF0yS%2FXTjWh%2FcugsTKD%2Fm3J%2BhHJv5%2F%2FUqNCUYbkcKmSJfGAABqcE5hvRQ%2B5ut1GdZ1f2TdwOwDEGGqZrQFL9p%2FO1jT6l95NJPbh2T8NYSRj4LQhFkCGaqwqO9m2d04Dxj9MLHh1c0GOqUBWu9ZKquyhNQGfaYuLUgeV4Jr94ssKIQsJpekOo1COjHUWj5q4%2BScNQ6sbjAqzGgLsxbladekN1co%2B%2BRABGThvBzVg9LM%2B6E06GGEO1jjJ3fEjMNRzC0qQGd9cuoK1PmpqKDd5hy4%2BMzT93KZy5RdRg5kKXBaJoXeaheHxu0Zds4%2BO%2B6NpC%2BepGETp8HpsF9chl6T%2FiRNa8Zufv3QPVwR32inlL0i&X-Amz-Signature=ac65ffc89ac51655633bb4646327051994a211b16bea52ce19c320c732546097&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ASQSMJZ%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrV5mK3Sg550kQ3LmzJQer8SLn2d%2BM%2Ber1JuIiKmZRdgIhAIknCkqbyD4Vlxj%2FpWAsfVGVSqw0nGcw0Mnx26df4%2B57KogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy1as6ekZvXBN0zILIq3ANsm6m8f8JWrqR%2BjulM4D%2FfNQx%2FmgzcN379oz4kXMbiJrB%2F0Y0A6vk%2Ff32ae40XzYa4GTJ20yqAAOJC4KcyNEdxqd1EYxD8iyfLQqf60h7dqnCNbSQbm8n4o%2Ffp2k6Whmml69jTqxtaYmU7x86RW%2BD7%2BEvj5jbwPeF%2BsTIqg%2Fsc%2BTz4rgWhw12tIyGNnNDJArdumc6Xn1rwhKsQgLmpZ3laqSf8EmcBtgaiDxTYkK087uLeuJTHp%2FyEd9tJaxDmLlRgAPyx8duAllOoTXqjeQkT6aSiIPf75Hu9K4ej6LkTiCA6lld2UzeXeXSoSYu2e55q3FILOcG0qL3rDpSsawI0Kixm1q7M6M6pjgATeUaplJX8yssF%2F9tccQNlMPU3hlrWLiToA5hA6PuVriPoywW%2Fy7gjR6Y0hIASxVD%2B2646fJVjO89K3okwTRGMBa9vZnEXl8mIOYUYdttYJHos0wZc%2FZLya5fyv6MCArWDs2feQDEoA57Z8mKX4nazonUk28l0C3G3ZaSC%2ByfMed9fbZO4Tyi0Ar%2BbcpLIR63vFQD1fVJLZ5hlYGuyHPpg0kacSfBjh%2BzFGfTbFvqyeAAK2eKRHFU8M8Z8bWdWJi59QVO605fnbS1fxUZ%2Btf1MWDDS9NbNBjqkAXb1Qj5Syrtpm5%2F7WeeLN%2FG3yz3xH6EoaTUbb9MMhxXAbtA9xz0R3UL5sXEMbFix5wg9WBWws15uUL8MregWofYHt4%2FOnC8ubLzXVIqnZxzjpnkZjOHc7V%2BoiXqE5ElzNSuRz2Q%2FKJ0l%2B9EueyctAY69jIQJzf6t8vIMCcCj82mKJwpBtqRP%2BSTtGk2sQugDrUgSW%2BXhHqimau03ow%2BJdrjGvf8C&X-Amz-Signature=6431f33beb86e13be923faabf3def58225845b9e139d785ca57cfed6730c3e6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLFBCYTF%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDTgSLBReWWHRCXb0AL%2BhA3wqza9OOx2otr98nF58EdFQIgZlmuUiooB172PptyG3zE2c0Mam8cHyeRVBp7w4DF91kqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKWDHQZQDWZVNZPvNCrcAzj%2Bo%2FDkV1VhUXPalYJunXhYYyHUJ2t2hUj%2BB1kqUCp2u0IT0wG%2FWlJ7dSG6L9nKt7WCwjoi5LWs3ln5RnNhsHSH%2FMTAV5cUU60i25I7UgtgPn0%2FvIp4fQ%2BB3IBcuWVzovp1jmvKqrOYA8EPwcaXC1TT95J7IRSaAwxce1x3EO1au29Up48fEmPn8HagUF9sIwkPSm%2BctsArIimEC1lp8IkSkAL31Evd903KdDLk6uZN4neHe12Pn9P8VQs3qvLrSSmELHd3yK%2Fljyse2AR6H8j5MYYhmOUovnYffWcI%2Bwka0lKb%2FfJ%2BLhcw14jwYHuYIEZIMIyJIKkH80UmE%2FqGkSv8X9MkXeCmqSoUnXeuecLp1grY59WMCv8gsHPhcXQOvMBmqhiYiayPD0d3HOSLo0%2FUqWMVWB0KriVJarkQN%2FOeIh7CYAKBDjOtyoze3XS4eE8nwtKH1hpvwHX9RctGnQjBk46kkTrWQD%2Fjdz0eKX9PT0Xk1YHO89PvkjzlDIakE%2BztQn56tRmdg9%2FnMJ0sqlOJO6qP04rjeJOZ8zDL3oO827ZjUr3%2FqC2m0SaQZiViekLE%2FDaSm6L02aldpVrsujfRNEx2IgX3T1QY0To%2FTgnYjq38PiL0qMkL4GR2MI3N1s0GOqUBS0XxzGzxlhMBkOh6OQY%2BObrTqxsop9Ka%2FN2%2FLhVWa%2F8Ir0dcr3RxP4gN9%2B1S8dTwBODyYRAIHke5vhhGBtXrRhtpzKbyF6cXmd9UXCFVCd1sxUChU5BY4MYVBaP4XzsugV4L1RGA5j5gNCjUIEYzgv9sjmPtYx537xnlgg84Dnwk7HILVrHvabWhgqrvVJCjGPRCC%2FcTeHXf%2BRVUFuJ%2BeZUo1fmX&X-Amz-Signature=1dd71bbb173ef1e988b6f6b58c8d435383a56a9922240fa28c4eeccaa9a5c30d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLFBCYTF%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDTgSLBReWWHRCXb0AL%2BhA3wqza9OOx2otr98nF58EdFQIgZlmuUiooB172PptyG3zE2c0Mam8cHyeRVBp7w4DF91kqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKWDHQZQDWZVNZPvNCrcAzj%2Bo%2FDkV1VhUXPalYJunXhYYyHUJ2t2hUj%2BB1kqUCp2u0IT0wG%2FWlJ7dSG6L9nKt7WCwjoi5LWs3ln5RnNhsHSH%2FMTAV5cUU60i25I7UgtgPn0%2FvIp4fQ%2BB3IBcuWVzovp1jmvKqrOYA8EPwcaXC1TT95J7IRSaAwxce1x3EO1au29Up48fEmPn8HagUF9sIwkPSm%2BctsArIimEC1lp8IkSkAL31Evd903KdDLk6uZN4neHe12Pn9P8VQs3qvLrSSmELHd3yK%2Fljyse2AR6H8j5MYYhmOUovnYffWcI%2Bwka0lKb%2FfJ%2BLhcw14jwYHuYIEZIMIyJIKkH80UmE%2FqGkSv8X9MkXeCmqSoUnXeuecLp1grY59WMCv8gsHPhcXQOvMBmqhiYiayPD0d3HOSLo0%2FUqWMVWB0KriVJarkQN%2FOeIh7CYAKBDjOtyoze3XS4eE8nwtKH1hpvwHX9RctGnQjBk46kkTrWQD%2Fjdz0eKX9PT0Xk1YHO89PvkjzlDIakE%2BztQn56tRmdg9%2FnMJ0sqlOJO6qP04rjeJOZ8zDL3oO827ZjUr3%2FqC2m0SaQZiViekLE%2FDaSm6L02aldpVrsujfRNEx2IgX3T1QY0To%2FTgnYjq38PiL0qMkL4GR2MI3N1s0GOqUBS0XxzGzxlhMBkOh6OQY%2BObrTqxsop9Ka%2FN2%2FLhVWa%2F8Ir0dcr3RxP4gN9%2B1S8dTwBODyYRAIHke5vhhGBtXrRhtpzKbyF6cXmd9UXCFVCd1sxUChU5BY4MYVBaP4XzsugV4L1RGA5j5gNCjUIEYzgv9sjmPtYx537xnlgg84Dnwk7HILVrHvabWhgqrvVJCjGPRCC%2FcTeHXf%2BRVUFuJ%2BeZUo1fmX&X-Amz-Signature=d9c0c25533191c902e33a2b4d5c6ffc86cb640c4a3df21cefc4eacb39c0fb274&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JNHJP5L%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDDTn7jiwTBUeiM8Zk6rYFZp6irFXPHkOkCf4gvOVrwrgIhAIFSGCkjRDO1Tqsm%2FGSU0%2Ft6F41%2BZPEBxtcv8xC2DzjvKogECKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxFL%2FEq7EyShCYAs8Eq3AOeIO8tRIAIMNB%2BWt9lGg1kpFMKx96FBD6clNwcIfnsvCL%2B%2BQoZGbbd6USJlvXfJK4QB3Ys960OKWj6NQP758y5r9ZxZLNgTDQpYoLftFi1wF7YYiV9%2FU%2B6BmjbTUy2kGk4qNbxldntobEwPfgseEdK9LHwTfv1Z8xyAC2psBcAi83qFcTVV67yTfmYu5S8f9NwI8ocHEVoTG85YikO8eTRq3bqyXZXTvvfhWMw7Ff4yfkgazqBVVskxxqvxfBkpo8MOCNDazxzCDgDgF2fy8tsPDdzU9pi97h8cv7%2BkeDlzJZYAc11Exm4E7%2BO1CUja9CatSCZpy6jcNYLoaD%2B19u0jokcSdjxvGtuTC0ZV0WvCLxvSGflq7UM0m%2F38QmC5PDKiDEXiqC%2BdpnwYp5Uh09PUK0b6NeUhBm3FsVtLF5HkPnzKoapfvJD6UAc4ibOE5j0FEaiWVPE9TtjoVHOTiLpGvAOWb6NTRJnxnzQ3%2BoYSTmCGg9B%2FC7nAb9FeDpefBWTZBiZrL0I%2BIqPtDYXogpoP44qI%2FUG%2FFtP66qJYmXh1G%2BdQBDFSHTcZSu8wlnnEKfPhqJfh0YRvwHalZSuqPuYWCgpufBTvtUDnYV6qyjfKs6vkVR4g%2BcDnRwnhjC82tbNBjqkAVjdd5W1PrQoofm64F7MEcIvqJhepmpr7sAwpT2S%2FJ6WvQmGWQvTiTnZDk2ppPAeW0EaYO1jJWL34eotkPgYYBDjgBQ9puQ9dTi3PPagLCnTzZ1BW%2BCdF7Gl%2FotOn%2F7AtmaqI0hjs97Gc5eRHdHMX8KFRKateKNgM%2BjGqDaJlU7fdARqrdt0%2Fw0QieKDfcF25hECu1ogr%2F2DCIEDvuHXLW4wHbaY&X-Amz-Signature=b8cb422798f3cc69b95e51564d8ccf7d2943680244479ac9fc014b18b9293593&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLMG5PX2%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICDgEBjNg8toc0lbs5TtWCBAePoFrtVt%2FfKwbvHW9IAXAiEAwOD2abcoY5W5KnBbzffIPHJdKLNz0H3sWBsGMtuLLIMqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGt%2FmTsAAsHmdBhoXyrcA3w91wkvvR7w%2BZj2ncIrIX1%2BsMM%2BZ0Itl3CiJEVGgADTpEFO3ivnrCOvCPV1J1a27Oo4H6GFVNct9yViXxCypfxDksCeeXUojnL2M%2Fm7hwm1dpgW%2FqO16YjcfJjJOXLyrzEE5lmcCDynEaskWS%2BbHhVfTESkDrCAIEWvId3jqfQ94bte%2Bxxz2PAytnOBP9kWLANbfbvh9epzJdhlNz%2BzYzCZ29l9dgokmTTE%2BIVx692nAPSEkYUB90Hw%2F3v8jrLQ6RX%2Fya3uDQmvg%2F%2Ba0ddge%2F%2Bt5MNO2Wi0m2vWdXyu1Pe58WioibNzsZ1yKpKIQExImVuJwcBhMBIcJ4amfZyM1BluL%2Bzq7678cUbeyJ3KhcghB7nJmSsEGEjfzUfNw2H43gE7z0y5yEWhqtIAH3N7mof77B157BTL374gQ8WLX8mzALmA%2F%2FjJATFMcje1OZeIVkY4IYCKoWyUjo227hTCPmKx5uLk6VdfgHLXyUYQe5P4mIy1UrsEEHPiC9cfhUIiR%2B7BGrJcgeB5EQpekVLEzzz4eJhzkLRPTZxP90s6jktz%2F572vATxJeIjGjEvGy4bt64opAO2lpYkr1mvawLZlE%2FziBM%2Bt0SUH5aw3g3oHRq3gj4hqvq%2F9XiddjmXMKXM1s0GOqUBakvcjgaY52RnC4VvTRJbqlklRq5FdOaX1YNkDCFBOQwX7oA3NNl5mhbOc74ybPo5JxmRSPZM8hLsUAtmvZkCXJ1U6odeXgUX9B%2F3AXsu0wHeEHe0PLk%2F6DMtRybiu08TJHnQ9uJ19pH6U3Tar57cKilemFvSW0wQcT5fHyrV2vTDau31fRNfDZ8jYuHLf6VvbIv1wHidVwvEMyIH3wwnWdKB17Yq&X-Amz-Signature=b056f2033701b5221804aa3aae1fa0eb0d2cda69258a35a881de8ee10053a8ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLMG5PX2%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICDgEBjNg8toc0lbs5TtWCBAePoFrtVt%2FfKwbvHW9IAXAiEAwOD2abcoY5W5KnBbzffIPHJdKLNz0H3sWBsGMtuLLIMqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGt%2FmTsAAsHmdBhoXyrcA3w91wkvvR7w%2BZj2ncIrIX1%2BsMM%2BZ0Itl3CiJEVGgADTpEFO3ivnrCOvCPV1J1a27Oo4H6GFVNct9yViXxCypfxDksCeeXUojnL2M%2Fm7hwm1dpgW%2FqO16YjcfJjJOXLyrzEE5lmcCDynEaskWS%2BbHhVfTESkDrCAIEWvId3jqfQ94bte%2Bxxz2PAytnOBP9kWLANbfbvh9epzJdhlNz%2BzYzCZ29l9dgokmTTE%2BIVx692nAPSEkYUB90Hw%2F3v8jrLQ6RX%2Fya3uDQmvg%2F%2Ba0ddge%2F%2Bt5MNO2Wi0m2vWdXyu1Pe58WioibNzsZ1yKpKIQExImVuJwcBhMBIcJ4amfZyM1BluL%2Bzq7678cUbeyJ3KhcghB7nJmSsEGEjfzUfNw2H43gE7z0y5yEWhqtIAH3N7mof77B157BTL374gQ8WLX8mzALmA%2F%2FjJATFMcje1OZeIVkY4IYCKoWyUjo227hTCPmKx5uLk6VdfgHLXyUYQe5P4mIy1UrsEEHPiC9cfhUIiR%2B7BGrJcgeB5EQpekVLEzzz4eJhzkLRPTZxP90s6jktz%2F572vATxJeIjGjEvGy4bt64opAO2lpYkr1mvawLZlE%2FziBM%2Bt0SUH5aw3g3oHRq3gj4hqvq%2F9XiddjmXMKXM1s0GOqUBakvcjgaY52RnC4VvTRJbqlklRq5FdOaX1YNkDCFBOQwX7oA3NNl5mhbOc74ybPo5JxmRSPZM8hLsUAtmvZkCXJ1U6odeXgUX9B%2F3AXsu0wHeEHe0PLk%2F6DMtRybiu08TJHnQ9uJ19pH6U3Tar57cKilemFvSW0wQcT5fHyrV2vTDau31fRNfDZ8jYuHLf6VvbIv1wHidVwvEMyIH3wwnWdKB17Yq&X-Amz-Signature=b056f2033701b5221804aa3aae1fa0eb0d2cda69258a35a881de8ee10053a8ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632YOPGGQ%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T201311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE1zbbpQPxupusX92XI8aXGGkutCilSM3MohJN7Psx1vAiAWlE4tcj5IW5Zqt%2F9jMMHfB18t5MTUkHcaBlKiTzDb9CqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJbLHrFGIYZo%2FBseaKtwDTlx9mr%2BzBe4CRv2GZSHq9jFYGTeR7iddC5XtR6WMyGdLkmHTMvInf%2BqQ%2FRxiCEPxr5Zfo1qXuy%2F7EQwJ2DcIo6dz0hLS8ZopMvci6iehQWgRXxpc5XKecnSmyLh5EYD972n%2FexvvgrYFvnWrIfbCNK148Xw81bgFgi%2Bc7g3KkdM3HHNI9DEoiHL0Vd0NCjooQKpXb5tk4OQ7GLNUGBpB3L8VyYu8KJDm8mzhFPNlRD6hC4wJhqTjHVygNlrYHcUJqRxCUQRJo%2BNT1i1%2FK%2FsH0Di3KvP9jljcYA5YAVX%2BCymzeeEJhoNobqgF8W0e4VzP90dsjJKWKZFgyE4vyh1ZD2IfeMIhNs7tUN9NeyadPTetYCYXXwKvrPLIsc%2FdHH1RCIXRsfVbNNJ%2FPbEdYFQNm%2Fo%2BWFAOdeNXY96ikLTzmCO1DoCEzJ3z9pA7znxVq81y7oZS2RT1dOrcrqO1W1b1LTcsbFFs1PNZsIXelyr3c1hqNhkHCvtF9Hfn1hDlqBElIwyf2VekPO4GNV4rwaoHFa3IVmwWm5%2BxUJJCbkZ20qPWyE3y8f%2BEQlSpzDkPnVMCvto6k3snA7kUe3zZSs9lxObm4C3EuFUV4rMZUaTrswjzgIy0bh0A496K8yswreHVzQY6pgEVTHnKwoYF9xBoxH4B%2BTQWBuvN9VS1bj%2BsbHitDQso1A6eUTrdBmVbS9Y78Jwq6cpZsBTr97A6O7BeCbb78KEzmTRbkGyAA86ddDfSxOF2sxmmFuBx%2BimqOBZfJrin6SSj4faRp0Bsqbh2d3%2F1J6SFh2W3m33SPJRlLb5WYjnyhxyxiZkxUG91yA8PqKIpDJjyFghxgAZkrGNqT%2FilKC1m9XZPnlKF&X-Amz-Signature=c5619011f8a3b72dc5fea5f8c428d44d8f34b7ec54775a2547803dbb133973ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

