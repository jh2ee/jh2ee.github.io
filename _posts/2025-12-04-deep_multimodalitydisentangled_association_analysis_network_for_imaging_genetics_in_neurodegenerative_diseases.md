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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XJ5NBDH%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQCkIM%2FOjSNKVYwKIe6o4V3bJUtZe92DCO291hizzzVP8wIhAIDqQLC2gAU842mLd29g6QUVOcukPOcNuu7%2FHLKDIQoyKv8DCEgQABoMNjM3NDIzMTgzODA1IgwuYdNB8%2FZ3JigApwEq3AM3kmlW8tfFJX4npqcl2hz8msvmormyQSbQH9f1S6Z3A4vVmYB8il%2FL2lz%2Bt%2BqA9R8A0f3mBDYe4gN5y5RUg3X7JrHeu%2Fvk0DFW4OqbYRRNRT0uSTiYeRMMpHfSB2UmQBjaFVd%2BhG4CMqwpvo0JGSyayQo6Iuxjrik439u5nKhRFaFuggCNbn7%2BT8GDQCJ0NlwZMUWTa%2BJP2i%2BGyOELzUREcQf%2B90KssmsN0YI1b5Efgzz8vIxR%2BUItlRGh5y83NhNSzdFNxXQ6M2V6DKzMOzhqnYwb%2BaMdj96A4Wkcf4uz7tULSVLc3PfUXoosEA%2BH9AtuiofAyd1XXfKqcSHcthjBRQmmEw2w4r6eEqDDTeJ80tcub82reh7yamjzACFgrNKG657s45P0WNfekqYUgvAEgYTpHZPqC44oBwtmKbNPNv1crr7lLXRmrgC%2FWyU0pj4uH7CQyE2DIKB9gjuKvnguWXU6LuJwgw1Ge%2Bdm6BQcsDlFJqe7hypIL%2FI1hghINr0KCAHth8%2BDvz%2Brga3uD3YeCDYuGFYq5iyCHgGhH12hL9Hj7Q%2F2nWT4bhRZD%2FI5utD7AWJsg4VlNMHoyGpeYFPkYdx7eSDi9uAP2V04b7TZ5wjDzhBgmzPp9khT5TDj8%2FjNBjqkAUrASplNI103FlaEWz0RNzjX22m7wYa%2FjVBckELipuB%2B9PqjFNiiGZvPvDOlypJoyzHod3L00TcLckEtuIIXAieuteuzCQVnsJ8ZTijreKCB67w8dSVgdmMjTqE%2BGbq0dLZT5869Ia4LNcICA0FgTneyP52wv928epY9YJ3J%2BoUhiFWj339XyBCKNizIVvCGE0Wjjrjpzl5jmTEIR8ztMJO5pswm&X-Amz-Signature=9290ab6017cc7eb582bbffd2366a95c0d3326bf88be397021d65e8e6c4c41cdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XJ5NBDH%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQCkIM%2FOjSNKVYwKIe6o4V3bJUtZe92DCO291hizzzVP8wIhAIDqQLC2gAU842mLd29g6QUVOcukPOcNuu7%2FHLKDIQoyKv8DCEgQABoMNjM3NDIzMTgzODA1IgwuYdNB8%2FZ3JigApwEq3AM3kmlW8tfFJX4npqcl2hz8msvmormyQSbQH9f1S6Z3A4vVmYB8il%2FL2lz%2Bt%2BqA9R8A0f3mBDYe4gN5y5RUg3X7JrHeu%2Fvk0DFW4OqbYRRNRT0uSTiYeRMMpHfSB2UmQBjaFVd%2BhG4CMqwpvo0JGSyayQo6Iuxjrik439u5nKhRFaFuggCNbn7%2BT8GDQCJ0NlwZMUWTa%2BJP2i%2BGyOELzUREcQf%2B90KssmsN0YI1b5Efgzz8vIxR%2BUItlRGh5y83NhNSzdFNxXQ6M2V6DKzMOzhqnYwb%2BaMdj96A4Wkcf4uz7tULSVLc3PfUXoosEA%2BH9AtuiofAyd1XXfKqcSHcthjBRQmmEw2w4r6eEqDDTeJ80tcub82reh7yamjzACFgrNKG657s45P0WNfekqYUgvAEgYTpHZPqC44oBwtmKbNPNv1crr7lLXRmrgC%2FWyU0pj4uH7CQyE2DIKB9gjuKvnguWXU6LuJwgw1Ge%2Bdm6BQcsDlFJqe7hypIL%2FI1hghINr0KCAHth8%2BDvz%2Brga3uD3YeCDYuGFYq5iyCHgGhH12hL9Hj7Q%2F2nWT4bhRZD%2FI5utD7AWJsg4VlNMHoyGpeYFPkYdx7eSDi9uAP2V04b7TZ5wjDzhBgmzPp9khT5TDj8%2FjNBjqkAUrASplNI103FlaEWz0RNzjX22m7wYa%2FjVBckELipuB%2B9PqjFNiiGZvPvDOlypJoyzHod3L00TcLckEtuIIXAieuteuzCQVnsJ8ZTijreKCB67w8dSVgdmMjTqE%2BGbq0dLZT5869Ia4LNcICA0FgTneyP52wv928epY9YJ3J%2BoUhiFWj339XyBCKNizIVvCGE0Wjjrjpzl5jmTEIR8ztMJO5pswm&X-Amz-Signature=9290ab6017cc7eb582bbffd2366a95c0d3326bf88be397021d65e8e6c4c41cdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQ327OC2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDY0vQdOkcxN9VFh12mIe3bQxeDNzyyBy75fBDtA%2BPchQIgBWQ7sQ8UM70c9%2FQHHOQjvGXQKAUjonyyMdSnYiOhkgUq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDI3KhFWch7dh1frSqCrcAx9Fpu9%2BuiMmeJyRiIblYdu2ALCUW%2BHWsgIy8rCk8AS%2FHQOYpeum0JuE4Dnd553tu8w18vR0B%2Bpz1AAVf4hg4Lnnu926Rbg6SVAA7KYL9hhq7iIMBDZ8UDJfJrCHmc6IH8O57swrTSCrRFRaIXxzvceK07VHwMR7afhDR3O%2Bosg2WMQKq72yXlKcQo%2FpyPzIfX9a1WfIHuCkwpbd4%2FcNHgN1MLM7YTh3XnIONrcWw6W4vdBTgM0ff1K1rU98RyVd8J1L4tQjC7s0K3gcoZj8nl%2BYWwuQuGbbk%2F5HEUC8YKD2K4fb2nSEh5wk7RpaC14HUzmM5gv3TV9DphifMqcOJlPpg%2BGHEFqV6UmmDscUrbJOLUo0grzXrtBEuIc%2FOkl4LLjT2eHdJEsSldYumTZwkDUk%2B4P33QDGhrl6B%2BJy%2BD7%2BFglPUAvHT3ZVIyNWFA7f%2B1XfzXPn99q0D3q33SU9Em4Z%2FeCSgoFC5nyK0n4DVMrE8TXzB%2BBD1sgFEjSUMdPEtkbbVesJVpBOOvDj%2FqpKCLKT7nWdJU3CH6Lm1YAaooB%2B0OaAxjtOfG%2FcaiSfhgdcEs2rtN0NHf5AXCUDlYwrvu6N6AfrIWv8w4v3W13Zlk%2FqGcqdZZWP7HK3Wzf0MMjy%2BM0GOqUB7dsVcmr%2Fk%2ByYdXawmfDp2aEkpB7HL%2FNoJjT4sBgziBNo7JeXhyv8ItK1%2BiXF5bJNoYti%2F%2Fk9%2BYmGU26XjNLkZ6Fyxpq3LorKyI2OManyXtvXmb8BTKZfE94w4f3772l4jrAPXznjFxHdIPaz4qlEKhdSo35O78sVmN5BvCuEl6JLyt1Rtm9JyuMTw%2B5bw3zuBgpdtdyzjMFtOOYIB1wJkN%2FOIeFF&X-Amz-Signature=01472a3cd148b680af0626fec2e358def1d641f9ee16b1b9e761ce71045d392e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667F5RLZQC%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQCKo%2F69JpBdLyiJ0wwFbDRIe5OArrctoU90L94cOZ1V2gIhAL95FKmbDQyPys6gZpg9E7XcS1RxsbsQZIHpkRpaQ3THKv8DCEgQABoMNjM3NDIzMTgzODA1Igz0aNOPefHQcRYoVnUq3AObTe5NJ7YCT2SjkEVSa87C0%2FrU7p36tUWH1hh5nB9xui%2BXsfXar7l6lW56yhSV4mfyatRJ2EsG5AZocOJRHJhuwDGQVPnOciIbIVNgtrAXmBhK8a5Imo%2BhJDCsnhPQMBm4JKLmRsFQtHB8VgNuE8TEdnjV33EwruVBpq%2Fud%2Bsh0MyXLYe4uh1nxV1Jt9bKrF%2FsqBkGkRtNmnav2KdOKmPxmIpSoXn3xZqryFPelT8UwoFy1DqCCDlNQBWEV%2B36%2FsdlHoCorGzFmsO4ehdKcnXyxEf3UtW25CLG2CTa5B7ncbiZiRYDXXxffyK25dEVGYf1fbWOJ1mq1jjbw9YZckB%2FI9dXtV23TvX1eTSw5Y%2FBs40QkDVTfs02SwCwwE4u0%2BVCraasaXGdGbYZxEDnhcr1Dld8IRdVSWKNKVQ7dn1CSgZ2yzA3IRAnBk3sR4JMSMbebHj%2F3HjpZIC%2FlkXxOwUX6gdHmbyCocJce0oErL4spyebYdejrrAIKwap5fZdY5gLqKD3uRaUNko1QFvha2nBtBNnoCsUqznEuK%2B22YaMkz9iPlTlygzsxDmXU4EnWYtd1XGvkPTnXB9uPDNCuXfUlosY94sN4Ahrg%2BqVyhwrdB1YqJgsqO05jkMeKzCn8vjNBjqkAT6S82Gh3oJ8KfxRCbXsC9ilSnbAWcaMGtgWETwD2krkxX5GcqCZbz8IwpkF4mE1p1kfUmSvp%2Bd3%2BlF4XsuhEqUT9WYL9X9iAUPjWzRjyLP5wYZoqdLMnXuKMS3OPAaNDf7THmQf4MSYRkr%2BpfZ%2B5WgZxf9Fuu9LVwKAfTIm5jhsrCg5F9T3wRDGd%2BC9ytKyyNbr%2Bw%2FgaireSTSKfTXN%2FgHtb1Th&X-Amz-Signature=cbd59cc8cd0329e3d68adaf0e9afb718196950e075896798afb5adc8cb42ca5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667F5RLZQC%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQCKo%2F69JpBdLyiJ0wwFbDRIe5OArrctoU90L94cOZ1V2gIhAL95FKmbDQyPys6gZpg9E7XcS1RxsbsQZIHpkRpaQ3THKv8DCEgQABoMNjM3NDIzMTgzODA1Igz0aNOPefHQcRYoVnUq3AObTe5NJ7YCT2SjkEVSa87C0%2FrU7p36tUWH1hh5nB9xui%2BXsfXar7l6lW56yhSV4mfyatRJ2EsG5AZocOJRHJhuwDGQVPnOciIbIVNgtrAXmBhK8a5Imo%2BhJDCsnhPQMBm4JKLmRsFQtHB8VgNuE8TEdnjV33EwruVBpq%2Fud%2Bsh0MyXLYe4uh1nxV1Jt9bKrF%2FsqBkGkRtNmnav2KdOKmPxmIpSoXn3xZqryFPelT8UwoFy1DqCCDlNQBWEV%2B36%2FsdlHoCorGzFmsO4ehdKcnXyxEf3UtW25CLG2CTa5B7ncbiZiRYDXXxffyK25dEVGYf1fbWOJ1mq1jjbw9YZckB%2FI9dXtV23TvX1eTSw5Y%2FBs40QkDVTfs02SwCwwE4u0%2BVCraasaXGdGbYZxEDnhcr1Dld8IRdVSWKNKVQ7dn1CSgZ2yzA3IRAnBk3sR4JMSMbebHj%2F3HjpZIC%2FlkXxOwUX6gdHmbyCocJce0oErL4spyebYdejrrAIKwap5fZdY5gLqKD3uRaUNko1QFvha2nBtBNnoCsUqznEuK%2B22YaMkz9iPlTlygzsxDmXU4EnWYtd1XGvkPTnXB9uPDNCuXfUlosY94sN4Ahrg%2BqVyhwrdB1YqJgsqO05jkMeKzCn8vjNBjqkAT6S82Gh3oJ8KfxRCbXsC9ilSnbAWcaMGtgWETwD2krkxX5GcqCZbz8IwpkF4mE1p1kfUmSvp%2Bd3%2BlF4XsuhEqUT9WYL9X9iAUPjWzRjyLP5wYZoqdLMnXuKMS3OPAaNDf7THmQf4MSYRkr%2BpfZ%2B5WgZxf9Fuu9LVwKAfTIm5jhsrCg5F9T3wRDGd%2BC9ytKyyNbr%2Bw%2FgaireSTSKfTXN%2FgHtb1Th&X-Amz-Signature=6e9f34ed10d3a9cf2f9e23b4aa3af889c74bfe5e853e65bea911dbae1228e548&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PQXEUO2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDGP8XbUWoIq%2Fz6CJK%2F28r%2FBESNjxlL2X20I2vOQZXfmgIhAOH%2BDpFB78v56kxTngGyjgF%2Fp1JWBIgfPh2IhwKV7HdtKv8DCEcQABoMNjM3NDIzMTgzODA1Igwrik2yC8%2BiQDvz62oq3AOGpiu7MnoToklmxrWbnOgmg%2FH3aKr3MfhRq4M6Rya%2FLcG%2B5531O%2Bo3gVQTblvP0ErTt0P8kdX2PMM25KiuREIvA%2Fa2DWxAkzpE0gAuNotX3XU%2FNuGx448iEfiF0i5JvNdYlD4yGHMh6A7FpMKo5VWP7UyqMoyBzHnMfCzejVUuP5qn%2F2bbeFYFeeesH9fp9Xmi53set%2FisaLiggVjFZvoiGGfk4t%2Bm9r%2FK3ruu7zRe8pEkPHvXfJ4ZKgsHTg0j37IiZPRzP1WzFLqp9BJN7Lr3tfmP6oKpr44TMXd1jebDSRq9YmJIm%2FN4qxhRPs3nZY8pNa5MB%2F53%2FXze3TAs8pCkZ2LTcr56VvQf4yYTXsUKrSUChZ%2BTQ8aZmD0SoQaVJWdMLQuQ9BpxGwwbOxLZhxwpu6VmyXWOTrj6kUcaCQVu%2BpFGXcmZmdgLAJXPhtETjKPltZFdHNThOGQRMYTXB8EudJyc9BaadAVNQdoztMixpjuAaLzst4tw5HFiiFHwb9b1JJu0yTqX3KPhOCRKiWP%2BNCBPTc%2Fb7LB1e%2BSFw9quaE12rwRVr7z8E5Hle11XqgrzHh53WHWptQPYyt%2Bv%2BMQzzO8qIf5fQou1jmkRc5mKfQG1gyXNfhwqAIHc1jD%2F8vjNBjqkARgz0t2l6WMKAvJGnVzuwkmJAgn383k8qwmcT1fIW8j1FZSoz6NN6hFq7%2BPNLkJ4A6jWvhmRjFdgVlVFNHQZjqsypQZNNFGVZJvdjRHwiIkPoJ%2BVR8VvhISJwS%2BOBYji1DCICZS%2F1Ht2sWKnprSLmgxhuzBmN3ZVsWsszijID40NIL%2F9pa5Fd7CWhLo6B5JyqnVU6khiW%2FCMLA%2FFv90oZ3lOOrpv&X-Amz-Signature=256930f7ace26dd73cb7567a990ee8cd92fce0265458ce08dc7351acea5018c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKONRZUH%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072415Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCICrwjJY4cHv9bYQYuiprR8iDxi2slmap4Em2uQB75xiuAiAjE44NpuQAAcaufuF6FvqqyPYUCyzr7Z8NNcyyHRxhxSr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIM7Q0bA4BH0thLVDlYKtwD3WrU9Zoy%2BYRIgOdTMVGXkBV%2BIKmXwGmuJbwd%2B7qV9VSEKzweT%2FrGzIfMeGoUtGEUTLEKFfkYpkTnirPVa1FxP3Z8SdLZeajWXryemVcjcbT0W6pq9WhzsGWtE8hkgkq6%2BFXjjKMl%2BiwKgQqOiXBdOT5FEZJvA5qQ%2FE1nwTU9Qs%2FiNcEnkLXoOfv6GU0H1Jg%2FcAPtcVe5Z%2B%2BGgJu8tNpOd%2Bz%2BBY%2FotVvltmSJOTQq3eJ096jzwm1GmkrdpPaYiI22ngsVbEFSOm7pFI0n00TE2fA4xlyNBTdq5LTDLxhlZXxo1PbiI%2BXGMky5V4oAnOvvSvN%2FWY4rqAXC2YN7NHzYnln64MFGjv9kqT9WfJcwejp06igMRXI6yX17gkz1S4iokvb9hIjnc4SG1bSI0VNLQcjv31gkKw74WhCCIQo%2FWnIHDLtK0%2FCouuIhtMbtx%2FgUWd%2FZRDSLTXO30kK3B1BI%2BzK2BFy1pPwyyRCWbh0b8OufbMuKiVfrcJcQeAMco2WxT7W9YfDYKTy2prgPWzjnRe%2B7170HqHi2na0EQx8fgNM%2Fo%2BPb7h1o82rJ%2BLDqSs5m25rgkxPILFGMt5MiFnxZOBJg5pJXNRDk4Bn43ddEVkFfOOYTOuts%2BQizSeowyPL4zQY6pgE%2FiI0xHmrjdmCIm7MqS7a2UsOy%2FTSnslvnphyAjVZDQPqdKCFpQR40%2BrdoMUZtBCQohSyl2hawR%2FBnNjTwqTjMxfMwo%2BnZJLINyx0QtG8ZWXXKaXKCmSMLN4ZRdOFihDpAfO1BTInyoRu2AZbJMQ%2B%2BEcXY0J0G%2Bk9jrRKNZ3mupmbUKT95TtaLfvcNwmbqwaCsOw6JRLau9t%2FuFjGNQY0mbdPFp3BF&X-Amz-Signature=5a432fc23c633ffc5b8d4a62d49cc7baae97dd4025725172089116790e2712e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCUOEC2I%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQC0hevSM%2FaXVWlzVH9xy%2Fk23LM%2FK1sYy7KteCYD8Wh3%2BAIhAN5i68tezjKLZEOAFT%2FEDe3clKYTruWQbuTqNkXDE6OwKv8DCEgQABoMNjM3NDIzMTgzODA1IgwT2gpRlxGQJYuHH9Uq3AN32wPxRFo3OgxgbomEoOnxN72b5kS99p8uyblzakkAh6WlxCYCQXRYCT3kq7QrBw9Zt%2FvUYkXuVOmwyVwi4e7JdT38FRYkqOodI5ECcM5HMesxo3xED7ujwGoPK4MdT7rGW8g37PKrKDd%2BbtN131SpLmMctBy2oHogoxl%2FA4b2Mk8HaiLQQwWYvQ%2BeWwNIpPH0VQifd%2F6jEJGbQk%2BDO51pfZHG3aJmMj2ep%2BkLGXvDsV7i%2BmrOEZ9rN9bhMXZ1wTx%2FYOuUiGrcqh4qRYP1HbldxWnM49Rtu61HlmO%2BcFSTvGDNq1fcvwB9qpQ2l8ZNMzyX%2FHI3Qab9gsaL53MAPtIpg8xD2W7%2FMI9%2B7LmvheDydKufYcYfzPwPVL4TD7wrlefn1eZGY%2FC4Kd1ZzVDrmm9WA%2FWIF34S9iakqfRuWxeV41gLGN8ezR1j7jyx4sG74JN%2FMi04rGQ1yNVuYNxWgXpoiUaWUNR4IpBVH00NmTKG6H5e72tkkuKgyJKCv6srW2O4gpp8rSoY1UapMPFXeoCnrJUc76OGPBVjW0d2GVMJezxs4zMDa119XXkQgJpdyYmBJprrxcLPQBLdlIBsX2IE8BS2Txm3iPghtSQ7CwqtyKeuXTZTAF%2Fwo5737TCL8%2FjNBjqkAY9%2FbeXc2RfvBOhHVWM3x37IU%2BI5q%2BXrPdS2ujZez9eytQ4zgRCT3T9aB1t%2BFvrL%2FZBeUFsLKBsnt8dngRwqQEmEvoax1tGgAF640B5rmTl%2FCiuwBJyU%2FNWFpU6zjQWQXmIIoOE84aiqzXGZ4AlQn1Pv1QXdB3RPxqTaAcJNpM%2BzZFHZwSLxyFXv8Tb%2BkNLYEAE6b1Zs7N8rxeANpcQ0ZaP8DDFD&X-Amz-Signature=87508dc1ad83a524436fa29d7ce12c653018dbc560dfdaf806b2e1e51b3d8796&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPZDEJNK%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIAbe8xlncqKzWexJTVswuq1YnEb9fZoEeh0ZxmcYMdBzAiEAiSiPS1%2FtmZic7joXiRuQFDK0shyDKQFc%2Fy4Xq2Uk4xEq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDCStpjWVwduaijzh7SrcAy0r%2FtvCUR1sVnPuNBz1xEPTDePY2xvE6K286zttarze7GhLJXD%2FkhscXo8um%2FnoDVdxYPjAkeMn0DbvQTGI08xUZvT4%2FKlPHtpg8QLT0b9vG7EnlZlemuMz1A6fDDtItCW%2FKV1Pl5YGalLpWgtDdHQVb45J6%2BUOi%2Fhu6Vu7QkRvnzwKBRRrcOIlgbyOQkyiox4GxMq6eC7l%2FJ2tGtgTapZNM7402%2Bvq7yc1WOMCnnr9YAlEz4bDlq5q5gIeSTmtKt2uY8M3aCLclYXqbbt%2BEEmitCoV%2FgfsqUXsSj9COuXDdTLWUWJE15kUi%2Buci%2Fu9WndARAcsCiBM3Ox9t%2FUkI8x%2F0A%2BRRIjVImULzQ%2BDa%2BE9voDJXWN0Xs6HCw43wTXwY1Gpn%2FlUs27UISKdjCJTU2fZAC4YcBLLp7LQrVqwkRrjJZxxDRL%2BgBFtnzY8UpbqjIhZ7k7UKkoBS9halH8jkucqJC0bxVm7eg%2F70HzbBnv8rCkV974a6F5SxyRLBOymyGKMbYAKchKBU2y%2BUouz1msnpmnPbT%2F8H1O9tPdb0I64v%2F1gvNYivgGwjdA1gTqu%2Fa5qCGJPicVzu5qbkvebjQIpnjRaA50YhQWRC5nd2dAyF5Mx0ZnyeCL40OMxMJby%2BM0GOqUBgMEvZljrPDmHFbLs03w9iUaBHxAdA3ofqF6Itrj59SqBtA%2FigxjP1VFMQsgLuzRvARwhl7k%2Fotyt39CeIq7MnA1MT%2BT%2F4Vv9hiNXD24jSXFkttzcwjGsxCO9D0jBaPqDU1OfyNUQ3xuZZhIYidoGPTVqwkTf1sf1h1iDLZLDKJfLiHyXaULdW%2Fk8WDBzo9MyqircLRu6FKfDmaiNFpqboLJW5rJc&X-Amz-Signature=705fa74a4d87edc32e4d3bd44e6e2fabffb541a9f957f07f6c76e48714ec66df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPZDEJNK%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIAbe8xlncqKzWexJTVswuq1YnEb9fZoEeh0ZxmcYMdBzAiEAiSiPS1%2FtmZic7joXiRuQFDK0shyDKQFc%2Fy4Xq2Uk4xEq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDCStpjWVwduaijzh7SrcAy0r%2FtvCUR1sVnPuNBz1xEPTDePY2xvE6K286zttarze7GhLJXD%2FkhscXo8um%2FnoDVdxYPjAkeMn0DbvQTGI08xUZvT4%2FKlPHtpg8QLT0b9vG7EnlZlemuMz1A6fDDtItCW%2FKV1Pl5YGalLpWgtDdHQVb45J6%2BUOi%2Fhu6Vu7QkRvnzwKBRRrcOIlgbyOQkyiox4GxMq6eC7l%2FJ2tGtgTapZNM7402%2Bvq7yc1WOMCnnr9YAlEz4bDlq5q5gIeSTmtKt2uY8M3aCLclYXqbbt%2BEEmitCoV%2FgfsqUXsSj9COuXDdTLWUWJE15kUi%2Buci%2Fu9WndARAcsCiBM3Ox9t%2FUkI8x%2F0A%2BRRIjVImULzQ%2BDa%2BE9voDJXWN0Xs6HCw43wTXwY1Gpn%2FlUs27UISKdjCJTU2fZAC4YcBLLp7LQrVqwkRrjJZxxDRL%2BgBFtnzY8UpbqjIhZ7k7UKkoBS9halH8jkucqJC0bxVm7eg%2F70HzbBnv8rCkV974a6F5SxyRLBOymyGKMbYAKchKBU2y%2BUouz1msnpmnPbT%2F8H1O9tPdb0I64v%2F1gvNYivgGwjdA1gTqu%2Fa5qCGJPicVzu5qbkvebjQIpnjRaA50YhQWRC5nd2dAyF5Mx0ZnyeCL40OMxMJby%2BM0GOqUBgMEvZljrPDmHFbLs03w9iUaBHxAdA3ofqF6Itrj59SqBtA%2FigxjP1VFMQsgLuzRvARwhl7k%2Fotyt39CeIq7MnA1MT%2BT%2F4Vv9hiNXD24jSXFkttzcwjGsxCO9D0jBaPqDU1OfyNUQ3xuZZhIYidoGPTVqwkTf1sf1h1iDLZLDKJfLiHyXaULdW%2Fk8WDBzo9MyqircLRu6FKfDmaiNFpqboLJW5rJc&X-Amz-Signature=88f34441be2df38f7aec87ba05ed6ab734cf40e738c1929c76aba8e831affea8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6GAU4QE%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCICfXCZwvF3e3pAK5D4MvavlAaHVOUCnEraAm0nCfCzPsAiAkLmNDC%2Bm1PFBJAOiLEv1PMNo76%2B3rgQHvjF0nqWcZcSr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIM%2FUdRI8R3uq26W6PGKtwDjgoecQM1Fj9AUcGpCBTwAWA%2FdzXt6mJkStEd1SzGMhE4BlBiW13u%2FFd2xY4LfsE47ViTfn%2B08L4CiAhs61JoUHxCSbZ6IImRw2VMmu0dSgQiyZ0WyWJL4J6dT5PHirPQTpGCJUsg9rwny29UHzfRL4a2cEjsnye2zgYC8%2BFZ9OOKSeg05T6xezafN4LS74VhhpaEYWMi3%2Bwdd6463VJylIsB3SYZMeHzj91anOjOXgekcS%2Bm1sScoHkux2ptrKD%2FhEJ1I1Vr0gnjzWSiDMJs4BX%2FHZ%2BJ2jCnQsTz1WtjMBlUPzy%2FZDA87gRhcH6acYX%2BhqrVkVi%2Bb%2BS%2FBz99kmIgjGmeLPi21dsWKFfxeDKaLd7wa2rEddPyyi9hk82A%2FzSa7E14OcMkSLuCy6PquwlzE1CHBYWtXZxqeHDCbmLsDD%2BTpP0ZXDasVLCZ4pF63cdXgM1hqAECSVuMvqKWKbEBfEhEKRLQMES0%2B%2BUfWjMM9VtV4MspnMP33RB%2BpByOx5m9YbT1gSAsk0IcLBn2k8kMJcV43zOVyTEKwuBHNRKhkwTRYn9ypFmRcR78SSMRZpUlxzwdaSecetbWb%2FaCJ8c7Uyey3BNEaWikD5J2xlNgGtbhQg5OFNw0NttVT8gwofL4zQY6pgHioZfn4gTdvW72PzxbWCGLJRDJUIhOuC33dTryNYoz5gG9%2BSbWOpedObK8thYtOjew1%2BKNp8kO%2BdBcQgijjGyrfHeMInFTfUt38PIRtGceR05lwbb5RlELFT%2FtNGrPLVWhY%2Bf4wY6Lg5CXzA7qvRjOchgbeRwgyaB%2FYdJ6XcfhWfODkN%2FFU2KamPuI0bUciJnhqGmyvvXBCCWW%2BLlJelDpp3qsp9%2FF&X-Amz-Signature=1d3d6fa98898d30987fe6e0d9d87738d17bc4e7e82a603edc230af7c39381dda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QAFZLNP%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIAeP%2FPyMrW0JPrAvsISh5YChOQbyBNqS7AQjYe8E%2B7%2FbAiAbX2kwC6AkBjOspyv0SnAftSFjJ1%2BvAHH5n0DS7E2Rkir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIM1wqLVDo%2BjiVFWUOTKtwDhXvOTdvn5KVsFQm6qGq5bUYmcLoeVch2uzfxWNZp5GgXEPfLhCgwPs9N22%2FDU2H%2FqQ0caxtoj2nK%2Fh4pNtBFVHDnHFN6d4J6TtCVhKIvPad%2ByD9Wy7v1x12KCIc%2BwrGghSdkUR7%2Bcw9Gey%2Bb3Yys2%2B%2BhZSb59xd5IKjwC%2BaHuYMxiD0bMC9JLbhdWGExwSvnMLBA8clzlBAg%2B0ER7kIz5KmyEmIW0S1MIfHV5X3XYLnh2o%2Fp7lp8afdP4ZJ8BKBT3nrOV17SOQVJVEZclmhn2EB2aYeiVxSMHJlLe9KwKWSE7gG1Myk7UXO35vznop1Qc7JfLjlShuJlqy%2FwRAIWeulYiEY0VZiNbvKtfF%2FgWGkhPfUiwObFHgYQCk3pPtKqtZ%2Bnj91ykIAGXpkxLULa9GycKovunb7cuEFqHwFIOGal6TtItErPKP1EBcW%2BFCzvcbbGa7GF78Ofxu5jrP1UpU95cQDAPy7%2BMs6VjBzi8jiI0M0e3vQl6HKc0BDAZE0MHcm6FLKpXr6%2FTxvA%2FcfDuiUcln0StS59cBTB38zFs%2FiJ6QHKAk8j9NnNb5CZv1d5CNOEKPfzYFhDfq2UJvFNqOjM83%2Bghyg3qP1JYVBj5Eb8LlXYLMHm2VCHNG8wx%2FL4zQY6pgH6rUSZaJyZUJBoNxk0WErR2KxJf9gWpBgVaMTdm7Hss%2BIz8i%2FCmLDkw5JrtE1ouytqmDgHTz266aAMk0xKHA2eW2ohl%2FjA%2BuHwsI8dtiqMmNZb%2Btoq8LwM9hCg%2BqAD7y9nlWTjI3LbXLhm06vDb948aB92HjSbnG%2F10BWaKwqehf2Sb6dqDemCddX8NFIMSSw%2BCm2xUqPbuaflkH61xhJ9u0cOjooz&X-Amz-Signature=0b18f4e7792b39f73742bddeedd1a1d1a0bd75038194f6156d900b1a5a0dbaa1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QAFZLNP%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIAeP%2FPyMrW0JPrAvsISh5YChOQbyBNqS7AQjYe8E%2B7%2FbAiAbX2kwC6AkBjOspyv0SnAftSFjJ1%2BvAHH5n0DS7E2Rkir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIM1wqLVDo%2BjiVFWUOTKtwDhXvOTdvn5KVsFQm6qGq5bUYmcLoeVch2uzfxWNZp5GgXEPfLhCgwPs9N22%2FDU2H%2FqQ0caxtoj2nK%2Fh4pNtBFVHDnHFN6d4J6TtCVhKIvPad%2ByD9Wy7v1x12KCIc%2BwrGghSdkUR7%2Bcw9Gey%2Bb3Yys2%2B%2BhZSb59xd5IKjwC%2BaHuYMxiD0bMC9JLbhdWGExwSvnMLBA8clzlBAg%2B0ER7kIz5KmyEmIW0S1MIfHV5X3XYLnh2o%2Fp7lp8afdP4ZJ8BKBT3nrOV17SOQVJVEZclmhn2EB2aYeiVxSMHJlLe9KwKWSE7gG1Myk7UXO35vznop1Qc7JfLjlShuJlqy%2FwRAIWeulYiEY0VZiNbvKtfF%2FgWGkhPfUiwObFHgYQCk3pPtKqtZ%2Bnj91ykIAGXpkxLULa9GycKovunb7cuEFqHwFIOGal6TtItErPKP1EBcW%2BFCzvcbbGa7GF78Ofxu5jrP1UpU95cQDAPy7%2BMs6VjBzi8jiI0M0e3vQl6HKc0BDAZE0MHcm6FLKpXr6%2FTxvA%2FcfDuiUcln0StS59cBTB38zFs%2FiJ6QHKAk8j9NnNb5CZv1d5CNOEKPfzYFhDfq2UJvFNqOjM83%2Bghyg3qP1JYVBj5Eb8LlXYLMHm2VCHNG8wx%2FL4zQY6pgH6rUSZaJyZUJBoNxk0WErR2KxJf9gWpBgVaMTdm7Hss%2BIz8i%2FCmLDkw5JrtE1ouytqmDgHTz266aAMk0xKHA2eW2ohl%2FjA%2BuHwsI8dtiqMmNZb%2Btoq8LwM9hCg%2BqAD7y9nlWTjI3LbXLhm06vDb948aB92HjSbnG%2F10BWaKwqehf2Sb6dqDemCddX8NFIMSSw%2BCm2xUqPbuaflkH61xhJ9u0cOjooz&X-Amz-Signature=0b18f4e7792b39f73742bddeedd1a1d1a0bd75038194f6156d900b1a5a0dbaa1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S22DABF2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T072423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQD2IEJbqM444iXVnzqyYUccg7xui%2B4%2BxXlSMq35fINiUQIgFcjDVLKUZY%2FdX228gObA5yw%2B4GVOD8ZtRa5XLbaPaZAq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDBmiB9ruyfNbJQvpRCrcA%2Bax1LkpztZWqn9OBjo1eOOF9SpMJAAHnCBuBp6flfIqHxx%2BE185dryxsL%2FojqgA2cpsOZDbX7TLRZeqRY6DFkiHrBxbMLhvkUXAtJ902FruPAvpVtGjWtf%2BD%2FRRCImRqQg4sdlhAjufP5JwfhNkSNcL7s0xV8oRLXplmATcMBGODUqJmDl9GIxFI%2FuLORWAZSKuuVthzfTrCrKeU3IgQzhhtRBbtI7Y72NVGX%2Barvyby2fP8jtCHz3hboqDT4jZBInrQ06Ryr1l187YAFxQp1Z25wDRonq4pZxBKE4w9oC9sdvMXeT%2FSzaYCBvCOwhqJuGkGPwAko0wnNflQ8oYLYO5dy2CQfA1gegFlrBVdEGxGpef1wDP0h2wZ6%2F%2B2ecL97PyECk1mGnWR3sp4xZUg6Teu%2BqYnI0jEf%2FS3Q37rCMdETgo%2BBbqJVZjSRBSgxtBWH%2BVcjHxWKX5B3jeBYR1ZxhErf9fZSBEzajj%2FsLeCjEvf6MzaTG0hAy04Qi1hIFXgEtAKlcvbbYHkA313LyYcAAm5NjE7rLhTM3ha8HFBy%2B1p2ytuTOWh5UvD4QNNE9OzT%2F68%2FQuPrik3xON22qOQLcy7SWWDJpAr67hD1k3y7AyXbIwthE3oeigC%2BrgMJny%2BM0GOqUBgJCuyjqR9cWHmoBs%2FhRQfKQGBSpMd1tpGAVzfISreMoM%2Bj4vwr4wP9DA1h5CLAMUDFB38%2FVX%2F5TvQ1SUE%2B2ltKLWM92eWsg%2Bm4kCKy6LcDFTNMOmeUCcXwAKXvjUpA93599z8kvB4gvbax74b5VL4shPZrIEhKkc%2BmhtB9CNN0SOX02FPPwtFajb%2BbhbTvv8nr5OGUozQdNE59HYkCM786jbitTM&X-Amz-Signature=bb84662056c5fcfa0666ee2587f1620b57a47b09bb23bfad06b673b6d3e4439d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

