---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7F2KQHC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T080105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCD%2BYz9Oz%2BPRTUcYaRTMfcC4gnn1VIntRdXp0BdD%2FQTWQIhAK2OFSxgmujh52A89tHSWSM354P4nZLy8oDcgj623qcSKv8DCBAQABoMNjM3NDIzMTgzODA1IgzvBvqiMWNPn9uOR9Eq3AMoowEw9O3ZTy1CSQwoFFoRrIIm4Mco7bWEYvCk8ZKp36JlcpBD9MbQZuz3q7Lss59RJWI9pzWRjFk%2Ba4uondPEvr2EGDZkE7971WkUB%2Fn%2F9mcKnFbohHnkaju8cCJ%2BJtF0vxQ8P8u0pGV%2FkZncuSa73vnF4N%2Fs%2Bpf%2B6irPhVDqXJ968Z1YV7IHiiFNyeb6ylGznzIqVY77%2BY8j%2FuVJExIce068%2BQBASHG3pPK4gwfjfhB5Sbpk35erf8bzOATLb1E6MxOU0M9%2Bl6F8B5XKjEuffd0m1hmSA5qeIE4cszQtc0KsyBs9riH7XGKVakovkFuaHtn2bXqW476%2FsL%2BCJpwtsHjn27j4D7aPMBX3zBD7jcOFta%2BJ3W9AgnNMAO%2F0IcFQNTce0YhBZrpjuwshXDJ7D0%2BWAzm504Nas9qP3OOpfxxdPJJ%2FS%2F0tSCCGqPein%2FTdP0u5nxLTgi42D6wWYewBdqkLuYed8lbuEcXbbmfiZLQWC%2F5A45hNVMiGqJHUk1ofZc%2Bb1NWqNpHkO%2Bt2bprJKL14TY51R3ThHAYPN9cPihBpgJ8%2BFLF4C%2BGY1GVD8duJ%2BwR%2BuR%2FMh%2B3GkXA0MAOSglOehZ8JS0e30GRaDcrZjx9YzcPLm%2BWu15SHdTDnprrJBjqkAUQbparPm8d5QPPDZ4vtxBA%2BdJnTs8YdsXUsQ42zyfg2iP2hcnsRGXBhQgq85GIIjZr8SkIVrin8NCGK9UYVPyIwo%2FrfASm3zNsBBq1Wja4KD6iNv8i6F7D9bHb5z4wMK7tRGWAludcw5ItG0ZnsydTeGhbC5XbNvnREYwUMQohk%2BOtnpeISlTsGjptKc707F%2Bmoc58lIBPJW03PS7BBVHrB4PEw&X-Amz-Signature=5c20c2cc0b6dc991298ac9b6dfc6669ade062804afcb180ace35d73676023c51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7F2KQHC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T080105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCD%2BYz9Oz%2BPRTUcYaRTMfcC4gnn1VIntRdXp0BdD%2FQTWQIhAK2OFSxgmujh52A89tHSWSM354P4nZLy8oDcgj623qcSKv8DCBAQABoMNjM3NDIzMTgzODA1IgzvBvqiMWNPn9uOR9Eq3AMoowEw9O3ZTy1CSQwoFFoRrIIm4Mco7bWEYvCk8ZKp36JlcpBD9MbQZuz3q7Lss59RJWI9pzWRjFk%2Ba4uondPEvr2EGDZkE7971WkUB%2Fn%2F9mcKnFbohHnkaju8cCJ%2BJtF0vxQ8P8u0pGV%2FkZncuSa73vnF4N%2Fs%2Bpf%2B6irPhVDqXJ968Z1YV7IHiiFNyeb6ylGznzIqVY77%2BY8j%2FuVJExIce068%2BQBASHG3pPK4gwfjfhB5Sbpk35erf8bzOATLb1E6MxOU0M9%2Bl6F8B5XKjEuffd0m1hmSA5qeIE4cszQtc0KsyBs9riH7XGKVakovkFuaHtn2bXqW476%2FsL%2BCJpwtsHjn27j4D7aPMBX3zBD7jcOFta%2BJ3W9AgnNMAO%2F0IcFQNTce0YhBZrpjuwshXDJ7D0%2BWAzm504Nas9qP3OOpfxxdPJJ%2FS%2F0tSCCGqPein%2FTdP0u5nxLTgi42D6wWYewBdqkLuYed8lbuEcXbbmfiZLQWC%2F5A45hNVMiGqJHUk1ofZc%2Bb1NWqNpHkO%2Bt2bprJKL14TY51R3ThHAYPN9cPihBpgJ8%2BFLF4C%2BGY1GVD8duJ%2BwR%2BuR%2FMh%2B3GkXA0MAOSglOehZ8JS0e30GRaDcrZjx9YzcPLm%2BWu15SHdTDnprrJBjqkAUQbparPm8d5QPPDZ4vtxBA%2BdJnTs8YdsXUsQ42zyfg2iP2hcnsRGXBhQgq85GIIjZr8SkIVrin8NCGK9UYVPyIwo%2FrfASm3zNsBBq1Wja4KD6iNv8i6F7D9bHb5z4wMK7tRGWAludcw5ItG0ZnsydTeGhbC5XbNvnREYwUMQohk%2BOtnpeISlTsGjptKc707F%2Bmoc58lIBPJW03PS7BBVHrB4PEw&X-Amz-Signature=5c20c2cc0b6dc991298ac9b6dfc6669ade062804afcb180ace35d73676023c51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XTWMFA5%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T080106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCGkWGtAWbCskNa5dvUePnttdj7y1qmC3iFTpwJMBTNsgIgK1HsYP%2BSYu5Csusf4rNLtVJqwxJrdzJuW7UIZQF3z2Aq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDNPPkQpNFiw8tVU0QSrcA67sayB6hUfAHAFoIrlbvop92GR4C2KDGIAbbnvr9pUPeJYF1z9LD0ZrV1ADSIhcVPT%2BZiuRfX576N3R0AECqTeckUsUlb0UaQZw5vwGEmPBdrixRQM2RZe4JqKGYfTtmK1IUfPTPXYSidPpE6gfRulz0Lm%2BmhxaQYCXPhzDgf7HRSjRawPPyMM6hnqDfsosVtxSGrd8yauk0TRrfVBXawezj%2FMSo2Q%2Fwqi2OS8LHmBBc6oET1foMD3GKoY%2F9tAMYzWIspcY%2FpbXU3ANASnGJg63rcgTqM4CfKdl6SqGCyxaf4fNhRrLCIrARKHd16m1rq4LHgZ9RyO%2FVv89BpdwtpBUZXjvr8TlS2I%2BBN8ceEpOwJ%2FKXjq0NQPLdn9G6WkeTCn6sC%2BWbARTsh4djXW7aWI1Yxh%2F9kBXN6DRNuOngoORZmhC01%2BLfu%2F0ti041MwCWd5ny2fqAGxXUK0KZQFxRz2VpPjVw%2FQ%2FrqqRth5pvAw%2By8XEg8SvGmqYVqqodzUS9YoOIb3n25w2UFVA%2FjEz7owZV9qoi7rCH2OZSS4PcsmLTq%2F%2BaHLnJ2RQna2OUe29Zi8nZ%2F%2FnhwkT2hnzzd1TmI954gNYW%2FBTohiI%2BlRZRI1MLcwrnTmvyPHw5JtyMPCouskGOqUBz93OZM29ohDz55M%2Bckx82yCZQjF0bRigPyQUUvo5yUGZFM8FrCd0zxXrZic3Tirbtp37VhxDxqWw%2ByPFJCoeI4z2SYTM68ilPi6Zg%2BG9B2JtSepi1eToUng4nv%2FFPmQo%2F0wbhJzjuUQEMZu1W%2FJ%2FElMcOlIbsfbzNgn9X93RzscutoyPHZfPH1RdB5RUn4g85oFuDO%2BVKcH7cISfbBT442GSIGSh&X-Amz-Signature=b97e484060cfc4791a38e7c0c65931a566aa5d71fdb1a1883377a154fd7eabf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XTWMFA5%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T080106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCGkWGtAWbCskNa5dvUePnttdj7y1qmC3iFTpwJMBTNsgIgK1HsYP%2BSYu5Csusf4rNLtVJqwxJrdzJuW7UIZQF3z2Aq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDNPPkQpNFiw8tVU0QSrcA67sayB6hUfAHAFoIrlbvop92GR4C2KDGIAbbnvr9pUPeJYF1z9LD0ZrV1ADSIhcVPT%2BZiuRfX576N3R0AECqTeckUsUlb0UaQZw5vwGEmPBdrixRQM2RZe4JqKGYfTtmK1IUfPTPXYSidPpE6gfRulz0Lm%2BmhxaQYCXPhzDgf7HRSjRawPPyMM6hnqDfsosVtxSGrd8yauk0TRrfVBXawezj%2FMSo2Q%2Fwqi2OS8LHmBBc6oET1foMD3GKoY%2F9tAMYzWIspcY%2FpbXU3ANASnGJg63rcgTqM4CfKdl6SqGCyxaf4fNhRrLCIrARKHd16m1rq4LHgZ9RyO%2FVv89BpdwtpBUZXjvr8TlS2I%2BBN8ceEpOwJ%2FKXjq0NQPLdn9G6WkeTCn6sC%2BWbARTsh4djXW7aWI1Yxh%2F9kBXN6DRNuOngoORZmhC01%2BLfu%2F0ti041MwCWd5ny2fqAGxXUK0KZQFxRz2VpPjVw%2FQ%2FrqqRth5pvAw%2By8XEg8SvGmqYVqqodzUS9YoOIb3n25w2UFVA%2FjEz7owZV9qoi7rCH2OZSS4PcsmLTq%2F%2BaHLnJ2RQna2OUe29Zi8nZ%2F%2FnhwkT2hnzzd1TmI954gNYW%2FBTohiI%2BlRZRI1MLcwrnTmvyPHw5JtyMPCouskGOqUBz93OZM29ohDz55M%2Bckx82yCZQjF0bRigPyQUUvo5yUGZFM8FrCd0zxXrZic3Tirbtp37VhxDxqWw%2ByPFJCoeI4z2SYTM68ilPi6Zg%2BG9B2JtSepi1eToUng4nv%2FFPmQo%2F0wbhJzjuUQEMZu1W%2FJ%2FElMcOlIbsfbzNgn9X93RzscutoyPHZfPH1RdB5RUn4g85oFuDO%2BVKcH7cISfbBT442GSIGSh&X-Amz-Signature=b97e484060cfc4791a38e7c0c65931a566aa5d71fdb1a1883377a154fd7eabf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQIU4GPF%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T080105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIBu3WirzQzx%2FTbzAGYWRKC51o2zQKvEyEfdEwL6QKvFHAiALDFa4EdL%2FtskyTl0a50wH8NitOcNgrfup2a4p%2FNpDSir%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMEuVEaRH3nRpoZg3oKtwDfsSMghRUVB0Zh5BSiGI%2FQWfD8B7ZFAmU2NfZEDfXGE9kF1acJv%2Bg25gu1IIiY2G6tExqsGrqsMBTpqbEfaaW%2Fjt9%2BH690ICukl6cXkkVryFBuN8a69rR7LWxYCaHcCDUHmu8OT76En6q94sVaVv9DsJuwL%2BfJcZhCYGnHm5018CeiXTEwHtjYiMKmQk7i4VCW1RbVJ258STeKjn0F3qI6H8l9zoKrKLQsEvjJECTEjo3oC7ob%2Fen6af8CYWwT9beXnLeGVLCS%2F32HU%2Fw1GM9aSVJen7ASTiI05y4RBNoBOgTuQQWoKiG9zlcl7a6ZRoRNZbhMo39mtCW%2Bz1bD%2Br174oeZ6ad9pLc6mDLwjHRgi0tSbaJy1n1QCnl2p6HFtGcDsPnG%2Bzjy9SSKKNG%2FiBvui%2BDKbTSLQcc05WuS5QtZhG9H4eiuwNMkLtKQC0Zcxa2PgAamQYJ2aeQXKe8k2fQdJhL5ltCzhdsS62dhusqzLP3CWvFzsCBQ4M37a5gJs7dt3I88T4eOM99fFUCr10uUKmRMQPhagZUrqg0y60jzlKL7KSW%2F%2Bg8iht6QqUcue8YRvoHSqTPoOYRh1MuQ8vjggW%2BrLMR%2BfGPxHGGcGjz4MUJNRvmENDg%2FMP%2FV04wgqi6yQY6pgGmJEkd%2B9bxqoezhE5EG3VX2Y%2F8msR%2BsF4V8kgXUctmu7sjil0%2FT4gK%2B3f%2BLicPNfnBq6bisEXL20WF9%2Fj4nQlUMzav5rgjKvjGBNDBJfUgecSdv8RflyAkOEij2SuAbjd6uFBmy1xsQrFgxJ7JYKGXji%2BZHSG1uwkfu6dmXoauUrtu%2BS8usdl0X7TcO6kP%2B8rLdrCOwYfW861uTgX7XGWxbH67rB5%2B&X-Amz-Signature=f4ceb75e33343f19bc002ecbc0b2eaa8579b1dd6a964a4eda8409e6f07eaeb69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4JJFR3N%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T080107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDGbqC1EsYbSbgXOrQMOiydlcs5pIHRzEw8oipnGa9FCwIgIzen4U6F2qK%2BGLFzEI4%2F%2F0cidUK6LIuMrpmppz%2BL%2F4oq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDI5owyNkFd81tdcmhyrcA07UNiAKE1aFM9PHeYPQPA%2FAl5om04Nfpt1MecgycjAm79fO6O%2FX6042RV6ZAiq%2BOjZPVzsFA%2FK0xcEXqfOEZv%2FTwZKyRNa54mdd%2FAgS1Yh%2B4tw1ReT14I1CtaHsiMmVwtkBqhOWI22uYHBuClkRc6trDJZofkysFwF%2B49VDqUrMxMgUSSfhMr68%2FVLiXmI68bOSVtmXdREsMKnECf6jaH48Cvh24wd7hprtztaArH%2FdRC8f71de%2FdO%2F8sh7MEJaacX%2BL3An8USSDMcSYKcITByuqHB2z%2F%2FHvpPRZ8vNCUCKrb4BRiJPcQWbEMbA0FfA5Psl3N%2F0nbRpJYrG9uGAA7Vb%2B22DD7fBbWkMGYPocHocFZS%2FR9AlM9FW63I6hbDWsa6VRd0DusZgKPAR38%2F%2BXWn6ksdKnZ9iFu4PnujYsXd1%2FXM4mGfp6gk3NdFRPA1yksDNVhL9jcTXnTBa%2B9WB0rMWEjqvrtYMieHV597e%2FL3mzS6WAa%2FNRzUjWe8aARD6fBANJtAyskQCINQcMPugxd9LRboudDO4mWzkbZNYpIjGtSkmC3UVO2GqOX9nl1lJnrNrsTrlvx1naBQZyRxohqKSrjWRr7A%2FvOnV9NO7zom1GvUqgZPrMcPkvG%2BSML2ouskGOqUBsaIPmHonLAFZubQAmuKHkFrBQUogGtr1QrmF2WA4phROSWNBFxxXXVF1gXOFmvYkD2xq2ZQcuDnD45E%2FqY8Qbjkbtzn87%2Bo4VcCq5DwF2crFSBw4aUZ8x3xaTk9FfRA5zl0nfNqniiGRAaVkkL55oT8NrCSoDd%2BLfDY6I4PLVHWc25pUfE2TTqFK9KV87Hgp1NZbTcf26afJvY47SE%2FHEQjuJGUD&X-Amz-Signature=75cb727db14159ccd95ea1a72bf7a6d0e282b3ca2d5bdb429fea4e4816252beb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4JJFR3N%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T080107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDGbqC1EsYbSbgXOrQMOiydlcs5pIHRzEw8oipnGa9FCwIgIzen4U6F2qK%2BGLFzEI4%2F%2F0cidUK6LIuMrpmppz%2BL%2F4oq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDI5owyNkFd81tdcmhyrcA07UNiAKE1aFM9PHeYPQPA%2FAl5om04Nfpt1MecgycjAm79fO6O%2FX6042RV6ZAiq%2BOjZPVzsFA%2FK0xcEXqfOEZv%2FTwZKyRNa54mdd%2FAgS1Yh%2B4tw1ReT14I1CtaHsiMmVwtkBqhOWI22uYHBuClkRc6trDJZofkysFwF%2B49VDqUrMxMgUSSfhMr68%2FVLiXmI68bOSVtmXdREsMKnECf6jaH48Cvh24wd7hprtztaArH%2FdRC8f71de%2FdO%2F8sh7MEJaacX%2BL3An8USSDMcSYKcITByuqHB2z%2F%2FHvpPRZ8vNCUCKrb4BRiJPcQWbEMbA0FfA5Psl3N%2F0nbRpJYrG9uGAA7Vb%2B22DD7fBbWkMGYPocHocFZS%2FR9AlM9FW63I6hbDWsa6VRd0DusZgKPAR38%2F%2BXWn6ksdKnZ9iFu4PnujYsXd1%2FXM4mGfp6gk3NdFRPA1yksDNVhL9jcTXnTBa%2B9WB0rMWEjqvrtYMieHV597e%2FL3mzS6WAa%2FNRzUjWe8aARD6fBANJtAyskQCINQcMPugxd9LRboudDO4mWzkbZNYpIjGtSkmC3UVO2GqOX9nl1lJnrNrsTrlvx1naBQZyRxohqKSrjWRr7A%2FvOnV9NO7zom1GvUqgZPrMcPkvG%2BSML2ouskGOqUBsaIPmHonLAFZubQAmuKHkFrBQUogGtr1QrmF2WA4phROSWNBFxxXXVF1gXOFmvYkD2xq2ZQcuDnD45E%2FqY8Qbjkbtzn87%2Bo4VcCq5DwF2crFSBw4aUZ8x3xaTk9FfRA5zl0nfNqniiGRAaVkkL55oT8NrCSoDd%2BLfDY6I4PLVHWc25pUfE2TTqFK9KV87Hgp1NZbTcf26afJvY47SE%2FHEQjuJGUD&X-Amz-Signature=75cb727db14159ccd95ea1a72bf7a6d0e282b3ca2d5bdb429fea4e4816252beb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

