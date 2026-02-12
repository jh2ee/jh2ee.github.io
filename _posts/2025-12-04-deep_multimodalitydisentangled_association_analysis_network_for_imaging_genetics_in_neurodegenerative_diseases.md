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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWQKNZMW%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQC3V5krHjzqEYc7Chjq8AwQqqRxJgpSEb5uyKuxglDPTAIgVrjoPICDwy5VNShMZUuSWHkb9fousc4Scz6l93cPYuAqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOeitl2u6PsEeNlWYircA3iidHXxoqvlcvFy80N5SIuVQlgpe%2B%2FawlkJd%2BfbxSKMFwYBMtNFoLzUdNPrYd7b4fUeMh1rm3xtlk8jpwBJgGABT2M4DNenpcPeP8BUmiR%2Bii60wWckUw8D6%2BGR%2FEkYwdL8WWtpU1w1ftB03OIKbCUHNWDpFnR4IFrcjx82cKaRilA2fEug4sSk1wKBX1Q0LtYZt2sxv%2BmoLlV0xv%2BfMCkRMU1thwJhCVtmMWR52Bz3q11v2YkHi0eu9m0f7LF42z2G%2BnPJ0Q%2FlJE7AfOHWUm9%2F5Lwprl1nvjcxDnrAWD6BJOkY6yVwuixdkT%2FaO0JmDDsqLF49NK0hMZjwZACYOKIluEutVKfBAANJkUQpitEg5UblqPZmy7bWHcx2%2B3S8xu%2B5ZmUbLQZuNvHyGOtPp3CBxVHvko6%2BnuOltaAsCX8cCpv8ED37n1EjcdZw0USC2Xq3gDHRbmubh%2FG6rD1RA9TtnvFLeZWpOCQNb3MHhT6ktsYKaKYXnBB7eH8kmxvlPJPgzK4o%2Ba6QM2SchtibzLtQVzVgULNtrf15XXkLxtHPUK2OjwUmzAaL6loRh%2BzuFckn5400%2B10uNaBt03r5HXJl9LnD2oiKBXUuLPid9lyEtxTf1uulxyDssli1MJSatswGOqUBcN3%2BaYPhobBygJ8uXrunMS7r8XYDa4Kvc7%2FQsPryuuG%2ByqfZUBLATMfiQ0Scx6kKSeQxPAnJOl0CdLA59ML78rgQBc6dVlkJoHUJMZ%2FC88lbljKHHJDR%2FTX8BonC%2B9HXzQKgh0PAEWEM1OtbhfOPzDwrW52NIlhwrnS0QNRNI74Sc5eJwGIHLV01TKoss9gH9N2TRpalKoMN17M7qpSt05Wn37GY&X-Amz-Signature=2a4a80ea6764581126c7c44c2389c5a63a0ffd223d2f139b2608c190ae216b7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWQKNZMW%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQC3V5krHjzqEYc7Chjq8AwQqqRxJgpSEb5uyKuxglDPTAIgVrjoPICDwy5VNShMZUuSWHkb9fousc4Scz6l93cPYuAqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOeitl2u6PsEeNlWYircA3iidHXxoqvlcvFy80N5SIuVQlgpe%2B%2FawlkJd%2BfbxSKMFwYBMtNFoLzUdNPrYd7b4fUeMh1rm3xtlk8jpwBJgGABT2M4DNenpcPeP8BUmiR%2Bii60wWckUw8D6%2BGR%2FEkYwdL8WWtpU1w1ftB03OIKbCUHNWDpFnR4IFrcjx82cKaRilA2fEug4sSk1wKBX1Q0LtYZt2sxv%2BmoLlV0xv%2BfMCkRMU1thwJhCVtmMWR52Bz3q11v2YkHi0eu9m0f7LF42z2G%2BnPJ0Q%2FlJE7AfOHWUm9%2F5Lwprl1nvjcxDnrAWD6BJOkY6yVwuixdkT%2FaO0JmDDsqLF49NK0hMZjwZACYOKIluEutVKfBAANJkUQpitEg5UblqPZmy7bWHcx2%2B3S8xu%2B5ZmUbLQZuNvHyGOtPp3CBxVHvko6%2BnuOltaAsCX8cCpv8ED37n1EjcdZw0USC2Xq3gDHRbmubh%2FG6rD1RA9TtnvFLeZWpOCQNb3MHhT6ktsYKaKYXnBB7eH8kmxvlPJPgzK4o%2Ba6QM2SchtibzLtQVzVgULNtrf15XXkLxtHPUK2OjwUmzAaL6loRh%2BzuFckn5400%2B10uNaBt03r5HXJl9LnD2oiKBXUuLPid9lyEtxTf1uulxyDssli1MJSatswGOqUBcN3%2BaYPhobBygJ8uXrunMS7r8XYDa4Kvc7%2FQsPryuuG%2ByqfZUBLATMfiQ0Scx6kKSeQxPAnJOl0CdLA59ML78rgQBc6dVlkJoHUJMZ%2FC88lbljKHHJDR%2FTX8BonC%2B9HXzQKgh0PAEWEM1OtbhfOPzDwrW52NIlhwrnS0QNRNI74Sc5eJwGIHLV01TKoss9gH9N2TRpalKoMN17M7qpSt05Wn37GY&X-Amz-Signature=2a4a80ea6764581126c7c44c2389c5a63a0ffd223d2f139b2608c190ae216b7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YM4XOKEA%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDLz%2FQCi%2Bv5fKjSGy4TLekWpCR8svgdEZSZiTlg%2FhziVwIhALvd3OaqLZpNBqMhGTlTPLRQsktrD3W%2FrNx8quCmDQcqKogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzJNUYeGTUfqksL2pcq3AOp8PtfMqjl1wfN2IRA2F7zCa1vKmxAWHWo2KI9JGZ0DpQ7kwHLVkGFzYhRS5vPWOfRqG9jLjspuBnAaLlaDXhLcZm1j4w6mMRrKE%2FeDQCUX9rpGrqC9rr6s%2BX91OHi2ehK5qz48oarjYI4UjT2w5Bpikbg30xdX7GI7jJo952N9FHrtGKYjv5pQit2RCEOta57fn46W8yOQ%2FQcLXGNrHQ5x%2BHAb2Dvsl%2F%2Fui2b%2B0VEBcI3fjebNWX8tPDsKXbA3IqHkkByAMkC0IxK2KDUkhxYq%2BC4cV5DhRkeSoWJTqTHBHg%2FvVZakvc6Jxq3JTSrRioROu56JFIejbat8ku11W6YGA8cRx%2ByuQyUxIRr2PCC0%2B30b0CYTVq3OWWdNT1OoTU9HXABo0A7eYrz15WzgyE0XZexaoajP%2BAVdKkKwHo8%2BUlqKoW2jh%2FINwHd6F6y4GnLz0wbW24EA4gZzlUe57KK7N5%2FznxtRLTVYv%2FFHKVe7HEgRhev4fijlk%2F0MKmtEkq5MFxEXhSlDeycRjLB7JCpAhHOicShvz3Ls0aPIyq7O9JxnZX%2BNw4Nr7Nhb%2BhDfLJ3k%2B9tkoyMRugzM9ukeK6Uf8vz%2FFCaKsIWEAQTmUq6BKX%2B6fMEvTEopo%2BxzDC0mrbMBjqkAYdN7gtIzLVJUpKzJqg5wyu5UIFdMtvsF9zxRtgGDvYFDnEzlGsImHsBh%2FxxP4kbdbDMNRyVNvED17yOl%2BB1yqfVTJh3yhReX6aOu5JMwY%2Byag51CNSqtr6gXmc5ncSDN3CFYDlC%2FB4fWNUi2Iq%2BVzzyAL%2FK%2BXm%2FIbXn5CjFvnsl90vOu0Th1Q%2BY%2B5Nbz%2BZwn%2B7wyX3fNHYbS5u5MOCfkcbrs7C1&X-Amz-Signature=30ad0143af389dcec13cdbb891f5236fc6c65c7310d9acfc9e47ab6add7d2b5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JWMMEX6%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDPNIeEHR%2BzSRzGEz126B3f%2B1v6m0lyG0lF%2BQ2KZwC6YQIhAPAXvrpvnPcvZDNPD1N%2BbPX19qevZ6cL73xrb4%2BTNJvbKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgydrKS%2By8XcFS28L0Yq3AOtob3CYuEPuycNNNazCz7Fk2f%2FYz4Wt%2FMr7tDrUP5KPUhf61XO%2BCyK0VUsacqZZ%2Bfg4SMH1COJ7eSYSVjHIriUenXCgNxUVTH1dCN21yJC1YpvnBz%2FSOpKJKTeVdXgaEB2EZP%2BXdLF5TF8mrTCW7iduZeT0vmtBODvoXCalTbt3OWS8%2BXcg%2BRpsuoKOu2gKnxiD45X%2FXrWXozoKf4XXBgg7eeOqAJvRYsxS4PuEk%2F2WkxlP452%2Fo1Pk716crAhWhEMkJMPP1tpDSr%2BVdVSF%2BnkZJz9AvHK3vpuXa%2FzrgDNn7%2FmfRwuKtFuf82GGDI264UdktJdp2oF%2Fqytlqnlt8HHkIPrsPQObKW2B12GxJ%2BU8zfbXowo5QRp1Q7jv3l3t8z%2FZtBPkqP%2FkLzG6hIGrP7p%2BtrY%2F60NE3lc92FuH06DIo0jNBzVoJnJaaLud%2Ff4qdnCY4y0B0YsQ6RRoL8dmSRcTmQz9fLovnDkp44GnnAgHSsqXhQqoHe1eSyA6NfX69dKGr%2FsWhBIfb0ngbq5Sm1L%2Btpu6DhZ3bMlaG7MC21tvnsOsNlpb8zXStxFFntOpWoXR3wRwYzD%2Brh0gGxGaHZnxaw7goLpAx2H9PDVUslvoZefAqlHlpAOjL8YVTCYnLbMBjqkASWBN7E7MryXdNB4m4Q99FeAhP2E9LzPbtBtTOTmh4hy5cfnMs0MtQ%2BSfEpoQ8D0iF1pwMBWDYy1mM7d8MRfwrf44p33CavjB%2Fgg2V3pGfn3P8nEHLgKKac7nw83ViXaBV3vZ4aXA6EhtIKvj5wBbYozogl7EjGnE2f50o98CIFgcgdNCCL1GBs5oEmcnwsYe4h4lYxj3afFiNeN%2Bj7QCt8VkHRx&X-Amz-Signature=4533a212db4215d1623d6b3d81c4a9d00f0a8515b56f0fa61b8e18f46ea42926&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JWMMEX6%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDPNIeEHR%2BzSRzGEz126B3f%2B1v6m0lyG0lF%2BQ2KZwC6YQIhAPAXvrpvnPcvZDNPD1N%2BbPX19qevZ6cL73xrb4%2BTNJvbKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgydrKS%2By8XcFS28L0Yq3AOtob3CYuEPuycNNNazCz7Fk2f%2FYz4Wt%2FMr7tDrUP5KPUhf61XO%2BCyK0VUsacqZZ%2Bfg4SMH1COJ7eSYSVjHIriUenXCgNxUVTH1dCN21yJC1YpvnBz%2FSOpKJKTeVdXgaEB2EZP%2BXdLF5TF8mrTCW7iduZeT0vmtBODvoXCalTbt3OWS8%2BXcg%2BRpsuoKOu2gKnxiD45X%2FXrWXozoKf4XXBgg7eeOqAJvRYsxS4PuEk%2F2WkxlP452%2Fo1Pk716crAhWhEMkJMPP1tpDSr%2BVdVSF%2BnkZJz9AvHK3vpuXa%2FzrgDNn7%2FmfRwuKtFuf82GGDI264UdktJdp2oF%2Fqytlqnlt8HHkIPrsPQObKW2B12GxJ%2BU8zfbXowo5QRp1Q7jv3l3t8z%2FZtBPkqP%2FkLzG6hIGrP7p%2BtrY%2F60NE3lc92FuH06DIo0jNBzVoJnJaaLud%2Ff4qdnCY4y0B0YsQ6RRoL8dmSRcTmQz9fLovnDkp44GnnAgHSsqXhQqoHe1eSyA6NfX69dKGr%2FsWhBIfb0ngbq5Sm1L%2Btpu6DhZ3bMlaG7MC21tvnsOsNlpb8zXStxFFntOpWoXR3wRwYzD%2Brh0gGxGaHZnxaw7goLpAx2H9PDVUslvoZefAqlHlpAOjL8YVTCYnLbMBjqkASWBN7E7MryXdNB4m4Q99FeAhP2E9LzPbtBtTOTmh4hy5cfnMs0MtQ%2BSfEpoQ8D0iF1pwMBWDYy1mM7d8MRfwrf44p33CavjB%2Fgg2V3pGfn3P8nEHLgKKac7nw83ViXaBV3vZ4aXA6EhtIKvj5wBbYozogl7EjGnE2f50o98CIFgcgdNCCL1GBs5oEmcnwsYe4h4lYxj3afFiNeN%2Bj7QCt8VkHRx&X-Amz-Signature=4a1f9698457deb2e32552d764d68eee4f4f06164e37955c04c2fb3dd66b38056&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664C7SKMTH%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIFAZp294CKgKiEL19XpQsFZKuwDzOOZPKIBCUSb2dTPmAiEAkdvfHj3DEd2SHKEv0Vc%2BhIgERtswDS6kxAI9ljpNaoUqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP%2FXeqlE4Lj%2FV0qntCrcA4RgCpQezyIrpjXAf%2BpxDYrEJl3QW8BpsaBPtWxoqC0KMgGZGrQZOK2LIuE%2B0BhlZ0%2FEzKPBLLJqsAWwTND0nCbseDm1TfGNfgzLhVmmpCxLpA74PDyKXPMPjVYrSHM7IZVJtPqqa8u5cIDfExGDbVI8unC0P%2BE4SGzPlb%2FNmPU%2FW5CHTyAu6msGdAlM7GSPTXcrmvsLKoLELkqt%2BUc6h%2B5bpdEn9PoH2IKU%2FyMk%2FD7BEub9aFv5zUA%2F%2FY6Z5PnNkKIRJEDwhEPA1rgyVOgHiQhCP7n%2FTYxzgUOdFRLhgQur5GjsGABUV1IEG8JQ5xz%2B12mbaeauNau1GUO%2BmRHGg1B%2FatYEacCbceeN1C86Nt8FZYrOqJbpRKr38fhDE2KmP9kc%2Fb%2FcCz8l0w%2BC74cjFlpEtRiAIFDRJpXQ4NRN5UT1kcB556N7KNQAaAygjskcv4RF2nRh%2Fg4w32IzuhP31YsH3repxN5WEhwrWeKAiClPHWLT6BfvyLdnGAXXRyl%2Bem49Pjc3ipQDyEIjHfbMmriwl6u7nYx9h2%2BTha%2FVKthzbVpVhnzpi3w1yCafrPFCB3PSSVRy%2Bjz2FZ6PngyhRIC9tHgdyD9KDE5eGvTyn4ujMjJdi2PeWEnhQOc7MIGbtswGOqUBZnQSJJvfaF3DDvoJ3hFcaZJu6rc0NBaHqYoEmqQCb%2BFWHAwGWWlLxPWp0TsQQKacQcldTmM9Q6yNFk%2BUhvpVyTqJh9n8o%2FeTixUzDZdQFsOOXkNZtTAZfKPMk3bxs66v6fY2IrDKJ22YGO4LKmy%2Bp2BZna352D41%2Byx8%2FTt5mPof7GDMVO1Ha4HGNPFgFQL8DP3nvwN3Fg9oKMFZskN2NuGZ7a29&X-Amz-Signature=705560521d3ff53ed6d508861da805dd2d66a610f2755c0e9aec8514ca49724e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2DRNZOJ%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIBeR28cCPdUuYQV7BhQJfcm3G48ISBWCbRaPpS%2FlE%2FDpAiEA%2B3mF3U3%2FO4c9ybe3jkeL1ZHQJX07epYuojSMxZt6ULIqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNl4lbjdAc2LoP6zvSrcA7vuN3cPvypBGjbrWStKlzcp29cYr0Ho1JO5weXLuELuxp7WCsGhDoWG%2FIrh2%2Fx7fdvSOKsHhfZ9shfCyKs8t%2B1fyB0k8uVIXA1RnX9B%2BMqfH9THpqPT35XDZzysX5EU9OPG82lOXvT%2FwdsQPjVpnCFCfSKKFqeAuXXUlMjGc%2FwNH4Fn%2BDu3he1jxH6TnJWNub%2B2ypy1kkjJB4qK9bgFJKJwBI9UO7FA%2BgPFGaxIImaW%2BOGUxiilEMzOT5LbSzt96Pit87by1PgI3rf6cDQKp1KPnBxYBEAmZ1Ks%2Ffb6FC8rrx0nG5szkyzvI0qNTRxE7oqEgmEe8ldcdBTBu7z9G5469qlF0iROHOp0jEB6F1vY1HzCKOQjTtj81SpcW3LGvr56mbd2hnkBNCVDCM0vrxVpsm734taPEW2XltELWR6AIhEavCYxx%2BIigN%2B7ZMfX%2FZJBfG7X5pqwsFPfRxtYvmk7jZ%2FFzz2Hm4jIQR0rN4UEO4L%2BzRFtVK%2FnUhaBqil8HJFw3wF77WftegI0wC5qZ%2F9JH9ABAnX%2BT6aMi4CQk0WyyOqAP4VDLir5eIGL2ra%2BOPsJMwA8Wjw6csmJ3A1g%2BcHD5Su29y%2FEJKqYUriSY6T1OhBwAw0tWAwabxHlMKiatswGOqUBBDXZsYBmyTfUYqwncSKzPcpnTrHWsut0SFZ2yAgrdvB9GGehXSlL13N3XMfrb5zKJEjrsCJFeCBPBObg0jJ3ZIQPv22DybunjrhI4FeSO5lFNPlNtaL%2FBXBZGyduzrHj20%2F%2BVGAE73stocteoCJO2OiEA2WFW1pT15uInqg0TbEvrDQuVQ9fc75NWJu3qkILjlQpC%2ByLkR%2Bc4JXkKSN8etn6nAdD&X-Amz-Signature=fad65c18c06ad724494f5b71611c3fe6e58308bde8b02a0346a3dacbfe8b192c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMEY4RZY%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDmmSTRSO3chB9Opv5ujdx%2BbG6huaR%2BurgjhL4rR3gjfAIhAK3Xg0o8De1sEZ9nNNu2h9rvjGrhk2VPab%2BiEx1%2F7LDTKogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyShqLIlQq%2BtGFfcioq3APWFrx7w9WH6zFfMqvwi14sXNhLzno%2FkYNxO2sVRB4yelZjplvq%2Fm8OsLnrsuQKxU1z5WozNLIiGuTqFNr2foMnqgQiDkFpIWww0QG7PGM1Uh%2BllJmYIaUeAUYU%2FrDF3gpxgjF1ueHfNsTOD89bNcvUXoQ86h7Ii05sh1o87Ro3vp%2Fs0jjMUwJIoJWkYAnqyaC6g%2Bx1vzsMW8nuqE3BYvhlCHVoVfomhuHDgpSbhs19VRtANv%2BBBxNE%2FXovuLRW0OS4V5eK1ifuyeLSqH6SKraeeVxFGyQlXEpqHYq92RxVZW42uvwh2UZEU%2BkcE8Brd4NUAfttuVS%2BUrXb2eu6qq5n4eYYbeNh5oRSNP8uJ2Ia6jVclEFbc3z6IP1g4T%2BJDTeBoRM5or6GI%2Fc9bvIONUu0YZcIzFr3U5tNxt10xbc9HGkk%2BLG7A2lzNfPiP%2Fhj9zyMOqjoJog4k0f7Akh44AqcFzHcEUrnlKr%2Byh4kC3OTYkN%2BCxZJ2SDhi1VSFK56iOV5QNJsDO4nYlRHaCV7vwjioPwoSJ31t2A3%2BYK0AnerxCQ8Ypl4mqgL50G5b3e%2FA2YYNmXLx%2B5Ka7snUV%2FfIsGj31nR2oxLWICJ%2Bsd9iMAZ1Y5zb8SbEeQqMTqFTzDvmbbMBjqkAWABGYHx%2BM%2FQeKDpMkVJAt60PYlwNPnpo7k7ODsageb7IUZWqN7YqV2eV%2FqXzz2vMSupjMlIrof624fxX%2FaVrsO6AOXXBERSMPeqgnoDgY8MsEMiDlh9gDBCMF9HIuakkjzZPiji5FlfACIw0%2BcvCmRbwCQLYnuL9s8X6tDvZ1VrKhh%2FwKkK225sAjB0axfFCKmCix81T2XFxhL2RWP6kA6%2BRCTj&X-Amz-Signature=0ade5935d7d2d17cfa22717a4f4fb2c1a97b3b12ceeeaa88cfdf399e73786b2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFIKOGM5%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIE%2Bbcm0cqLZvYpx1qgLoL0OrItMny5YmfD6eHBSoN7MIAiAr42tYVgVMM0JchlLBZ3FcrhpkyLWmMTYzEBKr5%2FwKoiqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMx16GssO1U9myFxsYKtwDksUUj8jLbn7sQX3aCHGFL0BOnbFySA181fegLwYJY562DEPFJtbZE14hmo00HgyPv64iWsLJ%2Fl%2FiBbo86HdshS9I%2BM22OAZIqJN4%2FMg0WdxUl4fmm1YWxBId5d43tRGSfR0Il0fT69mMFoQH4ubjxp0LeulqwPm94ZwuCMv9JwBvbna91SMe91zawL5OxocMpA03HbwwvnGnLBbAte3T8dZOWFNiAyzhFOh3EMVBn0isoVbb0TIpN6Ry%2FzEO1Qx02iEPzK%2B3MQCNhTSM6bNjcul2ucUsAFYXlTm0SuTqWHoqsK9AYLIAl6kYlL1%2FhEucvBdMKixfGU0LmufKLgFjWkYrYrup20sGLVXHYqcCeDgU7rKZfvz%2Fm6xHgCkTsv%2Bxysv%2BWrjBsGVIsAda1bHpI47QAAXU6QJNx9srv%2FLxZlFk6lR0SPdJKhr0ccR52i1vnnpvE9Ke9tCf69twPy5QmdLnyb%2BK46lRpcFF8O5C5nYPckr3cCowS1N0AWronu7Da2NGNZgdu%2BEj%2BEBo5d6qNFI4An5o3HxsKLI2OQFk9wtVf7sZKsjs6C3%2FeFBxhUe8lYLjZsxRUYOLt0gweya31bye6lGsVYbqvR1GMk3d5Vb0ak6qABHTi7STT%2BEwvJq2zAY6pgHEf3cYviMEmDJ7d571VqEVnz%2FY7iP9Vi8QbLRhR9LOfeGvdutPSBsbPtbaaGA9%2FHzyPOHpOdLeH2CFrRjJV3r9bWnL8eJojTvjCPKTeoysvIlEB%2FqG0B3OBJ7ZCRVOuVQawZOWKPTPImat84J%2BCgwN3xa1%2BckYjxzYv8D9jvEGQpY3LPZvwc6wjDlC1YRWd4%2BhX73ZNt%2B2jrRvgfHEpAnBsMMoKUad&X-Amz-Signature=b0c90a046e04dfe6f8845c378d485aff47efbe7f17fc817e85dbd3071f17e70a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFIKOGM5%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIE%2Bbcm0cqLZvYpx1qgLoL0OrItMny5YmfD6eHBSoN7MIAiAr42tYVgVMM0JchlLBZ3FcrhpkyLWmMTYzEBKr5%2FwKoiqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMx16GssO1U9myFxsYKtwDksUUj8jLbn7sQX3aCHGFL0BOnbFySA181fegLwYJY562DEPFJtbZE14hmo00HgyPv64iWsLJ%2Fl%2FiBbo86HdshS9I%2BM22OAZIqJN4%2FMg0WdxUl4fmm1YWxBId5d43tRGSfR0Il0fT69mMFoQH4ubjxp0LeulqwPm94ZwuCMv9JwBvbna91SMe91zawL5OxocMpA03HbwwvnGnLBbAte3T8dZOWFNiAyzhFOh3EMVBn0isoVbb0TIpN6Ry%2FzEO1Qx02iEPzK%2B3MQCNhTSM6bNjcul2ucUsAFYXlTm0SuTqWHoqsK9AYLIAl6kYlL1%2FhEucvBdMKixfGU0LmufKLgFjWkYrYrup20sGLVXHYqcCeDgU7rKZfvz%2Fm6xHgCkTsv%2Bxysv%2BWrjBsGVIsAda1bHpI47QAAXU6QJNx9srv%2FLxZlFk6lR0SPdJKhr0ccR52i1vnnpvE9Ke9tCf69twPy5QmdLnyb%2BK46lRpcFF8O5C5nYPckr3cCowS1N0AWronu7Da2NGNZgdu%2BEj%2BEBo5d6qNFI4An5o3HxsKLI2OQFk9wtVf7sZKsjs6C3%2FeFBxhUe8lYLjZsxRUYOLt0gweya31bye6lGsVYbqvR1GMk3d5Vb0ak6qABHTi7STT%2BEwvJq2zAY6pgHEf3cYviMEmDJ7d571VqEVnz%2FY7iP9Vi8QbLRhR9LOfeGvdutPSBsbPtbaaGA9%2FHzyPOHpOdLeH2CFrRjJV3r9bWnL8eJojTvjCPKTeoysvIlEB%2FqG0B3OBJ7ZCRVOuVQawZOWKPTPImat84J%2BCgwN3xa1%2BckYjxzYv8D9jvEGQpY3LPZvwc6wjDlC1YRWd4%2BhX73ZNt%2B2jrRvgfHEpAnBsMMoKUad&X-Amz-Signature=a2a33af173d090dadf167e40d4e90fa9ea0ef0d9a0a1c9b926594217eb778a5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBHGPRGR%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIBUg1IXFhBA1zE7P2N72WI3qgRWwFEgrzzwgtYjybJ%2BiAiEAzhU1Emq5Fh4Dnufvercc77ImrbP%2FDTUcUd7gmbgtz1MqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPDk%2BSWBaG7D7C1y5ircA1sigYJ8%2Buq76Pi3wVig7hBTwYvJ9z2mmZ3ut7%2F0ejbB9La%2FwMIRHz59xQj9coYAWqB5GXd7pCg%2F14VsQ3O4bEOl1BC4OUZjhTWobjBwU9TJUdV6Y6oKYypdIi0bPbZ7Or3k2OvOyWOnN59FrnUSoOXdatd2KUlFRw02fcrh0%2FjvrbFOvXAjW0Ez4tx2paD15RCebhd0xQw4ty4G662FwbHlvjstOgdB5lny%2BT9HrQz0EFITk7YQEDxV0K5FRyK74Th3yPMDOMOFMp9cCMiilGUDhRlNuzgy6fw67%2Bd1aOYnWn5Rr39j2bwBnqEz3mQRLv1L3lZc97%2BQGQFwUt%2Bij9B5hN7xawQduHF4Ex8XeHd9tfGA9XCPeQf2PH%2FWg0G7hpQbIp3CAgvcumw%2Btt5mpGUacbDmsEzAnAYr%2BR4JVDGrPc2dUSEaLwYOEFdgW%2Fw8a6%2BxJyUh7WiQnxmvPdr9dAy2egwSa6FDVVnhKgpJ0WJKpCMrNokKJM%2FhYfcG2jCo7%2FmH23BQW%2BS9yDEa%2BK9io536tSl7Wix%2FBiiVHmOn7YSOJuVlrrlJ6qzoHsokgReFX6OqX9jfnE6RBfY5EX%2FPvRt%2FdZP4aXA3WPubqpnANu72DXiaUBesGvy%2B020LMLKatswGOqUBBEYfbf%2BE3%2Bx4L6coeI27uzVYVKZeGQDH2CRNFZGwc8MAT969wW%2Fqt7mHc%2FCcucD7gPwhNls39ZZC5bE9hqz4NFBBfLIkqJpnUBJdzI4Csxla9Im%2Fb%2FeR2YNN4W5pQhGek3IQ7EgUIKgqgSApsL0l%2Bj8dU15qJXjJrN36Ue55rWhxYr%2FuKtSr31L91yHZmkASJPb2qdevb2oYs3UWUlFoahdVpTuu&X-Amz-Signature=7904cfd3341109c48f5f5f06509d9fdd647da63e343dab748424825fffbdacdd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SX5EFJ3Y%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIFNp%2BgyQJMb7iteDvXHtOKU306KRGDjefK73JZULqHxMAiEApE1ZWQgrUH8b3LyAAa9iJGdCVvkItR45URIWRkXGDMsqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMy7XDVdY7krHhY1CrcA%2FwwcDCAWbKBLLgUimwoYWuLU%2Bk0FyAVXWvxdFpNsJX7%2FUP4vzPjkUsbxdsouSCgbW%2FN5EflREiXD%2FFGYZvjNMsUHNtSROrNNpMAfwsEfghuRpXm9ExFtyHMKeV%2BCNiHqxI5emvLbIm8UKwcFaG3b2CUsAlaCQClVVK1jkJ263oDRYPtezSYoKaT7M1uruS%2B3z5I6no0a7ppBPR72wPCaQ8Gt0anzjsCjAL3vSRSEntFk3635EQtGM%2Br3cnIYmFu%2FDJ03io%2Bdvl0jyNF2Af%2FGmUTPr6WX0VP1D68qSTe5%2BnKbavXvA4vrLP17ZHIf5XxwfjHA4ISDD%2BbK3p7i8dkKKycHWfDILXUFzqP6WmaHIJG91PddJ%2BciiwueBIq9w%2BEAvzUvJVY3WLaWR5zDjMF2NEp%2BBj0lBCfU4G21qxD5eWYMzxUAa7edouM9pP1sTc1um2hVIx6ApCWV6d19AqF1rVYZvkfuvxm3PykAzCk9nRzFKy0Hsxqle18gbXrppJmP6smksw5HvCgzdLoc95DdYHrgB05W7zBQvlCZhzOVZWZ8gByidYwbpIwzTpasnekuid028%2BnAFiSwaV0YqNxRAlKTLVD9lMyysLIJ271wGven3e23ARdsba%2F648dMOuZtswGOqUBvqg7neawfOsDVg2VrPzC3cNXL4c8EVyHSjoDsEbNiKKNWXZBDJ9g6bwcXkX5E0TTC9Sa1YHj73ey3fyFNghjw0UKlDR6t76vd0hfojIpWf91bwCjoaRq2ZiXwaG5Lm5ZrHmJlKbGZ4ymTKPdmHSBBSnLtHWGgUnOB3MyhmS9Fl6mWwg12mek9sviYszC%2BvgI254YpgQVXAtWvZ7Eef1yMCp%2BKBjO&X-Amz-Signature=28961c0ab02a7b32be05cce02e0479e11767af786d006492d7c605d569283ba1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SX5EFJ3Y%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIFNp%2BgyQJMb7iteDvXHtOKU306KRGDjefK73JZULqHxMAiEApE1ZWQgrUH8b3LyAAa9iJGdCVvkItR45URIWRkXGDMsqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMy7XDVdY7krHhY1CrcA%2FwwcDCAWbKBLLgUimwoYWuLU%2Bk0FyAVXWvxdFpNsJX7%2FUP4vzPjkUsbxdsouSCgbW%2FN5EflREiXD%2FFGYZvjNMsUHNtSROrNNpMAfwsEfghuRpXm9ExFtyHMKeV%2BCNiHqxI5emvLbIm8UKwcFaG3b2CUsAlaCQClVVK1jkJ263oDRYPtezSYoKaT7M1uruS%2B3z5I6no0a7ppBPR72wPCaQ8Gt0anzjsCjAL3vSRSEntFk3635EQtGM%2Br3cnIYmFu%2FDJ03io%2Bdvl0jyNF2Af%2FGmUTPr6WX0VP1D68qSTe5%2BnKbavXvA4vrLP17ZHIf5XxwfjHA4ISDD%2BbK3p7i8dkKKycHWfDILXUFzqP6WmaHIJG91PddJ%2BciiwueBIq9w%2BEAvzUvJVY3WLaWR5zDjMF2NEp%2BBj0lBCfU4G21qxD5eWYMzxUAa7edouM9pP1sTc1um2hVIx6ApCWV6d19AqF1rVYZvkfuvxm3PykAzCk9nRzFKy0Hsxqle18gbXrppJmP6smksw5HvCgzdLoc95DdYHrgB05W7zBQvlCZhzOVZWZ8gByidYwbpIwzTpasnekuid028%2BnAFiSwaV0YqNxRAlKTLVD9lMyysLIJ271wGven3e23ARdsba%2F648dMOuZtswGOqUBvqg7neawfOsDVg2VrPzC3cNXL4c8EVyHSjoDsEbNiKKNWXZBDJ9g6bwcXkX5E0TTC9Sa1YHj73ey3fyFNghjw0UKlDR6t76vd0hfojIpWf91bwCjoaRq2ZiXwaG5Lm5ZrHmJlKbGZ4ymTKPdmHSBBSnLtHWGgUnOB3MyhmS9Fl6mWwg12mek9sviYszC%2BvgI254YpgQVXAtWvZ7Eef1yMCp%2BKBjO&X-Amz-Signature=28961c0ab02a7b32be05cce02e0479e11767af786d006492d7c605d569283ba1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7DEVH4X%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T093437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIESMIOdg8RN3krA%2FDUR3O2GURQc7M%2Bl9fWOYIN2t2zg2AiEApvVNww4xvbA7aJh1xluVTU7BrURh6jH34Ng6gkRtipAqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMVZw1NbLAMUghRqUCrcA5ZJHApMJbQ0hOUwSQvqXurilZO8oYTE6mQ%2FFvYzzEVouwXqLuX4tg7hp9KGjiS56eyOuqWvt3u1WFzmIZMIGCaOnpgheUf6xDUai1SikIIZ14fwO%2Bknmr3uy2%2B45gAi0bbdgjmWT7vJn%2FZgZrdgUGNxT%2BW5F2aFAYpF16z4FrmkgqgDSQ0gQeTSHgMehjwKQuAo9ENvQ6RFFLFHhQQPK%2FCO2AhreyAMBwe7czZ%2BWqyIGZnlAcuI5Raiws%2BJvhJ3xqGQkcJiBD1oXlz19L7tlPdOK43RsxPkaHDDuY0FVhexTOXVf78EK%2BxKhuOM5oDOHV1mTsKAeBBcnrPSiirzv0ujG7PE2wU%2FHe3kmOe9g2wHHrTKb2OIBXQP7vf85z5YN8kzCDVuFg1aHGbQNK9Zz5m%2BLqRabrcQqEcN28NNjkBiaRd9YcebZMZ%2FZAP6ueOkfVBK0IIkJHr9Bd3h7iAZO4cZxY2pMiaJZxcQjeC7905cRCWA9Cj8J9yyFeIU66z43VUM5N8MZKolkP7mO4OMGYb%2FUfXLONnpZQVscX4TUNVfq1jDkvK%2F8sT1gMoV1UE3m9FkbGf6ITHqg7E2ciJsaKcbUJWWKOUs2li1WkYU2ockm8xKUfUl3iiCY8O3MO6ZtswGOqUBDsbdq7ojEl%2FGtOvOaHCevJiRnhyrBLJCPU7f8bj%2FMnPiYqCyvI4O35TYAuheNQSf1sBzAAKTA022Rde%2B48kmQHvqm1%2BvgmNcR6md0YoTtIFu6Lq4oFFbKqhkgRc5J2T5Cs5mkHNK4Xfa7aqfe5I9mgC6eA7PP%2BONNZ%2BfXxVCm6KFSnKeri78SMWux68T%2FISP4N0OIhQGluKcrCmxR21%2FKGzyiHZS&X-Amz-Signature=abdd479a4607a431cb669d06ae7a745503b1239e39a44e452ece3b23f4367efa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

