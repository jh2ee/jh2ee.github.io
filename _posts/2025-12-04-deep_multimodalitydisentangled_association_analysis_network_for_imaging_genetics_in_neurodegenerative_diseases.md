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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637UVWDGO%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIBn9oQv0hFru4pkl%2B7nkVkFq9nQZA1iBXJbUw9SzgV%2F2AiBQfnhE2HkO0N3mwHTeDpS%2B5r4MSCycOWYMqAnZ%2FWLRxir%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMO9NtvULSLcP85PXUKtwDmQJxVSgs1XsXfD67J3O%2FzAi58pydohUDJvQvVa0cyqdDsn6G2JJ724czFD5Vjugba31%2F7DHKhxm3vSNZOTVWi%2FAJJegmSYyN7fFVgNeW90hmzHww8iAK8Vt4MIaebmCkldClppu1a6n2YYxFB%2FGgqckSjgKNSrWBFW%2F8fKnrUx%2Fx6MdK2q01jqROj3nzNiZESyQA37e7TI8vosdx0wSuW6AYyD7qQ%2F4OZXA9%2F0lDihOxOvbo1NYx%2FavtimFHDORNUuz0okP2kTfdlVPxefzEmiocOeHxufJ2eZaIU%2FWo%2FlDhEYFHxcESoo3LZcn%2F%2Fsf%2FFpqs5bf0aUmaC5O8ZAI0Wur8SxlaZZSn1djyWzatS5rXSWpdBY8FZMxQ78EsVRRt7ctJj0JYvrUkUhXN%2BaQXn7%2BvTTJeidsOZdiW8BtUF8zg16tZUVjnka2W4LJj2p%2BJWkTG0dqh2A0DMUv6Zu828bWtHtAn6HDZwTpO8KFWUw9stIXTclgsrPd%2BNScs%2FW6a%2BbGbCfdTJ%2Bcp2%2BbcjfqbUxYD0%2BNVA2nfe0aZ92M%2F6gtAy9yspHsG%2FSc8jB1FklCUViQzHaXVtqj%2FVttGnWwbUtN3N7Jz%2BO8pEqliqlZ%2FJWyRHEjr%2FfblR23uWHEwrvyaywY6pgH9OzbD2fVpUs4Wf1p6%2BBVXIrbY4xIMzvAxLp%2FZdtKdTNUnrLGfh7D9k0ibUPRgSURkPq6bAIhl2wReKSb%2FSOe0i%2BsyjwYyzTcHPynF3TsneUx6WzyoYNYLlV9%2FapJxbA6cC2etXQG2jKjbpZGIFDIoZnvDE0eSnvFOU%2B7MKUx2gccn5VYHsheMVT4BLZoSfcKabMgE93MRlzBa9PFlojexnwCgEmMM&X-Amz-Signature=ab8baa78ec4df68b2d382991d97b591dbdd07d3727cd7018f2c51327c05e4b0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637UVWDGO%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIBn9oQv0hFru4pkl%2B7nkVkFq9nQZA1iBXJbUw9SzgV%2F2AiBQfnhE2HkO0N3mwHTeDpS%2B5r4MSCycOWYMqAnZ%2FWLRxir%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMO9NtvULSLcP85PXUKtwDmQJxVSgs1XsXfD67J3O%2FzAi58pydohUDJvQvVa0cyqdDsn6G2JJ724czFD5Vjugba31%2F7DHKhxm3vSNZOTVWi%2FAJJegmSYyN7fFVgNeW90hmzHww8iAK8Vt4MIaebmCkldClppu1a6n2YYxFB%2FGgqckSjgKNSrWBFW%2F8fKnrUx%2Fx6MdK2q01jqROj3nzNiZESyQA37e7TI8vosdx0wSuW6AYyD7qQ%2F4OZXA9%2F0lDihOxOvbo1NYx%2FavtimFHDORNUuz0okP2kTfdlVPxefzEmiocOeHxufJ2eZaIU%2FWo%2FlDhEYFHxcESoo3LZcn%2F%2Fsf%2FFpqs5bf0aUmaC5O8ZAI0Wur8SxlaZZSn1djyWzatS5rXSWpdBY8FZMxQ78EsVRRt7ctJj0JYvrUkUhXN%2BaQXn7%2BvTTJeidsOZdiW8BtUF8zg16tZUVjnka2W4LJj2p%2BJWkTG0dqh2A0DMUv6Zu828bWtHtAn6HDZwTpO8KFWUw9stIXTclgsrPd%2BNScs%2FW6a%2BbGbCfdTJ%2Bcp2%2BbcjfqbUxYD0%2BNVA2nfe0aZ92M%2F6gtAy9yspHsG%2FSc8jB1FklCUViQzHaXVtqj%2FVttGnWwbUtN3N7Jz%2BO8pEqliqlZ%2FJWyRHEjr%2FfblR23uWHEwrvyaywY6pgH9OzbD2fVpUs4Wf1p6%2BBVXIrbY4xIMzvAxLp%2FZdtKdTNUnrLGfh7D9k0ibUPRgSURkPq6bAIhl2wReKSb%2FSOe0i%2BsyjwYyzTcHPynF3TsneUx6WzyoYNYLlV9%2FapJxbA6cC2etXQG2jKjbpZGIFDIoZnvDE0eSnvFOU%2B7MKUx2gccn5VYHsheMVT4BLZoSfcKabMgE93MRlzBa9PFlojexnwCgEmMM&X-Amz-Signature=ab8baa78ec4df68b2d382991d97b591dbdd07d3727cd7018f2c51327c05e4b0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HLQ5OAZ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCnGbQswRPGWBCNCphJyGku2wLvCWXwJcj%2F0n0TvBY5OwIhAJJhynRsaZISj7FIUy44claXZ7pvHnNTiOP%2FPGfbvdMvKv8DCA8QABoMNjM3NDIzMTgzODA1IgyB5x6DTf2xIqJmPbsq3AMqhsYkg7rD6QpA3hKbm2ler4lsRWbQB1Am4jX8MTpdvCMNLq3YXEZgKQ9uPTZapYvwHgVhMPsRXEKz2XcGr5fj4HiffE22CiEpDdGlx5S1hOXqoaqVIdNKKmew61G7HiJLkRkdDP38U5F2iureuvCI4Yvsr%2Bp5GCnahSSinP8zV29DKnmFDG7eT0zh470Q6r57CuEYMh5sjIcGrtw0sKXMMaozTVoxu%2B9MTpg1Op2q53ir2s5er49uJMI%2BNDKSYOXFKMUE7eGfXs3TwdnxhZ0rDXRFcbPNxVXp%2BlxROXu00lgNA%2Bv%2F5JgGv7I45KM%2Fnd0HMeZwqFeU%2Bvu6a2%2Fc4lIMwdsX%2BQ5Su6BGH3HPoMWhXdtXoarNEbUgaBpy%2FDepMN1HnyrxXPOS6BuZd1Qyf4ehoH4CqW7PdrYjGjUYYPeqtVYmiyaQLq9zk1awUrBq%2B4HgDTCxDYjx%2BpsksqfoHsBdGMH8nepx%2F%2BHZrLVdUiC5DPZ4dAfAdV1%2BE7%2BEIAmb8DT8GyNyzSfpecUQB45mIkDCu12bBjJOB7ZAB5edJcsmZDch8H9YLqYuRXXrZla7HniVraSYA5%2FC2wms%2B9z66XDaxVXMj3aCMDgJd0LJ9Zuq%2BI5U%2FjHlgUO6vnR4CzCZ%2FJrLBjqkAZji29Da%2BVsdOBbm5wxBWAsPMypTE2K2gaIQiGil8a9mSr8aredsGDqobpdQA0bPYPFl78w%2FBM59EpC9wqDFq8j7O19TQo8o73qqUclWrD6l6m8w7psnOD9SdyPJpANRAL3bN8kT8vrfop8I7MoyYbCu9si%2BMRPhxJDay84EQIWjw7yR34EQ3GMK%2FfXl5EdlG1jZVyJX13jSnIJdvvCKdjhWtpJQ&X-Amz-Signature=889f3038c196b5e66a2900e276a8fa5ef26d45fe99606cceffeaa13560394708&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEZVFW44%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCMT3QKYkrZ4ttox%2BM6hjh0N8tDAqSaHISqeqzOl3H%2FmgIgUWHU5mmWaQy%2BByOPHAkKvaofB4hxDmEaXmieRXR5nM8q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDP2IUn3umfPG3L83QCrcA%2BH3ucqOMgPbmgpy4xGrLHJjNnF4W%2Bo5QUNg6sE2ahx8cX%2B%2BtZd9ABxNMiFxVpKry9vqTTZSJ2gHMsyWOk0oPm7SpBIX9HH6UG325M2Hqe4HrD%2BRgv3yRXSaI08FYI0YMtTNAqnbrLOJrkjGzzKVko1zNyngMn%2F3E0QPqS9JLeA7U4E%2FOjDeYkhOGcesmei91S2k3gSxwbWvEcXSyHqmqjyPfzv5JX2PCT7uhWte2qsuL2aaqiWRzLfRA202SbNqk3CxF9uhvyJoKBzzfyV41KF5Z4o8JfIBf4CMhIUzTRW0GfrY%2BZVWiciKSoTZYAV5FVVEV5PIC1u4j82mjg3FE21CxOFh%2Fu3ZCSS2tqrjPYXzWHw6GLam%2BLJBW%2FixS2wKBbaNUF52pT0SGCyBWKl2K7zYTYV07aPRtL0WNjxXnMIpVoM0JrSNzsgMRtg5ajGrxJRIgjkF2QcyIDIx95W6XjmD6ffoHDtdDrznAgZZ%2FxsudY0BjV65aM8%2B5yQcrvlxFmhFKoWo8rLeTajLfhHJLIWPaqdG5%2Bfun57W2bCA1ibNFdgZMkkXusdnkEPjptjIUqCunqYALmHQIsZbBBkqt%2B45L1aGq5MM3tXylFt8S%2FuRndLggtNVpfpCYvtMMLv8mssGOqUBBcYnjzndRdp8ibFsjAzSPfDKTJq6eh6KLdmMu%2BX6GciU79pSts5mhSKtbd%2BstOCcLeudF940nebnhCka7EZiUg8%2BwSwR3eu2mV%2BfS8QPECsNO2MHWDLWjYLdC2e2p%2FSzHQAL1u6fYg4pvPDOTdTxIX14ZpGFDXj9BpJtSsTyBrxQ1%2Bpc%2FXyjfLxQhHe%2BuF1n1%2B0SbcCo%2Fx%2BMxW%2Furfz4S6OmA4H%2B&X-Amz-Signature=8e8fafcc990af9123bce6d180def3b802bd5b5611bf9542acdc357ecbda5dafc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEZVFW44%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCMT3QKYkrZ4ttox%2BM6hjh0N8tDAqSaHISqeqzOl3H%2FmgIgUWHU5mmWaQy%2BByOPHAkKvaofB4hxDmEaXmieRXR5nM8q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDP2IUn3umfPG3L83QCrcA%2BH3ucqOMgPbmgpy4xGrLHJjNnF4W%2Bo5QUNg6sE2ahx8cX%2B%2BtZd9ABxNMiFxVpKry9vqTTZSJ2gHMsyWOk0oPm7SpBIX9HH6UG325M2Hqe4HrD%2BRgv3yRXSaI08FYI0YMtTNAqnbrLOJrkjGzzKVko1zNyngMn%2F3E0QPqS9JLeA7U4E%2FOjDeYkhOGcesmei91S2k3gSxwbWvEcXSyHqmqjyPfzv5JX2PCT7uhWte2qsuL2aaqiWRzLfRA202SbNqk3CxF9uhvyJoKBzzfyV41KF5Z4o8JfIBf4CMhIUzTRW0GfrY%2BZVWiciKSoTZYAV5FVVEV5PIC1u4j82mjg3FE21CxOFh%2Fu3ZCSS2tqrjPYXzWHw6GLam%2BLJBW%2FixS2wKBbaNUF52pT0SGCyBWKl2K7zYTYV07aPRtL0WNjxXnMIpVoM0JrSNzsgMRtg5ajGrxJRIgjkF2QcyIDIx95W6XjmD6ffoHDtdDrznAgZZ%2FxsudY0BjV65aM8%2B5yQcrvlxFmhFKoWo8rLeTajLfhHJLIWPaqdG5%2Bfun57W2bCA1ibNFdgZMkkXusdnkEPjptjIUqCunqYALmHQIsZbBBkqt%2B45L1aGq5MM3tXylFt8S%2FuRndLggtNVpfpCYvtMMLv8mssGOqUBBcYnjzndRdp8ibFsjAzSPfDKTJq6eh6KLdmMu%2BX6GciU79pSts5mhSKtbd%2BstOCcLeudF940nebnhCka7EZiUg8%2BwSwR3eu2mV%2BfS8QPECsNO2MHWDLWjYLdC2e2p%2FSzHQAL1u6fYg4pvPDOTdTxIX14ZpGFDXj9BpJtSsTyBrxQ1%2Bpc%2FXyjfLxQhHe%2BuF1n1%2B0SbcCo%2Fx%2BMxW%2Furfz4S6OmA4H%2B&X-Amz-Signature=82bc1a7c276c024ec8ab0f0996ef2695688d672ac601138fc368088e43d8c1d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMFHDCY4%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIBL4zb2h6ZXPli81L2XvaiC8tjfZdq%2BF4Wet9lW6fIkeAiB%2FFhMrE0w07FcmvBlzmGJ5EhdLE4gwuyr%2Bmd4GM1%2BwLSr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMVCTIbfwqokoOl7vFKtwDaM6RdSGZag5Y6uQaVpnJq9PCofAdthjDlrF2w2M2JAsTuyIHwC3eczdMurbdu0B%2FDUXiGmZy6iU4WTrk76ZvP27ki4n7%2BcVhLQLFQgnahC2G1VMzX9ZPuWmofOlIx92e%2BgcXMEDrPegSqBb6joLcMswv%2Fbka5z7qz2V1fV9v6yFKG%2BDlO0bocKXHzxpWRhXC1dfuZeoj5wBz7DBAZ4Lg6tnQ2EFbZclCFip%2FcJRVb4SahJRfGG%2F%2BIe28RYWGWhWfxRa4Pu7oWlPKY52ETXfiGNcyWXkIIE7yJrlhaQCNrClYTAkFjgqIhgbeNUiK%2B1H9LGB6Nd1g4S%2BgG8dOE2XUG99Ff8VihFfQalMF88kKXZBs3lbJnTmsdLLgJoFrks3SDj9s5f6NjF2hwlAwpiyTXeHXjbkk%2FNtMhivFvzSysxBlpj%2F2M4zMXPh0ROSN8j%2Fmv0R0XmzexKKQWrXDX%2Fz2f6oEPs8%2BB95sZPL2MHhpctFUGYtB6Iv4MC%2FFPCI%2FpVfoxfbaM2%2FCYAnzLNckR16T5wzkA8HTRbPxtPDZwOnkYRUb1uVPaiG2LE5Mu%2BwyIe%2FtiVTRNQ9UZiCyhLSHToSsPfZtvhACHxxoWzkBNv%2FE%2BAYs5C5hnBcWPOwI8sYwkPyaywY6pgEYHSxpmFfiytedBWd%2Bs96%2BgE1tyQ397BViI68BKNKK2PrNp4lQBCwLpkWJWvczZizkh4%2BRoy0rKxha8LJ5FHrNIKo428cymH1SqSrq9XMklZmo%2F1quhsMgwGTYTZhSQCfh0CFRe%2FmPqkaIkOadbawTm1Cb5BHLPwXysa1H%2Bz5zQCkGPq4vJ%2FtK8c%2FY8e8rgQhlM7b2gILCJw94jbqg8q3vHRd32anU&X-Amz-Signature=0e9027a80445d98f846463cb2e9a8da7a21795c41426125f4054efaf7f407366&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7Q3WBVU%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQDIzNmckwHkOvQMzPAni8CTR%2BRTuFUfegXRhxMLbONELwIgM8n1HB1WjVCP9JKdkYZr%2FV5dDSafYK5y9ngVVP9U0kwq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDE1Ar7qZfjDFmHPReSrcA7Ynj3DA9Z15G%2FmJw3n%2BA6c%2FaRDbsceJq2Kg10G3BVBaeleOxZaf3ZAGNrLpzUyR%2F35nuRaxc74bzw1F2Bu8lVE7eI7F9EESDz8UMBCXLaX1nQdHf%2FwnC0RsQB20ge6PAydF776QAhlDRKEGzbYL5NN20xymBzeUG6VGqwlpRpXG52wVZJR3pnxlzJIKpX2KJDgtjAw5hsFoDv1UTn6FY6jN%2F77AhWzyuqlWmyTGI6qn%2FAm10yREhlZHQv4c2qovWl9TiqeehHAJnhu1mlHDtFX8fC7Tmf4ASuUNO2VLO5DgNJiZU%2FcdUI8mU%2BvV%2FwXsIhtJWZPiiRi8NmciWpoeUZj7CL0eB5RFTSySByF3LibH0u%2BXXBuHOf%2FUQevDIAfm%2FDQ%2BrrgzXqf1yaS0zKy8konqurNID0cog3M9xL4DYdM9bu9sGf0UCz0eJQKvD4vowassFFvn9sia2BNPAnksIQryRXBjn8CPzP3e6y%2F2Yn5NJDotMKFzXdc%2B9reSmTYetQkA4Wc7dbMEr8WcHn9eIlMfiZHdM9rykPe3kdLcrtaLQoeamAJKzm5nJBuMZQLm7KUMfEz1CMVlZaXH5oJsRbdbKkJ3YFXWxczrasfQJSNJk3p%2BaNAxD4bLIbJjMIH8mssGOqUBFbGcyUX0r4GXa7e0q6%2FrP9wAdJlMaa7DJUUSh%2FL9MBoTkT2LvoOR2GUn8k3KQ06lN4WOKKuB8ESqFO7Z6%2BPwgj3be8JJzdI3QSejg3xahCwfJ5LOm7msGlhATIMU4%2F0MFBoA6jEqttot0l%2B%2BgpjnHu%2BAj9vc8vI8ezSPy01qFFzIogtxsGEawHlkaUhgXAKUhp0Y0aTwH8Gv0fVK5pDcXHNge2c5&X-Amz-Signature=e2674bf5ca7050bf9e266bf803225915e4648fe0bd39b9cbac36a4714b134d36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KS5RDNA%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIBrXklGHbsPaKwpG5BtwMUgVH8jsMM63n4CzD1BxhD75AiEAxPIoOoFfWjwXqbNWcFXQJLZH3BWOTInEUzTyVCfgeTwq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDNTQDQh0uLzvpYgz5ircA6cnLfY43iFifyUn8q3bIAGID1zae9yavRYbZggXqpVsnLxBD7wlYppIcKj5uxnvx0IHSWw8oyI51cGUYlvvP%2FP%2Bkpmh0RKWyozRZrwmHu3%2Fjfuw8%2Fk8oQgZBhgP1icpghYtHRne4JhQNWzwIioRKgxVjIGLtheC%2F3nyF5ECUgyViwHC4EtTvGpVDVLEyGXF9VyQTv1FZNbPL3RvvFqRCfwCG18F4AEcX1wBWLMpAlEXi0rOV1AWNvJmSmF1ogcoRFuSH1hkd%2FVfiGWitgNJrajiM0wXS9YJu4VUnKxK6lQJSDM73ub8YiFar9FTIz4fL4FMfyPXGLCHKCUTrlK87i9jneJyAnzx%2Bke8Fs5r7nB6AyIXhnxH%2FZo0Wgn5Cfla368a9dX4TUPWBwrwBnqeP5t%2F6oJHdcvrMs6D%2F5T9TU23gMTQumaQh0LBzHhM5l0fEYYPZw1IZWxrtbEJqM3gMc1AEzkklsTwBX4iRND%2FjRIyz%2BNauIfBYmYHihtBaMFNM2Sd7WhLPfFI1IqQx%2FqQnPbWAiipadxns9bxWoAsFtyyTtpbNzrL2ujt%2BPCJ4UoYCYcmjILLikyItl3m%2BU9AUUvngH%2FNfy6V84CrK6A7QckNuqnbZN6pp5kmsWajMKX8mssGOqUBcTJa1pF911AhqVP7XFPUBZp7ujipJP6v8oRvBLdccXTrSsbdj4riclK3VkXAhTZHngzTP6Talp2b16gBPO%2Fj1QA6jbTGopGf6Vdr2jSiGzw%2FO%2BtFah7hd1uYJKkxJb3BnrxnCX9lJRIkpOb%2BbSIKicgen6nPkVI5nYmAQCezzus%2BJuzwaCtX2p3TYuxuhYTiWGOYzQQB%2BRFydL8XzUS2iHXah4Wj&X-Amz-Signature=956af0c442e12496764a3817d016c39ce07ec834171bcb59f8d93f360b84a0c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DRMRFZH%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQDmSYYRHYfGD133DjRBp39DgC4U9ltbNxfwXrbeJ3fssAIgcrbSXh8PnhU%2BRUCO1zgGTeLwMvLsz6UvM7ptkyWR354q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDGSdd50S3lnJlr2pZCrcA1KZsKwEDet3xLuhAmrUDYbnUXlzxZ8h9ByL17D4S5EBUBQL3%2FGV%2BVAm56iXj8Jp4RpmcTzzUX%2FKr%2BWwHwoq6GBp%2BP6MrfsMj9EIp3VRdY05KaJbJOhpoqLfLwMGsBnDxRKxHOeBAicKZN1wuFUt6bTQs3iLQEnXZ7YC1pWfhiXaIkQCa8c6DDAtNrw4rmRaLZh1LlWh4G%2BVnBqP2nbaBCQPJr5Gh4e0KJqDioJVJS4an0%2FfVm7GDKZFUCGZtmDhmMKxTOaJxr3cxhqaPm8x8%2BhQagX9x9%2FSJdbiL%2Fwn3Q1a4w3pCAEk5AnrS2noqGUXWutMJmKfSTwm8k5OkX%2Bm%2FT2jESBA1F1yb3yFtlUoPSLolqE%2B5QNdUkQoevPSn6CZlgIxsXwpAk2hzThedt5I7OfQJfZNRx0so36030XwraVLoKNj2yCFVmC6UyEBaV4770aFlcYiYgDXxBvQNBCeqlGbPwZ59lTcVOUbxfe7umlUXUQwIjJhNQVfGL3NJgwcQmbCJXdd2gAVG7h6wf37B712uTjI0OM3X%2F709Ijtt3iuc1OzCDlV45MoE1StqcVJCIrFwmhYzVfgFu8EVNe5bSSxumC%2Bc7GX6rfVQaqQQEWfk03G3Y%2BcdTTE0oZeMN37mssGOqUBOwq6p%2F6AnXZcx0M1X5qioLvtoC3seEuQWencnJyRK91KHv6ggMIJEkOq1u1teLvrga8PG4GxcumjpDwe%2FsBRG29BYFhwAejSwP64wAMJRNCmYRTigouSK0Qwvt8c%2FMcCEqdj96Z8wxMaB%2Fh8StGn%2FE4Rv7uNGAmwEVyiKRbC7q1itv2swuG4J50sO7RwQehLPtnYLuU5BguOEby7zaFrImbhSm5o&X-Amz-Signature=7bee6fa8204425e9d8651af3fba8c4e8806751a041bd098eaa58958a225362ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DRMRFZH%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQDmSYYRHYfGD133DjRBp39DgC4U9ltbNxfwXrbeJ3fssAIgcrbSXh8PnhU%2BRUCO1zgGTeLwMvLsz6UvM7ptkyWR354q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDGSdd50S3lnJlr2pZCrcA1KZsKwEDet3xLuhAmrUDYbnUXlzxZ8h9ByL17D4S5EBUBQL3%2FGV%2BVAm56iXj8Jp4RpmcTzzUX%2FKr%2BWwHwoq6GBp%2BP6MrfsMj9EIp3VRdY05KaJbJOhpoqLfLwMGsBnDxRKxHOeBAicKZN1wuFUt6bTQs3iLQEnXZ7YC1pWfhiXaIkQCa8c6DDAtNrw4rmRaLZh1LlWh4G%2BVnBqP2nbaBCQPJr5Gh4e0KJqDioJVJS4an0%2FfVm7GDKZFUCGZtmDhmMKxTOaJxr3cxhqaPm8x8%2BhQagX9x9%2FSJdbiL%2Fwn3Q1a4w3pCAEk5AnrS2noqGUXWutMJmKfSTwm8k5OkX%2Bm%2FT2jESBA1F1yb3yFtlUoPSLolqE%2B5QNdUkQoevPSn6CZlgIxsXwpAk2hzThedt5I7OfQJfZNRx0so36030XwraVLoKNj2yCFVmC6UyEBaV4770aFlcYiYgDXxBvQNBCeqlGbPwZ59lTcVOUbxfe7umlUXUQwIjJhNQVfGL3NJgwcQmbCJXdd2gAVG7h6wf37B712uTjI0OM3X%2F709Ijtt3iuc1OzCDlV45MoE1StqcVJCIrFwmhYzVfgFu8EVNe5bSSxumC%2Bc7GX6rfVQaqQQEWfk03G3Y%2BcdTTE0oZeMN37mssGOqUBOwq6p%2F6AnXZcx0M1X5qioLvtoC3seEuQWencnJyRK91KHv6ggMIJEkOq1u1teLvrga8PG4GxcumjpDwe%2FsBRG29BYFhwAejSwP64wAMJRNCmYRTigouSK0Qwvt8c%2FMcCEqdj96Z8wxMaB%2Fh8StGn%2FE4Rv7uNGAmwEVyiKRbC7q1itv2swuG4J50sO7RwQehLPtnYLuU5BguOEby7zaFrImbhSm5o&X-Amz-Signature=274c24449fd37dc0c24749891edbf56a641575921b08390cac9fdced85b8f092&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KBYAFTB%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCitdXOGxOhAGcefp9S%2FC6JXiJA3aKG0vTSXbo0WZIxEAIgX%2B1%2B5OyIIl7l3MkQ9lcARE9mauqcJ3vpuhTBEZrh%2FVoq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDDdCW2yR2fVh%2FOUZeyrcA5SIRzms9kM8Bj3%2B62An%2B%2Fvp1CQHy%2Fc09efmDkyQIs5uSS9zqKBUOoTne%2FUwvsqMjpa3U6cDwD1QyXlSeaI%2BVHc3hluZeWhjmnWvJ%2Fdy%2BlIQKnPGc%2FO5ALskhRm5EZsZoHz%2B4UXbbNcTMm60V9x4H5e9CMJf3H7CwYowS07pn1%2BbW60SERD4Uj0NjCRtqfS5%2FybRanVBDDEg8bGekJr09YGiNrFOLvErVvK1LPwIe2ovQrib7lYLugJOjA38sTOKqWEpsaKVnkM1tF8OiTWEH1YreNC557Ji8EyAgPb%2FMD9IPrMFMt24%2Flguv35YzM0VvzSTVEN1mtuy%2BKMuyZ2jVsNXOH2S0hGdL6RAzuidlf6gZ2wu7ApSwtytSf6%2F8%2FERVOlaXpEcgTuom4chpVZMyoYXjoBny%2BQ0ZgZxxwmTikhLwNvRU8%2Fdbame1mq7AT25UqxUHnddpsl%2FzdIXJv8%2F6t1A1W5ceF112%2BVGiFUA1DPFWMaCktwzfWmeH8%2BqpNlp5uQTDHXddDCjc44RE2Pq0cbA%2FrL5Ylm94oCZKdNmPWRftlxesVtM3kphbKsQkLGrsUL8iRy1usKlmz787lBn4X1O8vdB%2FdKnEcR19sFnQDGknSxU%2B%2BpnPnzNROnmMOH7mssGOqUBdWtldESeyNMNHf%2FizDNw27V5V7XSimIbDmozFD%2FDWB90dCHBcwu8P3SAia8%2FeAcOZ3yOixfWDKJ5neN0C28BqR%2FOER186GOJmaFjZPAHBBrCMbue1AkqwtWvCzwTp%2B5xx1vy83wjYlhg1WhQiFHFVdvASNTAi%2FNhlZLfS6bbrYnsWuwpxfC4T9JjSzH9vq6uK3YdE1n8r85%2BNXJhy7JLagCzgwTN&X-Amz-Signature=9f0528f655269dd4a3f688fb63fa1213f2db8ab96d87f7b2f9aaab16e01b9cf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UETLTJV6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCICeW%2B19wFpoUsArWuwjB%2FNePF3uhyazdhgiH8KKJ7L%2BJAiEA%2FDr6kyW6UKAkw9Xfbspo13851XILgBTdOLZAdnT5dhcq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDG6JNB9SymmdSUTkxircA3CUY2OPiZoEQW4AgYoN93jW8h5dXk04qJgxYtev5xuZNSDMk3q2w41E41GGa5FMK92Dx0wcKFxt4n9xmpo5drGL1iuoLQkJCSiUx%2BryROEkcqiXgRb95TPw4NDql4f%2FMQh%2B581DO146ekT2JDsEc5yQCQK2OM6lDMPNh2ORT%2BhG7CaC4M%2Fl1MBqGV9z3rBv3zG%2Bk7zopN6h3hmOsa5ODSOqWuc51qNRrpvr0UJhduFmXJotw5B3Fk2XEH9knXEHmA1wwwb6yRtO1d4qwI1r6bzcYi%2B9RogMXUB2rbvz%2Fp427HUsj21utKxJEWZz9S7PKHDd6MyiK1D8qRQTuduDkRt7%2FgsSIv0FudkwTwJO19NR1stleczp8YIfAaWuYgdOBKP0lLARS7m%2BK9%2FxnZvO1zYc7B5CZaTBGV3Jo30gJbF1laoolnH1ocA7vXSPH9yOrHUk5ZZc0xcVYG0R%2BKrYd%2BxrEKbcCAKDPho2%2Fzh4qtV%2BGfQbk9ptx0QiAW%2BVurp8a%2Fjse1b1SSfGTTBPybHOhfAZd9ENLo4mP80BnUSitcbHxUCuv7mRkZpnULX%2B3UOD4njEc54gxrAT%2BAFBdG4x1rw27szOCdAPkWnVBi61Gf5xBaiQ92%2Ba78Rr7dczMOH7mssGOqUBOQ0bPh8JboO1vja53uFqOl%2FVg92II9quZgJbqlj0yN4o6OJz%2F%2Fb%2BPwAc1HM7zpOTCfseJM6WEBIdbhAxxAxSdLqypKY1ysuvQ4sX%2Fs%2FM66lgWRyE9hfU5bNoodrrTaHvupu8wMdOzIzU7Q2myB0V2Ii7%2FKr8%2FOMk74tHC1s0TxRdN9gI30cU9R4BWIxTBYcU7mvfALrcERkNwvZSMVVa9R5eqxnj&X-Amz-Signature=7e73779169e124e8b72834662daa4132f70c06ed3ba0a151cb1b658da49cd25b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UETLTJV6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCICeW%2B19wFpoUsArWuwjB%2FNePF3uhyazdhgiH8KKJ7L%2BJAiEA%2FDr6kyW6UKAkw9Xfbspo13851XILgBTdOLZAdnT5dhcq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDG6JNB9SymmdSUTkxircA3CUY2OPiZoEQW4AgYoN93jW8h5dXk04qJgxYtev5xuZNSDMk3q2w41E41GGa5FMK92Dx0wcKFxt4n9xmpo5drGL1iuoLQkJCSiUx%2BryROEkcqiXgRb95TPw4NDql4f%2FMQh%2B581DO146ekT2JDsEc5yQCQK2OM6lDMPNh2ORT%2BhG7CaC4M%2Fl1MBqGV9z3rBv3zG%2Bk7zopN6h3hmOsa5ODSOqWuc51qNRrpvr0UJhduFmXJotw5B3Fk2XEH9knXEHmA1wwwb6yRtO1d4qwI1r6bzcYi%2B9RogMXUB2rbvz%2Fp427HUsj21utKxJEWZz9S7PKHDd6MyiK1D8qRQTuduDkRt7%2FgsSIv0FudkwTwJO19NR1stleczp8YIfAaWuYgdOBKP0lLARS7m%2BK9%2FxnZvO1zYc7B5CZaTBGV3Jo30gJbF1laoolnH1ocA7vXSPH9yOrHUk5ZZc0xcVYG0R%2BKrYd%2BxrEKbcCAKDPho2%2Fzh4qtV%2BGfQbk9ptx0QiAW%2BVurp8a%2Fjse1b1SSfGTTBPybHOhfAZd9ENLo4mP80BnUSitcbHxUCuv7mRkZpnULX%2B3UOD4njEc54gxrAT%2BAFBdG4x1rw27szOCdAPkWnVBi61Gf5xBaiQ92%2Ba78Rr7dczMOH7mssGOqUBOQ0bPh8JboO1vja53uFqOl%2FVg92II9quZgJbqlj0yN4o6OJz%2F%2Fb%2BPwAc1HM7zpOTCfseJM6WEBIdbhAxxAxSdLqypKY1ysuvQ4sX%2Fs%2FM66lgWRyE9hfU5bNoodrrTaHvupu8wMdOzIzU7Q2myB0V2Ii7%2FKr8%2FOMk74tHC1s0TxRdN9gI30cU9R4BWIxTBYcU7mvfALrcERkNwvZSMVVa9R5eqxnj&X-Amz-Signature=7e73779169e124e8b72834662daa4132f70c06ed3ba0a151cb1b658da49cd25b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627FDHNV7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T220135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIEOC%2Bm%2FJ28nLXyv9B1cxYvXrGrCiB5XF%2FmjaKw7lybZ1AiEA0fU2wI%2FJWuGVT1TZ7wU0JWnVmj5IhgsR%2FOKItqQuS6gq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDEfHvPpMOxqfNZj9ZSrcA124IDjt5t2D1BDD50JSB2HqoPyeXVZE85iRGnagJPrKoQ4eo4NbIfGhjA8UaMhxSBWAOR%2B0Fh28bhtf8AKlfMOTV7%2BobU%2Fzp4KL6MOkTS%2BhznGgdljiu%2BSACidXpbgEz1wRZn57Tj%2Bul8VJzXa%2FC2BaxNAz2zvZ%2FTfxH0CzhnVcRUNroJgRdRRG6eTAJELkKEtSIq7Iv4RGd1P%2FDg6tpMWEDxbPK14AzIWinJ%2BIXUHmcsAXv5xFtCH1vM4fi4aXCbxdRJWPf%2FNfwcpRTzmcfY88dPaWdAfZC0xBnnjpJnAJGl1Ebf2GesksS0hCqNELOPVec2JDQ9zhJQ1xcJ%2B3l4uNMBI8%2BqkFu%2BeWD3qVjHEzTdBfkOvNZs9M%2Fj0uE38CVkbE1RLEXYYSgJcZPdDr5rwAYqliMrMTFjt%2FGsCcm4eWsbWL0vpBBTjvT5U%2BS8WYHUBHSpCrhFMqTTmg8GKbmPd46a8Dei0OaYtXGQsRPyECk3A1Vvlx9tACPZEKLK7sS1wjvhcCiu805X34VzYhbeuiXFr6KYYuOqEAvVwr06dhs6v422CgSonpH%2Fz2yZrYUWVd766Gva%2BUjj86ZPPzJ%2Bt1S1Qcaxr6Amh46ohG2%2BqUL1t8okcHt7hkkbZTMPb8mssGOqUBL6gOmFVuxuvxCJw9QKZ%2FIfjbIhJjo9L2Ig2hp4WysgEmHo7lD%2BXvUA87VAqw7yc56JlttGEPvfZQqX6UWFHKCd90OCsoUbpGCvlmCphpnYQqCirixeW0b4igFRJzHC5W%2F56uI3Y3yGPdkFy5sHU49GL96VRvtTvcipG8rjnOR6NAYBC%2BiVElPF6nnudqp9L78%2FIKIS9GMu4s5RWw6JtFMR0T%2Fzta&X-Amz-Signature=3eb166abfe378a79391eab6346e3c66a280a7043088daf769353293c3bddefd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

