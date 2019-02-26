var IntersectSegmentPlane = function(a, b, p)
{
    const ba = b.Clone().Sub(a);
    var temp = GetDotProduct3(p.n, ba);
    if (!IsNearlyZero(temp))
    {
        var t = (p.d - GetDotProduct3(p.n, a)) / temp;
        if ((0.0 <= t) && (1.0 >= t))
        {
            var p = a.Clone().Add(ba.Mul(t));
            return { point:p, t:t};
        }
    }

    return null;
}

var IntersectRaySphere = function(p, d, sphere)
{
    const radius = sphere.scale.x;

    var m = p.Clone().Sub(sphere.pos);
    
    var b = GetDotProduct3(m, d);
    var c = GetDotProduct3(m, m) - (radius * radius);

    if (c > 0.0 && b > 0.0)
        return null;

    var discr = b * b - c;
    if (IsNearlyZero(discr))
    {
        t = -b;
    }
    else
    {
        if (discr < 0.0)
            return null;
        t = -b - Math.sqrt(discr);
    }

    if (t < 0.0)
        t = 0.0;

    var q = p.Clone().Add(d.Clone().Mul(t));
    return { point:q, t:t };
}

var TestRaySphere = function(p, d, sphere)
{
    const radius = sphere.scale.x;

    var m = p.Clone().Sub(sphere.pos);
    
    var b = GetDotProduct3(m, d);
    var c = GetDotProduct3(m, m) - (radius * radius);

    if (c > 0.0 && b > 0.0)
        return null;

    var discr = b * b - c;
    if ((discr < 0.0) && !IsNearlyZero(discr))
        return null;

    return true;
}

var IntersectSegmentSphere = function(pa, pb, sphere)
{
    const radius = sphere.scale.x;
    const p = pa;
    const ba = pb.Clone().Sub(pa);
    const baLen = ba.GetLength();
    if (baLen <= 0.0)
        return null;
    const d = ba.Clone().Div(baLen);

    var m = p.Clone().Sub(sphere.pos);
    
    var b = GetDotProduct3(m, d);
    var c = GetDotProduct3(m, m) - (radius * radius);

    if (c > 0.0 && b > 0.0)
        return null;

    var discr = b * b - c;
    if (IsNearlyZero(discr))
    {
        t = -b;
    }
    else
    {
        if (discr < 0.0)
            return null;
        t = -b - Math.sqrt(discr);
    }

    if (t > baLen)
        return null;

    if (t < 0.0)
        t = 0.0;

    var q = p.Clone().Add(d.Clone().Mul(t));
    return { point:q, t:t };
}

var TestSegmentSphere = function(pa, pb, sphere)
{
    const radius = sphere.scale.x;
    const p = pa;
    const ba = pb.Clone().Sub(pa);
    const baLen = ba.GetLength();
    if (baLen <= 0.0)
        return null;
    const d = ba.Clone().Div(baLen);

    var m = p.Clone().Sub(sphere.pos);
    
    var b = GetDotProduct3(m, d);
    var c = GetDotProduct3(m, m) - (radius * radius);

    if (c > 0.0 && b > 0.0)
        return null;

    var discr = b * b - c;
    if (IsNearlyZero(discr))
    {
        t = -b;
    }
    else
    {
        if (discr < 0.0)
            return null;
        t = -b - Math.sqrt(discr);
    }

    if (t > baLen)
        return null;

    return true;
}